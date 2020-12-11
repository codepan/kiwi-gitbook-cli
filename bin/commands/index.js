const mixinCreate = require('./create')
const mixinList = require('./list')
const mixinDev = require('./dev')
const mixinBuild = require('./build')
const mixinDeploy = require('./deploy')

module.exports = {
  mixinCreate,
  mixinList,
  mixinDev,
  mixinBuild,
  mixinDeploy
}