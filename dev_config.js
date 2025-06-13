const { app } = require('electron')

const config = {
  mainLoadURL: 'https://q.guanmai.cn/mes',
  printLoadURL: 'https://txcdn.guanmai.cn/mes/master/print.html',
  isOpenDevTools: true,
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
