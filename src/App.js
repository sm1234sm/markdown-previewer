import React, { useRef, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import Split from 'react-split';

import './App.css';
import "prismjs/themes/prism.css"; 
import 'prismjs/components/prism-markdown';


function EditorBox(props) {
  return (
    <div className="resizable-box">
      <div className="container-editor-area">
        <Editor
            value={props.code}
            onValueChange={code => props.setCode(code)}
            highlight={code => highlight(code, languages.markdown)
              .split('\n')
              .map(
                line =>
                  `<span class="container-editor-line-number">${line}</span>`
              )
              .join('\n')}
            padding={10}
            style={{
              fontFamily: '"Roboto Mono", monospace',
              fontSize: 12,
            }
          }
          className="container-editor"
        />
      </div>
    </div>);
}

function ResultBox(props) {
  return (
    <div className="resizable-box">
      <ReactMarkdown className="markdown-rendered-box" plugins={[gfm]}>
        {props.code}
      </ReactMarkdown>
    </div>
  );
}

function App() {
  const [code, setCode] = useState(defaultValue)

  return (
    <div className="App">
      <div className="wrapper">
        <Split
        sizes={[50, 50]}
        direction="horizontal"
        cursor="col-resize">
          <EditorBox code={code} setCode={setCode} className="resizable-box"/>
          <ResultBox code={code} className="resizable-box"/>
        </Split>
      </div>
    </div>
  );
}
const defaultValue = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
export default App;
