const { getConfigs } = require('../../../utils')
const Deployer = require('./deployer/Deployer')
module.exports = program => {
  program
  .command('deploy')
  .description('部署项目')
  .action(() => {
    const config = getConfigs()
    const deployer = new Deployer(config)
    deployer.run()
  })
}