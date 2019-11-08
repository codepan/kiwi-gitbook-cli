#!/usr/bin/env node

const program = require('commander')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const packageJSON = require('../package.json')

const templates = {
  default: {
    url: 'github:codepan/kiwi-gitbook-template-default',
    description: '默认模板，该模板包括gitbook、资源压缩和自动部署'
  }
}

const getQuestions = project => ([
  {
    name: 'name',
    type: 'input',
    message: '项目名称',
    default: project
  },
  {
    name: 'description',
    type: 'input',
    message: '项目描述',
    default: '一个gitbook模板项目'
  },
  {
    name: 'author',
    type: 'input',
    message: '项目作者'
  }
])

program
  .version(packageJSON.version)

program
  .command('init <template> <project>')
  .description('初始化项目模板')
  .action((template, project) => {
    // 下载之前loading提示
    const spinner = ora('开始下载').start()

    const { url } = templates[template]
    download(url, project, null, err => {
      // 下载失败
      if (err) return spinner.fail(chalk.red('下载失败'))

      // 下载成功
      spinner.succeed(chalk.green('下载成功'))
      
      // 把项目下的package.json文件读取出来
      // 使用向导的方式采集用户输入的值
      // 使用模板引擎把用户输入的数据解析到package.json文件中
      // 解析完毕，再将解析之后的结果重新写入到package.json文件中
      inquirer.prompt(getQuestions(project)).then(answers => {
        const packageJSONPath = path.resolve(process.cwd(), project, 'package.json')
        const packageJSONContent = fs.readFileSync(packageJSONPath, 'utf-8')
        const packageJSONResult = handlebars.compile(packageJSONContent)(answers)
        fs.writeFileSync(packageJSONPath, packageJSONResult)
        console.log(chalk.green('初始化项目成功'))
      })
    })
  })

program
  .command('list')
  .description('查看所有预设模板')
  .action(() => {
    Object.entries(templates).forEach(([key, { description }]) => {
      console.log(`${key} - ${description}`)
    })
  })
program.parse(process.argv)
