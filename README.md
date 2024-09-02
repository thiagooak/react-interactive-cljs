# React Interactive ClojureScript

Displays highlighted ClojureScript that can be run in the browser

Uses [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) and [eval-cljs](https://github.com/thiagooak/eval-cljs)

```sh
npm i react-interactive-cljs
```

```js
"use client"
import { CodeBlock } from "react-interactive-cljs"

export function Page() {
    return (<CodeBlock>{`(println "Hello")
(+ 2 2)`}</CodeBlock>)
)

```

The code above will render like the image below
![](before.png)

After clicking the "Run" button it will render like the image below
![](after.png)

Accepts the same props as [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter?tab=readme-ov-file#props)
plus:

* `language` defaults to "clojure"
* `allowEval` a boolean that defaults to true if the language is "clojure".

---

```js
"use client"
import { Repl } from "react-interactive-cljs"

export function Page() {
    return (<Repl defaultInput={`"Hello, World!"`} />)
)

```
