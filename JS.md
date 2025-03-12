# 数据类型

# 1.js 有哪些数据类型

- 共有八种：

  - 基本数据类型：String,Number,Boolean,Null,Undefined,Symbol,BigInt
    - Symbol: 独一无二的值
    - BigInt: 任意精度的整数
  - 引用数据类型：Object (对象，数组和函数)

  - 基本数据类型是按值访问的，存储在栈内存，
  - 引用数据类型是按引用访问的，存储在堆内存。

# 2.数据类型检测的方法

- typeof 其中数组，对象和 null 返回的都是 object。
- instanceof
- Object.prototype.toString.call()

# 3. typeof null 的结果是什么，为什么

- null 是一个空对象指针，所以返回的是 object。

# 4. NaN == NaN 的结果是什么，为什么

- false
- NaN 是一个特殊的数字，表示一个本来要返回数值的操作数未返回数值的情况。
- NaN 不等于任何值，包括它本身。

# 5. 0.1 + 0.2 的结果是什么，为什么

- 0.30000000000000004
- 0.1 和 0.2 都是二进制浮点数，在进行计算时会出现精度丢失的情况。

# 6. object.assign 和扩展运算符的区别

- object.assign 只能用于对象，扩展运算符可以用于数组和对象。
- object.assign 可以合并多个对象，扩展运算符只能合并两个对象。

# 7. 如何判断一个对象是空对象

- Object.keys(obj).length === 0
- JSON.stringify(obj) === '{}'

## ES6

- 新特性：
  - 箭头函数
  - class 类
  - 模板字符串
  - 解构赋值
  - 扩展运算符 ...
  - 新增数据类型
  - Promise 对象
  - Map 和 Set

# 1.let const var 的区别

- let 和 const 是块级作用域，var 是函数作用域。
- let 和 const 不能重复声明，var 可以。
- let 和 const 有暂时性死区，var 没有。
- let 和 const 不存在变量提升，var 有。
- const 声明的变量必须赋值，let 和 var 可以不赋值。

- const 保证的并不是变量的值不能改动，而是变相指向的那个内存地址不变

# 2.箭头函数和普通函数的区别

- 箭头函数没有自己的 this，它的 this 指向的是它的上一级作用域的 this。
- 箭头函数没有 arguments，它的 arguments 指向的是它的上一级作用域的 arguments。
- 箭头函数不能作为构造函数使用，普通函数可以。
- call()、apply()、bind()等方法不能改变箭头函数中 this 的指向

# 3.扩展运算符的作用及使用场景

- 对象，去除参数对象中所有所有可遍历属性，拷贝到当前对象之中

- 数组，复制数组，合并数组，将类数组对象转换成数组

# 4.如何提取高度嵌套的对象里的指定属性？

const school = {
classes: {
stu: {
name: 'Bob',
age: 24,
}
}
}

const { classes: { stu: { name } }} = school

console.log(name) // 'Bob'

# js 基础

# 1.JavaScript 有哪些内置对象

- Object,Array,Function,Date,RegExp,Math,String,Number,Boolean,Error,Null,Undefined,Global

# 2.对 JSON 的理解

- JSON 是一种轻量级的数据交换格式，易于人阅读和编写，易于机器解析和生成。
- JSON.stringify() 将 JavaScript 对象转换为 JSON 字符串。
- JSON.parse() 将 JSON 字符串转换为 JavaScript 对象。

# 3.JavaScript 脚本延迟加载的方式有哪些

- defer
- async
- 使用 setTimeout 延迟方法
- 动态创建 DOM 方式

# 4.数组有哪些原生方法

- 数组转字符串，join() toString()
- 数组排序，sort() reverse()
- 数组添加删除，push() pop() unshift() shift()
- 数组拼接，concat()
- 数组截取，slice() splice()
- 数组遍历，forEach() map() filter() reduce()
- forEacheach 和 map 的区别:
  - forEach() 没有返回值，map() 有返回值。
  - forEach() 不能 break，map() 可以 break。
  - forEach() 不能 return，map() 可以 return。
  - forEach() 不能改变原数组，map() 可以改变原数组。

