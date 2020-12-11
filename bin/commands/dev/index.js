const shell = require('shelljs')
const { getConfigs } = require('../../../utils')
const { defaultConfigs } = require('../../../config')
module.exports = program => {
  program
  .command('dev')
  .description('启动web服务器，进行本地开发预览')
  .action(() => {
    const { entry, output, devServer = {} } = getConfigs()
    const { port, watch, open } = {...defaultConfigs.devServer, ...devServer}
    const command = `npx gitbook serve ${entry} ${output} --port ${port} ${watch ? '--watch' : '--no-watch'} ${open ? '--open' : '--no-open'}`
    shell.exec(command)
  })
}