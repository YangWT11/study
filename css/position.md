参考自这篇文章[CSS中position属性( absolute | relative | static | fixed )详解](https://blog.csdn.net/chen_zw/article/details/8741365)
> ###css中四种position
>+ static：无特殊定位，对象**遵循正常文档流**。top，right，bottom，left等属性不会被应用。
>+ relative：对象**遵循正常文档流**，但将依据top，right，bottom，left等属性在正常文档流中偏移位置。而其层叠通过z-index属性定义。
>+ absolute：对象**脱离正常文档流**，使用top，right，bottom，left等属性进行绝对定位。而其层叠通过z-index属性定义。
>+ fixed：对象**脱离正常文档流**，使用top，right，bottom，left等属性以窗口为参考点进行定位，当出现滚动条时，对象不会随着滚动。而其层叠通过z-index属性定义。

关于relative：
+ 相对定位相对的是它原本在文档流中的位置，用top,right,bottom,left,z-index来定义
+ relative定位的对象还是占据着原本的文档流位置，即使它偏移了，原本文档流的位置还是占据着
+ 当该元素使用margin和padding时，会在原来的位置撑开空间，然后再应用偏移，同时原本的文档流也会应用margin和padding（可以看参考文章的图）

关于absolute：
+ 使用absolute定位时，必须制定trbl属性中的至少一种，否则会退化成relative，占用原来的文档流
+ 使用absolute定位时，会根据上一个非static定位的直系父元素来“相对定位”，如果找不到就根据html来定位
+ html和body有9px的区别，同时static和relative是相对body的，absolute和fixed相对html
+ 如果同时存在top和bottom，只生效top，left和right也只生效left
+ absolute是根据祖先的border来定位的，意思是margin会对其产生影响，padding并不会