const path = require('path')
const fs = require('fs')

const FTPDeployer = require('./FTPDeployer')
const SCPDeployer = require('./SCPDeployer')

const { logger } = require('../../../../utils')
const { supportModes } = require('../../../../config')

class Deployer {
  constructor (configs) {
    this.configs = configs
  }

  processConfigs () {
    let configs = this.configs
    configs.output = path.resolve(process.cwd(), configs.output)
    configs.deployPath = path.join(configs.deploy.rootPath, configs.deploy.projectName)
  }

  checkConfigs () {
    const { mode, deploy } = this.configs
    if (!mode) {
      logger.error(`mode 目前支持${supportModes.join(',')}，两种取值，不传则默认值为scp`)
      return false
    }

    if (!supportModes.includes(mode)) {
      logger.error(`mode 目前只支持${supportModes.join(',')}，${mode}为非法模式`)
      return false
    }

    if (!deploy) {
      logger.error('未提供deploy配置项')

      logger.error(`deploy配置项必填参数有：projectName, rootPath, connectOptions{host, user}`)

      return false
    }

    const { projectName, rootPath, connectOptions } = deploy
    if (!projectName) {
      logger.error('未提供deploy.projectName配置项')
      return false
    }

    if (!rootPath) {
      logger.error('未提供deploy.rootPath配置项')
      return false
    }

    if (!connectOptions) {
      logger.error('未提供deploy.connectOptions配置项')
      return false
    }

    const { host, user, password } = connectOptions
    if (!host || !user) {
      logger.error('connectOptions{host, user}为必填项')
      return false
    }

    if (mode === 'ftp' && !password) {
      logger.error('ftp模式下connectOptions.password为必填项')
      return false
    }

    return true
  }

  checkDeployEnv () {
    const { output } = this.configs
    if (!fs.existsSync(output)) {
      logger.error(`将要部署的目录 ${output} 不存在`)
      return false
    }

    return true
  }


  run () {
    if (!this.checkDeployEnv()) return
    if (!this.checkConfigs()) return

    this.processConfigs()

    let deployer = null
    const { mode } = this.configs
    if (mode === 'ftp') {
      deployer = new FTPDeployer(this.configs)
    }
    if (mode === 'scp') {
      deployer = new SCPDeployer(this.configs)
    }
    
    if (!deployer) {
      return
    }

    deployer.run()
  }
}

module.exports = Deployer