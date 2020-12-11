const templates = {
  default: {
    url: 'github:codepan/kiwi-gitbook-template-default',
    description: '默认模板，该模板包括gitbook、资源压缩和自动部署'
  }
}

const questions = [
  {
    name: 'name',
    type: 'input',
    message: '项目名称'
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
]

const defaultConfigs = {
  mode: 'scp',
  entry: './src',
  output: './dist',
  devServer: {
    port: 4000,
    watch: true,
    open: false
  }
}

const defaultConfigFile = 'gitbook.config.js'

const supportModes = ['scp', 'ftp']

module.exports = {
  templates,
  questions,
  defaultConfigs,
  defaultConfigFile,
  supportModes
}