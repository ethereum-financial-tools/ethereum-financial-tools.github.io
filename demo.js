const tools = require('./')

;(async () => {
  const element = await tools({ title: 'ethereum tools'})
  document.body.appendChild(element)
})()
