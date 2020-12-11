const ora = require('ora')
const download = require('download-git-repo')
const chalk = require('chalk')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const { templates } = require('../../../config')
const { getQuestions } = require('../../../utils')

module.exports = program => {
  program
  .command('create <project>')
  .description('创建项目')
  .action(project => {
    // 下载之前loading提示
    const spinner = ora('开始创建项目').start()

    const { url } = templates.default
    download(url, project, null, err => {
      // 下载失败
      if (err) return spinner.fail(chalk.red('项目创建失败'))

      // 下载成功
      spinner.stop()

      // 把项目下的package.json文件读取出来
      // 使用向导的方式采集用户输入的值
      // 使用模板引擎把用户输入的数据解析到package.json文件中
      // 解析完毕，再将解析之后的结果重新写入到package.json文件中
      inquirer.prompt(getQuestions(project)).then(answers => {
        const packageJSONPath = path.resolve(process.cwd(), project, 'package.json')
        const packageJSONContent = fs.readFileSync(packageJSONPath, 'utf-8')
        const packageJSONResult = handlebars.compile(packageJSONContent)(answers)
        fs.writeFileSync(packageJSONPath, packageJSONResult)
        spinner.succeed(chalk.green('项目创建成功'))
        inquirer.prompt([
          {
            name: 'isAutoInstall',
            message: '是否自动安装依赖？',
            type: 'confirm',
            default: true
          },
          {
            name: 'packageManageTool',
            message: '使用哪种包管理工具进行安装？',
            type: 'list',
            choices: ['npm', 'yarn'],
            when: ({ isAutoInstall }) => isAutoInstall
          },
          {
            name: 'isAutoRun',
            message: '是否自动启动项目',
            type: 'confirm',
            default: true,
            when: ({ isAutoInstall }) => isAutoInstall
          }
        ]).then(answers => {
          if (!answers.isAutoInstall) {
            console.log('请执行以下命令，去启动项目：')
            console.log(`cd ${project}`)
            console.log('npm i')
            console.log('npm run dev')
            return
          }

          shell.cd(`./${project}`)
          shell.exec(`${answers.packageManageTool} install`)

          if (answers.isAutoRun) {
            shell.exec(`${answers.packageManageTool} run dev`)
          }
        })
      })
    })
  })
}