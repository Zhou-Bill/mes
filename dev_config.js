const { app } = require('electron')

const config = {
  mainLoadURL: 'https://q.guanmai.cn/mes',
  printLoadURL: 'https://txcdn.guanmai.cn/mes/feature-lite/print.html',
  isOpenDevTools: false,
  showPrint: false,
  isOpenPrintDevTools: false,
}

try {
  const mes = require(app.getPath('desktop') + '/mes.json')
  Object.assign(config, mes)
} catch (err) {
  console.log(err)
}

module.exports = config
