# 学校网站
网站已经通过github的webhooks实现了自动部署的能力，当在本地客户端完成代码编写。发布合并到github的Branch Matser之后，无需人工登录服务器做`git pull`

但是，为了保险起见，请在`pull request`之后前往webhooks页面查看状态，如果有
`service timeout` 请务必`Redeliver`一下，确保状态成功。

