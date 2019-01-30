const csjs = require('csjs-inject')
const bel = require('bel')
const mermaid = require('mermaid')

module.exports = landingpage

async function landingpage ({ title }) {
  const url = new URL('/procedures/ef-workflow.sequence', location.origin).href
  const template = await fetch(url).then(response => response.text())
  console.log(template)

  var diagram = localStorage.diagram || (localStorage.diagram = template)
  var counter = 1

  const [
    textarea, renderbtn, resetbtn, view
  ] = [
    bel`<textarea class=${css.diagram}>${diagram}</textarea>`,
    bel`<button class=${css.button} onclick=${_ => render(textarea.value)}>render</button>`,
    bel`<button class=${css.button} onclick=${reset}>reset<input type="checkbox"></button>`,
    bel`<div class=${css.view}></div>`
  ]
  render(localStorage.diagram)

  const element = bel`<div class=${css.app}>
    <h1 class=${css.title}>${title}</h1>
    <div class=${css.content}>
      <div class=${css.editor}>
        ${textarea}
        <div class=${css.buttons}>

          ${resetbtn}
          ${renderbtn}
        </div>
        <a href="https://mermaidjs.github.io/sequenceDiagram.html" target="_blank">
          <strong>learn diagram syntax</strong>
        </a>
      </div>
      ${view}
    </div>
  </div>`
  return element
  function update (svg) { view.innerHTML = svg }
  function render (x) {
    mermaid.mermaidAPI.render(`id${counter++}`,`sequenceDiagram\n${x}`,update)
  }
  function reset () {
    diagram = localStorage.diagram = template
    textarea.value = diagram
    render(diagram)
  }
  function switchit (event) {
    console.log("yo yo yo")
  }
}

const css = csjs`
body { box-sizing: border-box; margin: 0; }
.app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.title {
  align-self: center;
  font-size: 45px;
  font-weight: 900;
  color: #483aaa;
  font-family: "Lucida Console", Monaco, monospace;
}
.content {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}
.editor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #867ade;
  width: 50%;
}
.diagram {
  margin-top: 25px;
  display: block;
  width: 90%;
  height: 90%;
  padding: 10px;
  border: 1px dashed black;
  color: lightblue;
  font-weight: 600;
  background-color: #483aaa;
  color: #867ade;
  font-size: 20px;
  font-family: "Lucida Console", Monaco, monospace;
}
.buttons { width: 90%; }
.button {
  width: 45%;
  margin: 5px;
  font-family: "Lucida Console", Monaco, monospace;
}
.view {
  background-color: lightblue;
  width: 50%;
  overflow: hidden;
}`
