const path= require('path')
const chalk = require('chalk')
const { questions, defaultConfigs, defaultConfigFile } = require('../config')

const logger = {
  error (message) {
    console.log(chalk.red(message))
  },
  success (message) {
    console.log(chalk.green(message))
  }
}

// {
//   name: 'packageManageTool',
//   type: 'radio',
//   message: '您使用的包管理工具是？'
// },
const getQuestions = project => {
  return questions.map(question => {
    if (question.name === 'name') {
      return {
        ...question,
        default: project
      }
    }

    return question
  })
}



const getConfigs = () => {
  let configs = { ...defaultConfigs }
  try {
    const configFileAbsolutePath = path.resolve(process.cwd(), defaultConfigFile)
    const userConfigs = require(configFileAbsolutePath)
    if (userConfigs) {
     configs = {
       ...configs,
       ...userConfigs,
       devServer: {
         ...configs.devServer,
         ...userConfigs.devServer
       }
     }
    }
  } catch (e) {
    logger.error(`项目根路径下未提供 ${defaultConfigFile} 配置文件`)
    process.exit(0)
  }

  return configs
}

module.exports = {
  logger,
  getQuestions,
  getConfigs
}