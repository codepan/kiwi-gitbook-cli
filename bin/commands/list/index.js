const { templates } = require('../../../config')
module.exports = program => {
  program
  .command('list')
  .description('查看所有预设模板')
  .action(() => {
    Object.entries(templates).forEach(([key, { description }]) => {
      console.log(`${key} - ${description}`)
    })
  })
}