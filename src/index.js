const csjs = require('csjs-inject')
const bel = require('bel')

module.exports = landingpage

function landingpage ({ title }) {
  return bel`<div class=${css.tools}>
    ${title}
  </div>`
}

const css = csjs`
.tools {
  font-size: 45px;
  font-weight: 900;
  color: green;
}`
