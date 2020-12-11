const Ftp = require('ftp')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const { logger } = require('../../../../utils')

class FTPDeplayer {
  constructor (configs) {
    const { output, deploy } = configs
    this.output = output
    this.deployPath = `${deploy.rootPath}/${deploy.projectName}`
    this.connectOptions = deploy.connectOptions
    this.ftp = new Ftp()
  }

  checkDeployEnv (callback) {
    const { ftp, deployPath } = this
    const spinner = ora(chalk.green('正在连接远程ftp服务器')).start()
    ftp.on('ready', () => {
      ftp.list(deployPath, (err, list) => {
        if (err || list.length === 2) {
          return callback()
        }

        inquirer.prompt([
          {
            type: 'confirm',
            name: 'continue',
            message: `远程目录${deployPath}不是一个空目录，继续部署会覆盖掉所有内容，您确定继续吗？`,
            default: false
          }
        ]).then(answer => {
          if (answer.continue) {
            callback()
          }
        })
      })
    })

    ftp.on('error', error => {
      spinner.fail(chalk.red('连接出错'))
      console.log(error)
    })

    ftp.on('close',  () => spinner.fail(chalk.red('连接失败，请检查deploy.connectOptions选项中的host、user以及password是否配置正确')))

    ftp.connect(this.connectOptions)
  }

  getFiles () {
    let files = []
    const walk = dir => {
      try {
        const list = fs.readdirSync(dir)
        list.forEach(file => {
          file = path.resolve(dir, file)
          const stat = fs.statSync(file)
          if (stat && stat.isDirectory()) {
            walk(file)
          } else {
            files.push(file)
          }
        })
      } catch (e) {
        logger.error(`获取将要部署的目录${dir}内容失败`)
      }
    }
    walk(this.output)

    return files
  }

  deploy () {
    const { ftp, output, deployPath } = this
    const files = this.getFiles()
    if (!files.length) {
      logger.error(`不能部署空目录${output}，部署失败`)
      ftp.end()
      return
    }

    files.forEach(file => {
      let relativePath = path.relative(this.output, file)
      let { dir, base } = path.parse(relativePath)
      if (!dir) {
        ftp.mkdir(deployPath, true, err => {
          if (err) throw err
          ftp.put(file, `${deployPath}/${base}`, err => {
            if (err) throw err
          })
          ftp.end()
        })
      } else {
        ftp.mkdir(`${deployPath}/${dir}`, true, err => {
          if (err) throw err
          ftp.put(file, `${deployPath}/${dir}/${base}`, err => {
            if (err) throw err
          })
          ftp.end()
        })
      }
    })
  }

  run () {
    this.checkDeployEnv(() => {
      this.deploy()
    })
  }
}


module.exports = FTPDeplayer