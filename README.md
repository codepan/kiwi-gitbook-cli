# 介绍
该脚手架默会为您创建一个集成gitbook来构建静态电子书，集成gulp对静态资源进行压缩混淆，并集成了ftp和scp两种方式自动化部署到服务器上的一个脚手架工具

非常适合喜欢使用markdown语法来写技术文章、笔记总结等人群。
# 安装
```shell
yarn global add @codepan/kiwi-gitbook-cli
```
OR
```shell
npm i -g @codepan/kiwi-gitbook-cli
```
# 配置文件
使用脚手架初始化的项目，项目根路径下会有两个配置文件，文件必须存在，且文件位置和名字不能改动：
* gitbook.config.js 项目配置文件，这个文件需要你使用commonjs规范导出一个对象进行配置
* gulpfile.js gulp配置文件，一般情况下无需做变动

# gitbook.config.js文件配置项

**mode**

类型：string

释义：部署到服务器上的模式，默认为`scp`，也可以不传

取值：`ftp`、`scp`

**entry**

类型：string

释义：项目打包的入口，默认为`./src`

**output**

类型：string

释义：产出目录，默认为`./dist`

**deploy**

类型：object

释义：配置部署相关的参数

取值：
```
{
  projectName,
  rootPath,
  connectOptions
}
```

**deploy.projectName**

类型：string

释义：项目名称，即项目将来部署到服务器上的文件夹名字

**deploy.rootPath**

类型：string

释义：指定项目要部署到服务器上根路径

**deploy.connectOptions**

类型：object

释义：配置连接ftp服务器，或ssh连接服务器时所需的配置参数

取值：
```
{
  host,
  user,
  password
}
```

**deploy.connectOptions.host**

类型：string

释义：主机，填写IP地址

**deploy.connectOptions.user**

类型：string

释义：用户名

**deploy.connectOptions.password**

类型：string

释义：密码

**deploy.devServer**

类型：object

释义：配置开发服务器

取值：
```
{
  port,
  open,
  watch
}
```

**deploy.devServer.port**

类型：number

释义：端口号，默认为4000


**deploy.devServer.open**

类型：boolean

释义：是否自动打开浏览器，默认false

**deploy.devServer.watch**

类型：boolean

释义：是否开启监测模式，默认true
# 命令

**查看版本**

```shell
kiwi-gitbook -V|--version
```

**使用帮助**

```shell
kiwi-gitbook -h|--help
```

**查看所有预设模板**

```shell
kiwi-gitbook list
```

**创建项目**

```shell
kiwi-gitbook create <project>
```

**启动web服务器，进行本地开发预览**

```shell
kiwi-gitbook dev
```

**构建项目**

```shell
kiwi-gitbook build
```

**部署项目**

```shell
kiwi-gitbook deploy
```