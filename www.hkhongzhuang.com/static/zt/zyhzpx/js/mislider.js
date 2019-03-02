/**
 * miSlider
 * Version: 0.1.11
 * URL: private
 * Description: A multi-item slider for displaying one or more items per slide
 * Requires: jQuery
 * Optional: Modernizr
 * Author: jbowyers
 * Copyright: 2014-2015 jbowyers
 * License: This file is part of miSlider.
 * miSlider is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * miSlider is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see http://www.gnu.org/licenses/
 */

;(function( $, window, document, Math, undefined ) {

"use strict";

var MiSlider = function( stageEl, options ) {

	// Clone miSlider object
	var o = this;

	// Initialize option defaults ==============================================
	o.optionsInit = {

		// 幻灯片过渡的速度,以毫秒为单位。选择:正整数。
		speed: 700,
		// 幻灯片转换之间的停顿时间,以毫秒为单位。
		// 选择:假的,正整数。假=播放。
		pause: 4000,
		// 与播放幻灯片的数量增加和导航按钮。
        //选择:积极或消极的整数。正整数=下滑了。
        //负整数=下滑。
		increment: 1,
		// 阶段的高度px。选择:false或正整数。
		// false=身高计算最大高度。
		stageHeight: false,
		// 数量的幻灯片可见。选择:虚假或正整数。
		// false = 适合尽可能多。
		slidesOnStage: 1,
		// 连续运动——布尔。turl=幻灯片循环尽可能在一个方向上。
		slidesContinuous: true,
		// 当前的幻灯片在舞台上的位置。选项:“左”、“右”、“中心”。
		slidePosition: "left",
		// 幻灯片开始。选项: "beg", "mid", "end"
		// 或幻灯片编号从1开始 - "1","2","3", 等等.
		slideStart: "beg",
		// 当前幻灯片的宽度px。选择： false or 正整数.
		// false = 宽度是现有的幻灯片的最大宽度。
		slideWidth: false,
		// 当前幻灯片的相对百分比比例因子
		// 其他幻灯片的缩减。选项:正数100或更高。100 =没有扩展。
		slideScaling: 100,
		// 幻灯片中心的垂直偏移量的比例下滑高度。
		// 选项:积极或消极的数字。否定价值=。Pos value =。0 =没有抵消。
		offsetV: 0,
		// 中心垂直幻灯片内容——布尔。
		centerV: false,
		// 使编号列表导航-布尔。
		navList: true,
		// 启用上一页和下一页按钮导航-布尔。
		navButtons: true,
		// 总是显示上一页和下一页按钮导航除非过渡-布尔。
		navButtonsShow: false,
		// 不透明的上一页和下一页按钮导航不过渡时。
		// 选择:在0和1之间。0(透明)- 1(不透明的)。
		navButtonsOpacity: 0.5,
		// 随机的顺序幻灯片——布尔。
		randomize: false,
		// 幻灯片加载时调用回调函数——幻灯片加载。
		slidesLoaded: false,
		// 幻灯片过渡前回调函数之前——幻灯片过渡。
		beforeTrans: false,
		// 幻灯片过渡完成回调函数
		// 在幻灯片过渡。
		afterTrans: false,
		// 舞台的CSS类将被应用到元素。
		classStage: "mis-stage",
		// CSS类将被应用到滑块元素。
		classSlider: "mis-slider",
		// CSS类将被应用到每个幻灯片元素。
		classSlide: "mis-slide",
		// CSS类将被应用到父的
		// 上一页和下一页按钮导航元素。
		classNavButtons: "mis-nav-buttons",
		// CSS类将被应用到父级别
		// numbered list navigation elements
		classNavList: "mis-nav-list",
		// 选择使用的选择器滑块元素-后裔的阶段
		selectorSlider: "ol",
		// 使用的选择器选择每个幻灯片元素——滑块的后裔
		selectorSlide: "li"
	};

	// Define objects and vars =================================================

	// Objects -----------------------------------------------------------------

	// Merged options
	o.options = {};
	// slider container element
	o.stage = false;
	// slider element - container for slides+
	o.slider = false;
	// The collection of slides
	o.slides = false;
	// The nav buttons element
	o.navButtons = false;
	// The "previous" nav button
	o.prev = false;
	// The "next" nav button
	o.next = false;
	// The nav list element
	o.navList = false;
	// The nav list items collection
	o.navListItems = false;
	// Current slide
	o.slideCurrent = false;
	// A collection of all the elements that animate
	o.animatedElements = $();

	// Calculated Widths and Heights -------------------------------------------

	// The existing width of the stage
	o.stageWidth = 0;
	// The calculated height of stage
	o.stageHeight = 0;
	// The calculated width of slider
	o.sliderWidth = 0;
	// Slide calculated width of non-current slides
	o.slideWidth = 0;
	// Slide calculated width of current slide
	o.slideWidthCurrent = 0;

	// Calculated Scaling vars -------------------------------------------------

	// The calculated relative percentage scaling factor of the current slide
	o.slideScaling = o.optionsInit.slideScaling;
	// The calculated scaling width
	o.scalingWidth = 0;
	// 计算比例保证金
	o.scalingMargin = 0;
	// The vertical offset of the slide center
	o.offsetV = o.optionsInit.offsetV;

	// Slide counts ------------------------------------------------------------

	// The original number of slides in collection
	o.slidesLengthOrig = 0;
	// The number of slides in collection including cloned slides
	o.slidesLength = 0;
	// Current slide index
	o.indexCurrent = 0;
	// The index of the first unique slide
	o.indexFirst = 0;
	// The index of the last unique slide
	o.indexLast = 0;
	// The calculated number of slides to increment with Autoplay and Nav Buttons
	o.increment = o.optionsInit.increment;
	// The calculated number of slides on stage
	o.slidesOnStage = o.optionsInit.slidesOnStage;

	// Slider settings --------------------------------------------------------

	// The calculated speed
	o.speed = o.optionsInit.speed;
	// The calculted Nav Buttons opacity
	o.navButtonsOpacity = o.optionsInit.navButtonsOpacity;
	// The calculated prev and next button navigation fade boolean
	o.navButtonsFade = false;
	// The calculated continuous motion Boolean.
	o.slidesContinuous = o.optionsInit.slidesContinuous;
	// The normalized pause value
	o.pause = o.optionsInit.pause;

	// Functions --------------------------------------------------------------

	// 间隔计时器函数
	o.timer = false;
	// 窗口大小调整定时器功能
	o.resizeTimer = false;
	// Temporary after transition callback function
	o.after = false;

	// Classes ----------------------------------------------------------------

	// Class applied to the cloned slides
	o.classSlideClone = "mis-clone";
	// Class of slide container - inserted around the contents of each slide
	o.classSlideContainer = "mis-container";
	// Class applied to the the current slides and current nav list item
	o.classCurrent = "mis-current";
	// Class applied to the the "previous" button
	o.classPrev = "mis-prev";
	// Class applied to the the "next" button
	o.classNext = "mis-next";

	// Initiate slider ========================================================
	o.init = function( stageEl, options ) { // Must only be called once

		// Set options
		o.options = $.extend( {}, o.optionsInit, options );

		// Initiate elements
		o.stage = $( stageEl );
		// Hide everything while we get setup
		o.stage.fadeTo( 0, 0 );
		// Only one slider per stage
		o.slider = o.stage.children( o.options.selectorSlider ).first();
		o.slides = o.slider.children( o.options.selectorSlide );
		o.slidesLengthOrig = o.slides.length;
		o.animatedElements = o.animatedElements.add( o.slider ).add( o.slides );

		// Initiate current index
		if ( String( o.options.slideStart ) === "beg" ) {
			o.indexCurrent = 0;
		} else if ( String( o.options.slideStart ) === "mid" ) {
			o.indexCurrent = Math.ceil( o.slidesLengthOrig / 2 ) - 1;
		} else if ( String( o.options.slideStart ) === "end" ) {
			o.indexCurrent = o.slidesLengthOrig - 1;
		} else if ($.isNumeric( o.options.slideStart ) &&
			parseInt( o.options.slideStart, 10 ) <= o.slidesLengthOrig &&
			parseInt( o.options.slideStart, 10 ) > 0) {
				o.indexCurrent = parseInt( o.options.slideStart, 10 ) - 1;
		} else {
			o.indexCurrent = 0;
		}

		// Randomize slides
		if ( o.options.randomize ) {
			o.randomize();
		}

		// 添加类阶段和滑块
		if ( !o.stage.hasClass( o.options.classStage ) ) {
			o.stage.addClass( o.options.classStage );
		}
		if ( !o.slider.hasClass( o.options.classSlider ) ) {
			o.slider.addClass( o.options.classSlider );
		}

		// Normalize static options
		if ( o.options.speed && $.isNumeric( o.options.speed ) ) {
			o.speed = Math.abs( parseInt( o.options.speed, 10 ) );
		}
		if ( o.options.pause === false ) { // Note: 0 must return true
			o.pause = false;
		} else if ( $.isNumeric( o.options.pause ) ) {
			o.pause = Math.abs( parseInt( o.options.pause, 10 ) );
		}
		if ( $.isNumeric( o.options.offsetV ) ) {
			o.offsetV = Number( o.options.offsetV );
		}
		if ($.isNumeric(o.options.navButtonsOpacity) &&
			Number(o.options.navButtonsOpacity) >= 0 &&
			Number(o.options.navButtonsOpacity) <= 1) {
				o.navButtonsOpacity = Number( o.options.navButtonsOpacity );
		}

		// Initiate calculated scaling factor
		if ( $.isNumeric( o.options.slideScaling ) && Number( o.options.slideScaling ) >= 100 ) {
			o.slideScaling = Number( o.options.slideScaling );
		}
		// if CSS transforms are not supported
		if ( !supportTransform( stageEl ) ) {
			o.slideScaling = 100;
		}
		o.optionsInit.slideScaling = o.slideScaling;

		// Initiate the calculated increment
		if ( $.isNumeric( o.options.increment ) && parseInt( o.options.increment, 10 ) !== 0 ) {
			o.increment = parseInt( o.options.increment, 10 );
			o.optionsInit.increment = o.increment;
		}


		// Add previous and next nav buttons
		if ( o.options.navButtons ) {
			o.addNavButtons( o.stage );
			o.animatedElements = o.animatedElements.add( o.navButtons );
			if ( !o.options.navButtonsShow ) {
				o.navButtonsFade = true;
			}
		}

		// Add numbered list navigation
		if ( o.options.navList ) {
			o.addNavList();
		}

		// Set up the slider
		o.setup();

		// Add event handlers ---------------------------------------------------

		// Add click events to slides
		if ( o.slidesOnStage > 1 ) {
			o.slider.on( "click", o.options.selectorSlide, function( e ) {
				if ( $( this ).index() !== o.indexCurrent ) {
					e.preventDefault();
					o.autoplayOff();
					o.transition( $( this ).index(), false, o.autoplayOn( o.increment ) );
				}
			});
		}

		// Add hover events for controling Autoplay and Nav Button opacity
		if ( o.pause !== false || o.navButtonsFade ) { // Note: 0 must return true for o.pause
			o.stage.on({
				"mouseenter": function() {
					if ( o.pause !== false ) {
						o.autoplayOff();
					}
					if ( o.navButtonsFade ) {
						if ( !o.animatedElements.is( ":animated" ) ) {
							o.navButtons.fadeTo( 400, o.navButtonsOpacity );
						} else {
							if ( $.isFunction( o.after ) ) {
								var after = o.after;
								o.after = function() {
									after();
									o.navButtons.fadeTo( 400, o.navButtonsOpacity );
								};
							} else {
								o.after = function() {
									o.navButtons.fadeTo( 400, o.navButtonsOpacity );
								};
							}
						}
					}
				},
				"mouseleave": function() {
					if ( o.pause !== false ) {
						o.autoplayOn( o.increment );
					}
					if ( o.navButtonsFade ) {
						o.navButtons.fadeTo( 100, 0 );
					}
				}
			});
		}

		// Window events
		$( window ).on({

			// Wait for slides to load before setting up slides and nav buttons
			"load": function() {

				// Setup slides and nav buttons
				o.slideSetup();
				o.updateNavButtons();

				// Fade in everything
				o.stage.fadeTo( 600, 1 );

				// Autoplay slides if enabled
				o.autoplayOn( o.increment );

				// Slides loaded callBack
				if ( $.isFunction( o.options.slidesLoaded ) ) {
					o.options.slidesLoaded();
				}
			},

			// Reset Slider on screen resize
			"resize": function() {
				o.autoplayOff();
				clearTimeout( o.resizeTimer );
				o.resizeTimer = setTimeout(o.resetSlider, 500 );
			}
		});

		return this;
	};

	// Setup slider ============================================================
	o.setup = function() {

		var slidesMaxNum,
			incrementTest,
			slidesOffStage;

		// Set Slides length
		o.slidesLength = o.slidesLengthOrig;
		o.indexLast = o.slidesLength - 1;

		// Get widths, heights, add slide class and container
		o.slides.each( function() {
			var width,
				height,
				slide = $(this);

			// Add slide class to slide
			if ( !slide.hasClass( o.options.classSlide ) ) {
				slide.addClass( o.options.classSlide );
			}

			// Add slide container to slide
			if ( !slide.children().hasClass( o.classSlideContainer ) ) {
				slide.wrapInner( "<div class='" + o.classSlideContainer + "'></div>" );
			}

			// Get widths and heights
			width = slide.outerWidth();
			height = slide.outerHeight();

			if ( width > o.slideWidthCurrent ) {
				o.slideWidthCurrent = width;
			}
			if ( height > o.stageHeight ) {
				o.stageHeight = height;
			}

		});

		// Apply presets if they exist
		if ( $.isNumeric( o.options.slideWidth ) && parseInt( o.options.slideWidth, 10 ) > 0 ) {
			o.slideWidthCurrent = parseInt( o.options.slideWidth, 10 );
		}
		if ( $.isNumeric( o.options.stageHeight ) && parseInt( o.options.stageHeight, 10 ) > 0 ) {
			o.stageHeight = parseInt( o.options.stageHeight, 10 );
		}

		// Use modulus hack to ensure current index is within range
		o.indexCurrent = normalizeIndex( o.indexCurrent );

		// Set the stage -------------------------------------------------------

		// Set CSS
		o.stage.css({
			"height": o.stageHeight
		});

		// Get Stage width - must do this after setting height
		o.stageWidth = o.stage.outerWidth();

		// Calculate slide scaling, widths, increment and slides on and off stage

		// Determine the maximum number of slides that fit on the stage
		slidesMaxNum = Math.floor( ( o.stageWidth - o.slideWidthCurrent ) /
			( o.slideWidthCurrent * 100 / o.slideScaling ) ) + 1;

		// Must have at least 1
		slidesMaxNum = ( slidesMaxNum < 1 ) ? 1 : slidesMaxNum;

		// Calculate the number of slides visible on the stage
		o.slidesOnStage = slidesMaxNum;  // Fit as many as possible
		if ($.isNumeric( o.options.slidesOnStage ) &&
			parseInt( o.options.slidesOnStage, 10 ) >= 1 &&
			parseInt( o.options.slidesOnStage, 10 ) <= slidesMaxNum) {
				// Use existing options value
				o.slidesOnStage = parseInt( o.options.slidesOnStage, 10 );
		}
		if ( o.options.slidePosition === "center" ) {
			// need odd number for centered layout
			o.slidesOnStage = ( Math.ceil( o.slidesOnStage / 2 ) * 2 ) - 1;
		}

		// The absolute increment number should not be greater than slides on stage
		incrementTest = ( o.increment + o.slidesOnStage ) / 2;
		if ( incrementTest > o.slidesOnStage ) { // increment is positive and more than slides on stage
			o.increment = o.slidesOnStage;
		} else if ( incrementTest < 0 ) { // increment is negative and more than slides on stage
			o.increment = -( o.slidesOnStage );
		}

		// Calculate the current and non-current slide widths
		if ( o.slidesOnStage > 1 ) {
			// modify non-current slide width to accommodate correct number of slides on the stage
			o.slideWidth = ( o.stageWidth - o.slideWidthCurrent ) / ( o.slidesOnStage - 1 );
			if ( o.slideWidthCurrent < o.slideWidth && !o.options.slideWidth ) {
				// Set slideWidth and slideWidthCurrent to be the same
				o.slideWidth = o.stageWidth / o.slidesOnStage;
				o.slideWidthCurrent = o.slideWidth;
			}
		} else {
			// Make slide widths full width of stage
			o.slideWidth = o.stageWidth;
			o.slideWidthCurrent = o.slideWidth;
			o.slideScaling = 100;
		}

		// Set scaling width and margin
		o.scalingWidth = o.slideWidth * o.slideScaling / 150;
		o.scalingMargin = ( o.slideWidth - o.scalingWidth ) / 2;

		// Determine the number of slides off stage
		slidesOffStage = o.slidesLengthOrig - o.slidesOnStage;

		// Clone last slidesToClone slides to beginning and first slidesToClone slides to end
		if ( slidesOffStage >= 0 && o.options.slidesContinuous ) {

			// Set calculated continuous motion boolean to true
			o.slidesContinuous = true;

			// Determine the number of slides to clone
			o.slidesToClone = o.slidesOnStage + Math.abs( o.increment ) - 1;

			// Prepend last slidesToClone slides
			o.slides
				.slice( o.slidesLength - o.slidesToClone )
					.clone()
					.addClass( o.classSlideClone )
					.removeAttr( "id" )
					.prependTo( o.slider )
					.find( "*" )
						.removeAttr( "id" );

			// Append first slidesToClone slides
			o.slides
				.slice( 0, o.slidesToClone )
					.clone()
					.addClass( o.classSlideClone )
					.removeAttr( "id" )
					.appendTo( o.slider )
					.find( "*" )
						.removeAttr( "id" );

			// Adjust indexes
			o.indexFirst = o.slidesToClone;
			o.indexLast = o.slidesLength + o.slidesToClone - 1;
			o.indexCurrent = o.indexCurrent + o.slidesToClone;

			// Refresh slides
			o.slides = o.slider.children( o.options.selectorSlide );
			o.slidesLength = o.slides.length;

		} else {
			o.slidesContinuous = false;
		}

		// Update current slide
		o.slideCurrent = o.slides.eq( o.indexCurrent );

		// Set the horizontal position, width and other CSS of the slider ------

		// Calculate the width of the slider
		o.sliderWidth = o.slideWidthCurrent + ( o.slideWidth * ( o.slidesLength - 1 ) ) + 1;

		// Set CSS of slider
		o.slider
			.css({
				"left": leftOffsetter( o.indexCurrent ),
				"width": o.sliderWidth
			})
		;

		// update navList
		o.updateNavList( o.indexCurrent );

		return this;
	};

	// Transition control function =============================================
	o.transition = function( indexTo, beforeTrans, afterTrans, navButtonsFadeIn ) {

		// If slider is not animated and indexTo != current index - continue
		if ( !o.animatedElements.is( ":animated" ) && indexTo !== o.indexCurrent ) {

			// Define indexes that might be adjusted
			var indexDiff,
				indexToAdjusted = indexTo,
				indexCurrentAdjusted = o.indexCurrent;

			// Update indexes and slides if continuous and slides are out of bounds
			if ( o.slidesContinuous ) {

				// Get adjusted indexTo if slides are out of bounds
				if ( indexTo < o.indexFirst ) {
					indexToAdjusted = indexTo + o.slidesLengthOrig;
				} else if ( indexTo > o.indexLast ) {
					indexToAdjusted = indexTo - o.slidesLengthOrig;
				}

				if ( indexToAdjusted !== indexTo ) { // indexTo is out of bounds

					// Adjust current index
					indexCurrentAdjusted = o.indexCurrent + o.slidesLengthOrig;
					if ( indexToAdjusted < indexTo ) {
						indexCurrentAdjusted = o.indexCurrent - o.slidesLengthOrig;
					}
				}
			} else {
				// Use modulus hack to ensure adjusted index is within range
				indexToAdjusted = normalizeIndex( indexTo );
			}

			// Get the normalized difference between indexes
			indexDiff = normalizeIndex( indexToAdjusted ) -
                normalizeIndex( indexCurrentAdjusted );

			// If adjusted indexTo != adjusted current index - do move ---------
			if ( indexDiff ) {

				// Define after transition function var
				var after;

				// Call "before transition" functions
				if ( $.isFunction( beforeTrans ) ) {
					beforeTrans();
				}
				if ( $.isFunction( o.options.beforeTrans ) ) {
					o.options.beforeTrans();
				}

				// Construct after transition function
				after = function() {

					// Call afterTrans local function
					if ( $.isFunction( afterTrans ) ) {
						afterTrans();
					}

					// Call afterTrans pre-defined function
					if ( $.isFunction( o.options.afterTrans ) ) {
						o.options.afterTrans();
					}

					// Call temporary callback function
					if ( $.isFunction( o.after ) ) {
						o.after();
						o.after = false;
					}

				};

				// Swap current slide if continuous and current index needs to be adjusted
				if ( o.slidesContinuous && indexCurrentAdjusted !== o.indexCurrent ) {

					var slideCurrentAdjusted = o.slides.eq( indexCurrentAdjusted );

					// Prepare Current slide's clone
					if ( o.slideScaling !== 100 ) {

						// Scale slide
						slideCurrentAdjusted.css({
							"transform": "scale(1)",
							"width": o.slideWidthCurrent,
							"marginLeft": "0",
							"marginRight": "0",
							// value placeholder used with step function to animate tranform
							"borderSpacing": "100px"
						});

						// Vertically center slide if enabled
						if ( o.options.centerV ) {
							slideCurrentAdjusted.children().first().css({
								"marginTop": slideCurrentAdjusted.data( "slideMarginTopCurrent" )
							});
						}
					}

					// 当前类添加到当前的幻灯片
					slideCurrentAdjusted
						.addClass( o.classCurrent )
						.siblings()
						.removeClass( o.classCurrent );

					// Jump to Clone
					o.slider.css( "left", leftOffsetter( indexCurrentAdjusted ) );

					// Reset original
					if ( o.slideScaling !== 100 ) {

						// Scale slide
						o.slideCurrent.css({
							"transform": "scale(" + ( 100 / o.slideScaling ) + ")",
							"width": o.scalingWidth,
							"marginLeft": o.scalingMargin,
							"marginRight": o.scalingMargin,
							// value placeholder used with step function to animate tranform
							"borderSpacing": o.slideScaling
						});

						// Vertically center slide if enabled
						if ( o.options.centerV ) {
							o.slideCurrent.children().first().css({
								"marginTop": o.slideCurrent.data( "slideMarginTop" )
							});
						}
					}

					// Update current index and slide
					o.indexCurrent = indexCurrentAdjusted;
					o.slideCurrent = o.slides.eq( o.indexCurrent );

				}

				// Transition --------------------------------------------------
				if ( o.navButtons ) {
					// FadeIn Nav Buttons before move if fadeIn bool true
					o.navButtons.fadeTo( 100, ( navButtonsFadeIn ) ? o.navButtonsOpacity : 0,
						function() {
							// FadeOut Nav Buttons before move
							o.navButtons.fadeTo( 100, 0, function() {
								// Do transition
								o.animateSlides( indexToAdjusted, function() {
									if ( o.stage.find( ":hover" ).length ||
										o.options.navButtonsShow ) {
										// FadeIn Nav Buttons after move
										o.navButtons.fadeTo( 400, o.navButtonsOpacity, after );
									} else {
										after();
									}

								});

							});
						}
					);
				} else {
					// Do transition
					o.animateSlides( indexToAdjusted, after );
				}
			}
		}
		return this;
	};

	// Animate slide transition ================================================
	o.animateSlides = function( indexTo, afterTrans ) {

		// Remove current class from current slide
		o.slideCurrent.removeClass( o.classCurrent );

		// Define the slide to move to
		var slideTo = o.slides.eq( indexTo );

		if ( o.slideScaling !== 100 ) { // only scale if needed

			// Scale New Slide -------------------------------------------------
			slideTo
				.animate({
					"marginLeft": "0",
					"marginRight": "0",
					"width": o.slideWidthCurrent
				}, {
					duration: o.speed,
					queue: false
				})
				.animate({
					"borderSpacing": "100px"
				}, {    // Must use step function to animate scaling
					step: function ( now ) {
						$( this ).css({
							"transform": "scale(" + 100 / now + ")"
						});
					},
					duration: o.speed,
					queue: false
				})
			;

			// Scale Current slide ---------------------------------------------
			o.slideCurrent
				.animate({
					"marginLeft": o.scalingMargin,
					"marginRight": o.scalingMargin,
					"width": o.scalingWidth
				}, {
					duration: o.speed,
					queue: false
				})
				.animate({
					"borderSpacing": o.slideScaling
				}, {
					// Must use step function to animate scaling
					step: function ( now ) {
						$( this ).css({
							"transform": "scale(" + 100 / now + ")"
						});
					},
					duration: o.speed,
					queue: false
				})
			;

			// Animate slide contents margin if vertically center slide is enabled
			if ( o.options.centerV ) {

				// Animate New Slide content
				slideTo
					.children()
						.first()
							.animate({
								"marginTop": slideTo.data( "slideMarginTopCurrent" )
							}, {
								duration: o.speed,
								queue: false
							});
				// Animate Current Slide content
				o.slideCurrent
					.children()
						.first()
							.animate({
								"marginTop": o.slideCurrent.data( "slideMarginTop" )
							}, {
								duration: o.speed,
								queue: false
							});
			}
		}

		// Move to new slide ---------------------------------------------------
		o.slider.animate({
			"left": leftOffsetter( indexTo )
		}, {
			duration: o.speed,
			queue: false,
			complete: function() {

				// transition complete

				// Update current index and slide
				o.indexCurrent = indexTo;
				o.slideCurrent = slideTo;

				// update navList
				o.updateNavList( indexTo );

				// Add current class to current slide
				o.slideCurrent
					.addClass( o.classCurrent )
					.siblings()
						.removeClass( o.classCurrent )
				;

				// Execute callbacks
				if ( $.isFunction( afterTrans ) ) {
					afterTrans();
				}
			}
		});

		return this;
	};

	// Playback control functions ==============================================

	// Autoplay on -------------------------------------------------------------
	o.autoplayOn = function( incr ) {
		if ( o.pause !== false ) { // autoplay is enabled

			// Reset timer
			clearInterval( o.timer );
			if ( !o.stage.find( ":hover" ).length ) {   // slider is not in hover state
				o.timer = setInterval(function() {
					// if not transitioning do transition
					if ( !o.animatedElements.is( ":animated" ) ) {
						o.transition( o.indexCurrent + incr );
					}
				}, o.pause );
			}
		}
		return this;
	};

	// Autoplay off ------------------------------------------------------------
	o.autoplayOff = function() {
		clearInterval( o.timer );
		return this;
	};

	// Add navButtons -----------------------------------------------------------
	o.addNavButtons = function( element ) {

		// Create Nav Buttons object and Parent element to append nav buttons to
		var navButtons,
			$el = $( element );

		// Construct HTML
		navButtons = $( "<div class='" +
			o.options.classNavButtons +
			"'><a href='#' class='" +
			o.classPrev +
			"'>Prev</a><a href='#' class='" +
			o.classNext +
			"'>Next</a></div>" );

		// Apply CSS and click events to buttons
		navButtons
			.css({
				"opacity": ( ( o.options.navButtonsShow ) ? o.navButtonsOpacity : 0 )
			})
			.children( "a" )
				.on( "click", function( e ) {
					e.preventDefault();
					if ( this.className === o.classPrev ) {
						o.autoplayOff();
						o.transition( o.indexCurrent - Math.abs( o.increment ),
							false, o.autoplayOn( o.increment ), true );
					} else if ( this.className === o.classNext ) {
						o.autoplayOff();
						o.transition( o.indexCurrent + Math.abs( o.increment ),
							false, o.autoplayOn( o.increment ), true );
					}
				});

		// Append buttons to stage
		$el.append( navButtons );

		// Define cached objects
		o.navButtons = $el.find( "." + o.options.classNavButtons );
		o.prev = o.navButtons.find( "." + o.classPrev );
		o.next = o.navButtons.find( "." + o.classNext );

		return this;
	};

	// Update Nav Buttons ------------------------------------------------------
	o.updateNavButtons = function() {
		if ( o.navButtons ) {
			// Apply CSS to buttons
			o.navButtons
				.css({
					"width": o.slideWidthCurrent,
					"left": ( o.slideCurrent.offset().left - o.stage.offset().left )
				})
				.children( "a" )
					.css({
						"height": o.stageHeight,
						"paddingTop": ( 50 + o.offsetV ) * o.stageHeight / 100
					})
			;
		}
	};

	// Add navList --------------------------------------------------------------
	o.addNavList = function() {
		
		// 创建临时对象列表和列表的HTML var
		var navList,
			listHtml = "<ol class='" + o.options.classNavList + "'>";

		// 创建每个列表项
		o.slides.each(function( index ) {

			// Create caption and list item text vars
			var caption,
				itemText = index + 1;

			// 使用标题,figcaption或img标题列表项文本
			caption = $( this ).find( ":header" ).sort(function( a, b ) {
				var aTag = $( a ).prop( "tagName" ),
					bTag = $( b ).prop( "tagName" );
				return parseInt( aTag.match( /\d+/ ), 10 ) - parseInt( bTag.match( /\d+/ ), 10 );
			}).eq( 0 ).html();
			if ( caption ) {
				itemText = caption;
			} 
			else {
				caption = $( this ).find( "article" ).eq( 0 ).html();
				if ( caption ) {
					itemText = caption;
				}
				 else {
					caption = $( this ).find( "img" ).eq( 0 ).attr( "title" );
					if ( caption ) {
						itemText = caption;
					}
				}
			}

			// 将列表项添加到列表中
			 //listHtml += "<li><a href='#' title='" + itemText + "'>" + itemText + "</a></li>";
                 listHtml += "<li>" + itemText + "</li>";

		});

		// 关闭列表
		listHtml += "</ol>";

		// 定义的临时对象,并添加点击事件列表
		navList = $( listHtml )
			.on( "click", "li", function( e ) {
				e.preventDefault();
				if ( $( this ).index() !== ( o.indexCurrent - o.indexFirst ) ) {
					o.autoplayOff();
					o.transition( $( this ).index() + o.indexFirst, false, o.autoplayOn( o.increment ) );
				}
			})
		;

		// Prepend list to slider and update cached objects
		o.stage.prepend( navList );
		o.navList = o.stage.children().first();
		o.navListItems = o.navList.children( "li" );

		return this;
	};



	// Update navList -----------------------------------------------------------
	o.updateNavList = function( index ) {
		if ( o.navListItems.length ) {
			o.navListItems
				.eq( index - o.indexFirst )
					.addClass( o.classCurrent )
					.siblings()
						.removeClass( o.classCurrent )
			;
		}
	};

	// Assorted functions ======================================================

	// Randomizer --------------------------------------------------------------
	o.randomize = function() {

		// Randomize cached slides
		o.slides.sort(function() {
			return ( 0.5 - Math.random() );
		});

		// Apply randomized slides to page
		o.slides.detach().appendTo( o.slider );

		return this;
	};

	// Reset Slider -----------------------------------------------------------
	o.resetSlider = function() {
		if ( o.animatedElements.is( ":animated" ) ) {

			// Reset slider after transition has finished
			if ( $.isFunction( o.after ) ) {
				var after = o.after;
				o.after = function() {
					after();
					o.resetSlider();
				};
			} else {
				o.after = o.resetSlider;
			}

		} else {

			// Resets
			o.autoplayOff();
			o.stage.removeAttr( "style" );
			o.slider.removeAttr( "style" );
			o.slides.removeAttr( "style" );
			o.slides.filter( "." + o.classSlideClone ).remove();
			o.slides = o.slider.children( o.options.selectorSlide );
			o.stageHeight = 0;
			o.slideWidthCurrent = 0;
			o.slideScaling = o.optionsInit.slideScaling;
			o.indexCurrent -= o.slidesToClone;
			o.indexFirst = 0;
			o.increment = o.optionsInit.increment;
			o.after = false;

			// Setup
			o.setup();
			o.slideSetup();
			o.updateNavButtons();
			o.autoplayOn( o.increment );
		}

		return this;
	};

	// 设置幻灯片的功能----------------------------------------------------
	o.slideSetup = function() {
		o.slides.each(function( i ) {

			var slide = $( this );

			// 集变换起源和当前的宽度
			slide.css({
				"transform-origin": "50% " + String( 50 + o.offsetV ) + "%",
				"width": o.slideWidthCurrent
			});

			// 如果启用得到垂直下滑抵消
			if ( o.options.centerV ) {
                getMarginTop( slide, "slideMarginTopCurrent" );
			}

			// 设置非流动的幻灯片
			slide.css({
				"width": o.scalingWidth
			});
			if ( o.slideScaling !== 100 ) {
				slide.css({
					// 缩放变换补偿
					"marginLeft": o.scalingMargin,
					// compensation for scaling transform
					"marginRight": o.scalingMargin,
					"transform": "scale(" + ( 100 / o.slideScaling ) + ")",
					// value placeholder used with step function to animate tranform
					"borderSpacing": o.slideScaling
				});
			}

			// Vertically center slide if enabled
			if ( o.options.centerV ) {
				slide.children().first().css({
					"marginTop": getMarginTop( slide, "slideMarginTop" )
				});
			}

			// Set current slides
			if ( i === o.indexCurrent ) {
				slide
					.css({
						// value placeholder used with step function to animate tranform
						"borderSpacing": "100px",
						"width": o.slideWidthCurrent,
						// compensation for scaling transform
						"marginLeft": 0,
						// compensation for scaling transform
						"marginRight": 0,
						"transform": "scale(1)"
					})
					.addClass(o.classCurrent)
					.siblings()
						.removeClass( o.classCurrent )
				;

				// Vertically center slide if enabled
				if ( o.options.centerV ) {
					slide.children().first().css({
						"marginTop": getMarginTop( slide, "slideMarginTopCurrent" )
					});
				}
			}
		});
	};

    // Slider left offset calculator ------------------------------------------
    function leftOffsetter( index ) {

        var indexOffset = o.slideWidth * index * -1,
            leftOffset = indexOffset; // Slide position = Left

        if ( o.options.slidePosition === "center" ) {
            leftOffset = indexOffset + ( Math.floor( o.slidesOnStage / 2 ) * o.slideWidth );
        } else if (o.options.slidePosition === "right") {
            leftOffset = ( indexOffset + ( ( o.slidesOnStage - 1) * o.slideWidth ) );
        }

        return leftOffset;
    }

	// Get offset for centering slide contents vertically within stage
	// Must be called after contents (images) have loaded to get correct height
	function getMarginTop( slide, dataKey ) {

		// Get height of slide container
		var height = slide.children().first().outerHeight(),
				slideMarginTop = 0;

		// Add negative top margin if slide height is bigger than stage height
		if (height > o.stageHeight) {
			slideMarginTop = ( o.stageHeight - height ) / 2;
		}

		// Store slide's top margin value for re-use
		slide.data( dataKey, slideMarginTop );

		return slideMarginTop;
	}

    // Use modulus hack to make sure index is within range ----------------------
    function normalizeIndex( index ) {
        index = ( ( index % o.slidesLengthOrig ) + o.slidesLengthOrig ) % o.slidesLengthOrig;
        return index;
    }
	// Test transform feature support
	function supportTransform( element ) {
		var test = false;
		// Use Modernizr if it exists
		if ( typeof Modernizr !== 'undefined' ) {
			if ( Modernizr.csstransforms ) {
				test = true;
			}
		} else {
			var style = element.style;
			if (typeof style.transform !== "undefined" ||
				typeof style.WebkitTransform !== "undefined" ||
				typeof style.msTransform !== "undefined") {
					test = true;
			}
		}
		return test;
	}

	// initialize ----------------------------------------------------------------
	o.init( stageEl, options );

	return this;
};

// Create a jQuery plugin ======================================================
$.fn.miSlider = function( options ) {

	// Enable multiple-slider support
	return this.each(function() {
		var stage = $( this );
		if ( !stage.data( "miSlider" ) ) {
			stage.data( "miSlider", new MiSlider( this, options ) );
		}
	});
};
})( jQuery, window, document, Math );