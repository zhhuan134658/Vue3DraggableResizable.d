# HTML

# 1.src 和 href 的区别

- src 用于替代当前元素，href 用于建立当前元素和引用资源之间的联系。

# 2.对于 HTML 语义化的理解

- 语义化是指根据内容的结构化，选择合适的标签。
- 优点：便于开发者阅读和编写代码，有利于 SEO，对机器友好。

# 3.DOCTYPE 的作用

- 告知浏览器的解析器用什么文档标准解析这个文档。
- 分为两个模式：
  - 标准模式，以 W3C 标准解析渲染页面。
  - 怪异模式，以兼容模式解析渲染页面。

# 4.script 标签的 defer 和 async 的区别

- defer 是异步加载，在文档解析完之后再执行。
- async 是异步加载，在加载完之后立即执行。

# 5.常用的 meta 标签有哪些

- charset ：用于描述文档的编码类型，<meta charset="UTF-8" >。
- keywoeds ：页面关键词，<meta name="keywords" content="关键词" />
- decription ：页面描述，<meta name="description" content="页面描述" />
- refresh : 页面冲定向刷新，<meta http-equiv="refresh" content="5;url=url" />
- author ：作者，<meta name="author" content="作者" />
- viewport : 视口，<meta name="viewport" content="width=device-width, initial-scale=1.0" />

# 6.HTML5 有哪些新特性

- 1.语义化标签。
  - header，nav, footer,article, section, aside, main。
- 2.表单控件。
  - 新增了 date, time, email, url, search,number。
- 3.视频和音频。
  - video, audio。
- 4.画布。
  - canvas。
- 5.DOM 查询操作。
  - document.querySelector()
  - decument.querySelectorAll()
- 6.本地存储。
  - localStorage,--存储数据是永久性的，除非手动删除。
  - sessionStorage，--存储在当前回话，关闭页面或者浏览器就会被删除。

# 7.img 的 srcset 属性的作用

- 用于响应式页面，根据不同的屏幕尺寸加载不同的图片。

# 8.行内元素，块级元素和空元素有哪些

- 行内元素：span ,a , img, input,button
- 块级元素： div,p,h1-h6,ul,ol,li
- 空元素: br,hr,img,input,link,meta

# 9.对 web worker 的理解

- 它允许在 Web 程序中创建后台线程，以便在主线程上执行的任务不会阻塞用户界面的响应。可以执行耗时的计算，处理大量数据等任务，以提高 Web 应用程序的性能和用户体验。
- 特点： 后台线程，独立于全局上下，异步消息传递（通过 postMessage()方法发送消息，通过 onmessage 事件接收消息）

# 10.iframe的优缺点

- 优点：解决加载缓慢的第三方内容的加载问题，能并行加载脚本，可以原封不动的把嵌入页面显示出来
- 缺点：会阻塞页面的 onload 事件，会增加页面的 http 请求，会造成内存空间的浪费，会影响页面的渲染。


