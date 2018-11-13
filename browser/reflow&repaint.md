> ###网页生成过程大致如下
>1. HTML代码转化成DOM
>2. CSS代码转化成CSSOM（CSS Object Model）
>3. 结合DOM和CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
>4. 生成布局（layout），即将所有渲染树的所有节点进行平面合成
>5. 将布局绘制（paint）在屏幕上<br>

"生成布局"（flow）和"绘制"（paint）这两步，合称为"渲染"<br>
网页生成的时候，至少会渲染一次。用户访问的过程中，还会不断重新渲染<br>

> ###导致网页重新渲染的情况
>1. 修改dom（重排和重绘）
>2. 修改样式表（可能重排，一定重绘）
>3, 用户事件（鼠标悬停，页面滚动，输入框输入文字，改变窗口大小）

> ### 降低重排重绘的九个技巧
>+ DOM 的多个读操作（或多个写操作），应该放在一起。不要两个读操作之间，加入一个写操作。例如
>```
>//bad
>div.style.left = div.offsetLeft + 10 + "px";
>div.style.top = div.offsetTop + 10 + "px";
>// good
>var left = div.offsetLeft;
>var top  = div.offsetTop;
>div.style.left = left + 10 + "px";
>div.style.top = top + 10 + "px";
>```
>+ 如果某个样式是通过重排得到的，那么最好缓存结果。避免下一次用到的时候，浏览器又要重排。
>+ 不要一条条地改变样式，而要通过改变class，或者csstext属性，一次性地改变样式。
>```
>// bad
>var left = 10;
>var top = 10;
>el.style.left = left + "px";
>el.style.top  = top  + "px";
>// good 
>el.className += " theClassName";
>// good
>el.style.cssText += "; left: " + left + "px; top: " + top + "px;";
>```
>+ 尽量使用离线DOM，而不是真实的网面DOM，来改变元素样式。比如，操作```Document Fragment```对象，完成后再把这个对象加入DOM。再比如，使用```cloneNode()```方法，在克隆的节点上进行操作，然后再用克隆的节点替换原始节点。
>+ 先将元素设为```display: none```（需要1次重排和重绘），然后对这个节点进行100次操作，最后再恢复显示（需要1次重排和重绘）。这样一来，你就用两次重新渲染，取代了可能高达100次的重新渲染。
>+ ```position```属性为```absolute```或```fixed```的元素，重排的开销会比较小，因为不用考虑它对其他元素的影响。
>+ 只在必要的时候，才将元素的display属性为可见，因为不可见的元素不影响重排和重绘。另外，```visibility : hidden```的元素只对重绘有影响，不影响重排。
>+ 使用虚拟DOM的脚本库，比如React等。
>+ 使用```window.requestAnimationFrame()```、```window.requestIdleCallback()```这两个方法调节重新渲染（参考原文很重要）。前者是将一系列的操作放到下一次渲染的时候执行