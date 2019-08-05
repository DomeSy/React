//创建kcreat-dom：实现render，能够将kvdom返回的dom追加至container
import { initVNode } from './kvdom';

function render(vdom, container){
  // console.log(vdom);
  // console.log(container);
  // container.innerHTML = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`;
  
  const node = initVNode(vdom);
  
  console.log(node);
  container.appendChild(node);
}
export default { render }
