// 创建kreate写实现createElement并返回vdom
function createElement(type, props, ...children){
  // console.log(arguments);

  // 要返回虚拟DOM
  props.children = children;

  // 删除无关的属性
  delete props.__self;
  delete props.__source;

  // 能够区分组件类型
  // vtype 如果是 1：原生标签 如果是 2：函数组件 如果是 3: 类组件
  
  let vtype;
  if(typeof type === 'string') {
    // 原生标签
    vtype = 1;
  } else {
    // console.log(typeof type);
    
    if( type.isReactComponent ) {
      // 类组件
      vtype = 3;
    } else {
      // 函数式组件
      vtype =2
    }

  }

  return { vtype, type, props };
}

export class Component{

  // 加入静态属性，以此来判断属性
  static isReactComponent = true;

  constructor(props){
    this.props = props;
    this.state = {};
  }

  setState() {}

  // 强制更新
  forceUpdate() {}
}

export default { createElement };

