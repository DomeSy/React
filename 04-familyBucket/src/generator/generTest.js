function* g() {
  yield 'a';
  yield 'b';
  yield 'c';
  return 'ending';
}

// 返回Generator对象
console.log(g());  // g {<suspended>}   (挂载状态，里面的根本没有执行)
console.log(g().toString()); // [ object Generator ] (没有实际的意义)

const gen = g();

// //生成器函数在执行时能暂停，后面又能从暂停处继续执行（可控制是否执行，控制性增强）
// console.log(gen.next()); // {value: "a", done: true}
// console.log(gen.next()); // {value: "b", done: true}
// console.log(gen.next()); // {value: "c", done: true}
// console.log(gen.next()); // {value: "ending", done: true}

// 利用递归执行生成器的所有步骤
// function next(){
//   let { value, done } = gen.next();
//   console.log(value);  // 依次打印 a b c ending
//   if(!done)
//     next();
// }

// next();

// 利用for of 但不能打印 return中的数
for(let value of gen){
  console.log(value); // 依次打印 a b c
}