import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react';
import { evaluate } from 'eval-cljs';
function PlayIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: "size-6"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z",
    clipRule: "evenodd"
  }));
}
export function CljsCodeBlock({
  children
}) {
  const [output, setOutput] = React.useState("");
  function handleRun() {
    setOutput("Running...");
    let [evalOutput, printOutput] = evaluate(children);
    setOutput(printOutput.concat(evalOutput).join("\n"));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "clojure",
    style: style,
    showLineNumbers: false
  }, children), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleRun(),
    style: {
      minWidth: 30,
      minHeight: 30
    }
  }, /*#__PURE__*/React.createElement(PlayIcon, null)), output && /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "clojure",
    style: style,
    showLineNumbers: false
  }, output));
}
