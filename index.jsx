import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react';
import { evaluate } from 'eval-cljs';

function PlayIcon() {
    return (<svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
    </svg>);
}

export function CodeBlock({ children, language = "clojure", allowEval = true, style = darcula, ...props }) {
    const [output, setOutput] = React.useState("")

    function handleRun() {
        setOutput("Running...")
        let [evalOutput, printOutput] = evaluate(children);
        setOutput(printOutput.concat(evalOutput ?? 'nil').join("\n"))
    }

    return (
        <>
        <SyntaxHighlighter
            language={language}
            style={style}
            {...props}
            >
          {children}
        </SyntaxHighlighter>
        {allowEval && language === "clojure" && (<>
          <button onClick={() => (handleRun())} style={{minWidth: 30, minHeight: 30}}><PlayIcon /></button>
          {output && (<SyntaxHighlighter
              language={language}
              style={style}
              showLineNumbers={false}>
            {output}
          </SyntaxHighlighter>)}
        </>)}
        </>
      );
}

export function Repl({
  defaultInput = `(println "Hello World!")`,
  outputClass = "px-2 py-1 h-3/4 max-h-3/4",
  formClass = "flex-row sm:flex px-2 sm:h-1/4",
  textareaClass = "w-full h-full p-1 bg-gray-800",
  submitClass = "rounded bg-blue-600 py-1 px-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
}) {
  const [input, setInput] = React.useState(defaultInput);
  const [output, setOutput] = React.useState("")

  function handleChange(e) {
      setInput(e.target.value);
  }

  function handleSubmit(e) {
      e.preventDefault();
      let [evalOutput, printOutput] = evaluate(input);
      setOutput(
        output.concat(
          input,
          "\n",
          printOutput.concat(evalOutput ?? 'nil').join("\n")
        ).concat("\n")
      )
  }

  return (<>
      <div className={outputClass}>
        {output.split("\n").map((o, i) => (<div key={i}>{o}</div>))}
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={formClass}>
          <textarea className={textareaClass} spellCheck={false} onChange={(e) => handleChange(e)}>{input}</textarea>
          <input type="submit" className={submitClass} value="Enter" />
      </form>
      </>
    );
}