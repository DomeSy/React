// 执行和vdom相关的操作
// 创建kvdom：实现 initVNode ，能够将 vdom 转换为 dom

export function initVNode(vnode) {
  let { vtype } = vnode;

  if(!vtype) {
    // 代表文本节点
    return document.createTextNode(vnode);
  }

  if(vtype === 1){
    // 原生标签
    return  createNativeElement(vnode);
  } else if(vtype === 2){
    // 函数式
    return createFuncComp(vnode);
  }else {
    // 类式
    return createClassComp(vnode);
  }
}

// 原生标签
function createNativeElement(vnode){
  //vnode[type]:节点类型
  const {type, props} = vnode;

  // 创建真正dom
  const node = document.createElement(type);

  // 过滤特殊属性
  const {key, children, ...rest} = props;
  Object.keys(rest).forEach(k => {
    // 需特殊处理的，如htmlfor、className 冲突
    if(k === 'className'){
      node.setAttribute('class', rest[k]);
    }else if(k === 'htmlFor'){
      node.setAttribute('for', rest[k]);
    } else {
      node.setAttribute(k, rest[k]);
    }
  });

  // 递归 处理孩子节点
  children.forEach(c => {
    // 判断数组
    if(Array.isArray(c)){
      c.forEach( n => node.appendChild(initVNode(n)))
    }else{
      node.appendChild(initVNode(c));
    }
  });


  // 然后将其返回
  return node;
}

// 函数式
function createFuncComp(vnode){
  // 此处的type是一个函数
  const { type, props } = vnode;
  const vdom = type(props);
  return initVNode(vdom);
}

// 类式
function createClassComp(vnode){
  // 此处 type 是一个 class
  const { type, props } = vnode;
  const component = new type(props);
  const vdom = component.render();
  return initVNode(vdom);
}