#!/usr/bin/env node
const program = require('commander')
const packageJSON = require('../package.json')
const { mixinCreate, mixinList, mixinDev, mixinBuild, mixinDeploy } = require('./commands')

program
.version(packageJSON.version)

mixinCreate(program)
mixinList(program)
mixinDev(program)
mixinBuild(program)
mixinDeploy(program)

program.parse(process.argv)
