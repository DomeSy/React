function* say() {
  let a = yield '1';
  console.log(a)
  let b = yield '2';
  console.log(b)
}


let it = say(); // 返回迭代器

// 每次执行next，只执行 yield 后面的部分
// a的值并非该返回值，而是下次next参数
console.log(it.next()); // 输出 { value: '1', done: false }

//第一次的next()传参是无效果的，第二次传进来的其实是等于yield '1'的前半部分，实际上复制给了a
console.log(it.next('我是被传进来的1'));  // '我是被传进来的1'
                                         // { value: '2', done: false } (自身的返回值)
                                         
console.log(it.next('我是被传进来的2'));  // '我是被传进来的2'
                                        // { value: undefined, done: false } (自身的返回值)