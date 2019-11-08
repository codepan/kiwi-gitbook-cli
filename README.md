# 介绍
该脚手架默认使用[这个github项目](https://github.com/codepan/kiwi-gitbook-template-default)为模板，会为您创建一个集成gitbook来构建静态电子书，集成gulp对静态资源进行压缩混淆，并集成了ftp自动化部署到自己的服务器上的一个脚手架工具

非常适合喜欢使用markdown语法来写技术文章、笔记总结等人群。
# 安装
```shell
yarn global add @codepan/kiwi-gitbook-cli
```
OR
```shell
npm i -g @codepan/kiwi-gitbook-cli
```

# 使用

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

**初始化项目模板**

```shell
kiwi-gitbook init <template> <project>
```