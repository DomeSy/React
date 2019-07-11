import React from 'react'

// Dialog作为容器不关心内容和逻辑
function Dialog(props) {
  const color = props.color || 'blue';
  return (
    <div style={{ border: `4px solid ${color}` }} >
      {/* children为固定名称,类似于vue的插槽 */}
      {/* 注意children是JS，并非JSX 当传入的是函数时应当props.children()，有标签时为props.children */}
      {/* 匿名的插槽 */}

      {/* 为标签时 */}
      {/* {props.children} */}
      {/* 为函数时 */}
      {props.children()}
      <div>
        {/* 父传给的内容 */}
        {props.foo('这个内容是dialog传递的')}
      </div>
      <div>
        {/* 具名的插槽 */}
        {props.fotter}
      </div>
    </div>
  )
}

//WelcomeDialog通过复合提供内容
function WelcomeDialog() {
  const fotter = <button onClick={()=>alert('react')}>确定</button>
  return (
    <div>
      {/* 传递任意合法表达式 */}
      {/* foo中的c就相当于在Diglog中写的名称 */}
      <Dialog color="red" fotter={fotter} foo={(c)=><p>{c}</p>}>
        {/* <h1>Hello World！</h1> */}
        {/* <p>钟爱react</p> */}
        {
          c => (
            <div>
              <h1>Hello World！</h1>
              <p>钟爱react</p>
            </div>
          )
        }
      </Dialog>
    </div>
  )
}


// 过滤器，消除除p标签以外的标签
function FilterP(props) {
  return (
    <div>
      {
        React.Children.map(props.children,child => {
          // child实际上是虚拟DOM
          console.log(child);
          if(child.type !== 'p'){
            return;
          }
          return child;
        })
      }
    </div>
  )
}

function RadioGroup(props){
  // 将RadionGroup的name属性赋值给所有的Radio
  return (
    <div>
      {
        React.Children.map(props.children, child => 
          // 第一种：将属性名直接赋值给，但React不允许添加属性，因为对象不能扩展
          // child.props.name = props.name;

          // 第二种：React.cloneElement：可以克隆一个虚拟dome
          React.cloneElement(child, { name: props.name })
        )
      }
    </div>
  )
}

function Radio(props) {
  return (
    <label>
      <input type="radio" name={props.name} />
      {props.children}
    </label>
  );
}

export default function Composition() {
  return (
    <div>
      <WelcomeDialog />
      
      <FilterP>
        <h1>foo</h1>
        <p>bar</p>
        <h2>head</h2>
        <p>Jerry</p>
      </FilterP>

      {/* 单选 */}
      <RadioGroup name="mvvm">
        <Radio value="vue">vue</Radio>
        <Radio value="react">react</Radio>
        <Radio value="angular">angular</Radio>
      </RadioGroup>
    </div>
  )
}