# 5.什么是 DOM 和 BOM

- DOM 是文档对象模型，是一种将网页转换为对象的方式，通过 DOM 可以对网页进行增删改查。
- 常见的 DOM 操作有哪些
  - 获取元素
    getElementById // 按照 id 查询
    getElementsByTagName // 按照标签名查询
    getElementsByClassName // 按照类名查询
    querySelectorAll // 按照 css 选择器查询
  - 创建元素
    document.createElement('span')
  - 删除元素
    removeChild()
- BOM 是浏览器对象模型，是一种将浏览器转换为对象的方式，通过 BOM 可以对浏览器进行增删改查。
- 常见的 BOM 操作有哪些
  - 获取窗口对象
    window.innerWidth
    window.open
    setTimeout
    setInterval
    window.location.href
    window.history.back();

# 6.对类数组对象的理解，如何转化为数组

- 类数组对象是指具有 length 属性的对象，但是它不是数组。
- 可以使用 Array.from()，Array.prototype.slice.call(arrayLike) 方法将类数组对象转换为数组。

# 7.for...in 和 for...of 的区别

- for...in 遍历的是对象的键名，for...of 遍历的是对象的键值。
- for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串。

# 8. js 内部的执行顺序

- 同步任务
- 异步任务
- 微任务：Promise.then()
- 宏任务：setTimeout，setInterval，UI 渲染

# 原型，原型链

# 1.什么是原型，什么是原型链

- 原型是函数的属性，用于存储共享的属性和方法。
- 原型链是对象属性查找的路径，通过*proto*层层向上查找，实现继承。
- 原型链的顶端是 object.prototype，他是所有对象的默认原型

- 核心关系，每个对象（除 null 以外）都有一个*proto*,指向其构造函数的原型对象。
- 顶级原型，object.prototype 是所有对象的默认原型。object.prototype.*proto*为 null ，表示原型链的终点。

- es5 中新增了 Object.getPrototypeOf()方法，用来获取对象的原型。

# 2. 对闭包的理解

- 闭包是指函数内部可以访问外部的变量，即使外部函数已经执行完毕。
- 闭包的作用是保护变量的安全性，防止变量被外部访问。
- 闭包的缺点是会占用内存，会造成内存泄漏。

# 3. 对作用域和作用域链的理解

- 作用域是指变量的作用范围，分为全局作用域和局部作用域。
- 作用域链是指变量的查找路径，从当前作用域开始，逐级向上查找，直到找到为止。

# 异步编程

# 1.什么是异步编程

- 异步编程是指程序在执行过程中，某些操作不需要立即返回结果，而是在后台进行处理，然后在合适的时候通知程序结果。
- 异步编程的优点是可以提高程序的响应速度，缺点是代码的复杂度提高，需要处理异步操作的结果。

# 2.异步编程的方式有哪些

- 回调函数
- Promise
- async/await
- 事件监听
- 定时器

# 3.对 Promise 的理解

- Promise 是一种异步编程的解决方案，它可以将异步操作以同步的方式表达出来。

- Promise 的状态有三种：

  - pending: 等待状态
  - fulfilled: 成功状态
  - rejected: 失败状态

- Promise 的特点，对象的状态不受外界影响，一旦状态改变，就不会再变，任何时候都可以得到这个结果。
- 缺点：
  - 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
  - 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
  - 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

# 4.对 async/await 的理解

- async/await 是 ES6 中新增的异步编程解决方案，它可以将异步操作以同步的方式表达出来。

# 5. async/await 对比 Promise 的优势

- 代码更加简洁，可读性更高。
- 错误处理更加方便。

# 面向对象

# 1.面向对象的三大特性

- 封装
- 继承
- 多态

# 2.面向对象的创建方式

- 工厂模式
- 构造函数模式
- 原型模式
- 组合模式

# 3.面向对象的继承方式

- 原型链继承
- 构造函数继承
- 组合继承
- 寄生组合继承

# 4.面向对象的设计模式

- 单例模式
