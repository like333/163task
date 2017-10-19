# 163task
## 安装依赖
`npm install
 运行
 npm run dev`
## 说明
**功能点**
* 1.1  关闭顶部通知条
点击顶部通知条中的“X 不再提醒”后，刷新页面不再出现此通知条（使用本地
`cookie` 实现）。点击项的 `hover` 效果见视觉稿
* 1.2  关注“网易教育产品部”/ 登录
* 点击关注按钮：首先判断登录的 `cookie` 是否已设置（`loginSuc`）
** 如果未设置登录 `cookie`，则弹出登录框，使用给定的用户名和密码（需要表单
验证）调用服务器 `Ajax` 登录，成功后设置登录 `cookie`
**  登录成功后，调用关注 `API`，并设置关注成功的 `cookie`（`followSuc`）
** 登录后“关注”按钮变成不可点的“已关注”状态。
* 1.4  轮播图
  三张轮播图轮播效果：实现每 5s 切换图片，图片循环播放；鼠标悬停某张图片，
  则暂停切换；切换效果使用入场图片 500ms 淡入的方式。
* 1.5  左侧内容区 tab  切换
  点击“产品设计”或“编程语言”tab，实现下方课程内容的更换。tab 项的 hover
  及选中效果见视觉稿，tab 项对应的课程卡片数据见本文档的数据接口列表
* 1.6  查看课程详情
  鼠标悬停“产品设计”或“编程语言”tab 下的任意课程卡片，出现浮层显示该课
  程的课程详情；鼠标离开课程详情浮层，则浮层关闭。
* 1.7  右侧“机构介绍”中的视频介绍
  点击“机构介绍”中的整块图片区域，调用浮层播放介绍视频。
* 1.8  右侧“热门推荐”
  实现每次进入或刷新本页面，“热门推荐”模块中，接口返回 20 门课程数据，默认
  展示前 10 门课程，隔 5 秒更新一门课程，实现滚动更新热门课程的效果。
* 1.9  页面布局动态适应
  根据浏览器窗口宽度，适应两种视觉布局尺寸。窗口宽度<1205 时，使用小屏视觉
  布局；窗口宽度>=1205 时，使用大屏视觉布局。
