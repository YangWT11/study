function vue(options) {
    this.data=options.data;
    let app=document.getElementById(options.el);
    app.appendChild(nodeToFragment(app,this));
}

//第一步，先变成fragment
function nodeToFragment(node,vm) {
    //这里会劫持的
    //好好研究一下，为什么要变成fragment
    let fragment=document.createDocumentFragment();
    let child;
    while(child=node.firstChild){//当有的时候，firstChild会移除第一个
        complie(child,vm);
        fragment.appendChild(child);
    }
    return fragment;
}

//第二步，将model的值赋给节点
function complie(node,vm) {
    if(node.nodeType==1){//普通节点
        for(let key in node.attributes){
            if(key=='v-model'){
                if(vm.data[node.attributes[key]]){
                    //如果有这个属性，我就添加
                    node.nodeValue=vm.data[node.attributes[key]];
                }
            }
        }
    }
}