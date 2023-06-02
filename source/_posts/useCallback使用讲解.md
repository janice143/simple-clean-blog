---
title: useCallback使用讲解
date: 2023-05-28 19:57:00
---


## 引言

作为react框架内置的hooks之一，我们知道这个hook可以实现缓存，进而提升页面性能。那么这个hook究竟可以在什么场景下使用呢？本文针对这个问题进行了探讨。

## 用法

```jsx
import { useCallback } from "react"

const cachedFn = useCallback(fn, dependencies)
```

可以看到，useCallback的入参有两个：函数和依赖。返回的是一个函数定义。

useCallback可以缓存函数定义，只有当依赖中的数据更新后，才会重新创建函数，否则，使用的函数是上一次渲染时存储的函数。

## 理解useCallback

1. 普通的函数定义
通过点击按钮让数字增加的时候，由于cnt的state更新，导致整个组件重新渲染，函数increment重新创建。

[https://codesandbox.io/s/friendly-easley-m8f49g?file=/src/pages/useCallback-case.js:72-87](https://codesandbox.io/s/friendly-easley-m8f49g?file=/src/pages/useCallback-case.js:72-87)

2. 普通函数包裹了useCallback
increment函数被useCallback包裹，当点击按钮时，cnt更新，组件重新渲染。但是cnt加到1后就无法继续增长。

这是因为useCallback缓存了increment函数，每次点击按钮的时候，使用的是上一次缓存的函数，这个时候cnt的值都是0，所以后面点击按钮时， cnt无法继续往上加。

[https://codesandbox.io/s/friendly-easley-m8f49g?file=/src/pages/useCallback-case.js:72-87](https://codesandbox.io/s/friendly-easley-m8f49g?file=/src/pages/useCallback-case.js:72-87)

如果想让cnt继续累加，可以在useCallback的第二个参数上绑定依赖：`[cnt]`。

但是这个做法并没有体现useCallback的缓存优势，更糟糕的是，这种错误使用useCallback，需要额外产生监视cnt变化的性能消耗。

但是好在我们观察到了使用useCallback和不使用的区别。这是理解useCallback的第一步。

3. useCallback缓存的是什么
缓存的是具有相同内存地址的函数定义。每次重新创建一个函数，该变量都会指向不同的内存地址，useCallback缓存的上上一个创建函数时的内存指针。

```jsx
"string" === "string" // true
0 === 0 // true
true === true // true
{} === {} // false
[] === [] // false

const f = () => 'Hi'
const f1 = f
const f2 = f

f1 === f1 // true
f1 === f2 // false
```

4. 为什么要缓存函数定义？

如果函数作为react的hooks上的依赖，或者子组件的参数等场景，如果不使用useCallback进行缓存，每次函数创建都会返回一个新的函数定义（有点像创建一个变量，然后赋值空对象，这些对象执行的内存都不同，所以===时不相等），这样就会导致hooks内部重新执行或者子组件重新渲染。

## useCallback使用场景

1. 减少组件重新渲染：子组件传入一个函数，且子组件被React.memo缓存了。

shippingForm是一个人为增加了性能的组件，每次count增加的时候，该组件都要重新渲染，每次渲染性能都消耗很大，所以可以看到，点击+的时候，页面会出现很卡的效果。

但是当我们勾选（或取消）dark mode，发现这个页面切换是非流畅。这是因为ShippingForm并没有重新渲染。为什么呢？

每次切换白天/黑夜背景的时候，theme的状态更新导致productPage重新渲染，由于useCallback的使用，handleSubmit函数没有重新创建，所以传递给子组件ShippingForm的props没有改变，由于React.memo的使用，ShippingForm没有重新渲染。

<aside>
💡 注：React.memo的用法是用来包裹整个组件，当props参数都不变（引用不变）时，组件不会重新渲染。
</aside>

[https://codesandbox.io/s/elegant-chatelet-5urqn7?file=/ProductPage.js](https://codesandbox.io/s/elegant-chatelet-5urqn7?file=/ProductPage.js)

2. 减少函数重新创建：state状态变化，导致页面重新渲染，为了减少函数创建，可以使用useCallback进行缓存

只看下面代码中的useEffect和addGuessedLetter函数，每次触发按键事件，guessedLetters的值会更新，使得页面渲染，如果不使用useCallback，addGuessedLetter函数会在每次渲染的时候重新创建。

我们并不希望他重新创建，如果这个函数内部没有setState，我们可以放到组件外面解决这个问题，但是这个函数有。为了减少函数创建，可以给这个函数包裹useCallback，并且不要添加任何依赖。这样可以保证addGuessedLetter函数只被创建一次。尽管这个函数只被创建了一次，但是每次setGuessedLetters都会用到上一个guessedLetters的值，这是因为`setGuessedLetters((curLetters) => [...curLetters, letter]);`

## 总结

关于useCallback何时使用问题，其实主要把握一个点就行：useCallback的功能就是缓存函数定义，如果你不希望函数由于重新创建产生新的定义，而导致多余渲染或者不必要重复执行，那就可以用useCallback进行缓存。

## 参考资料

1. react文档官方示例：[https://react.dev/reference/react/useCallback#examples-rerendering](https://react.dev/reference/react/useCallback#examples-rerendering)
2. Better React Performance – When to Use the useCallback vs useMemo Hook：[https://www.freecodecamp.org/news/better-react-performance-usecallback-vs-usememo/](https://www.freecodecamp.org/news/better-react-performance-usecallback-vs-usememo/)