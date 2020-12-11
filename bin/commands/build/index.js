const shell = require('shelljs')
const { getConfigs } = require('../../../utils')
module.exports = program => {
  program
  .command('build')
  .description('构建项目')
  .action(() => {
    const { entry, output } = getConfigs()
    const command = `npx gitbook build ${entry} ${output} && npx gulp`
    shell.exec(command)
  })
}