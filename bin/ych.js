#!/usr/bin/env node
const program = require('commander')
const download = require("download-git-repo")
const inquirer = require('inquirer')

// 获取package.json中的版本信息
program.version(require("../package.json").version)

program.option('-d, --description', 'ych 脚手架简介：。。。。')

program.command('create <projectName>')
	.option('-react')
	.option('-vue')
	.action((projectName, option) => {
		const type = Object.keys(option)[0]
		switch(type) {
			case "Vue":
				download(
					'direct:git@github.com:ys558/ych-template.git',
					projectName,
					{ clone: true },
					err => {
						// 错误回调：
						if (err) console.log(err)
						console.log(`${projectName} 项目创建成功`)
					}
				)
				break;
			case "React":
				download(
					'direct:git@github.com:ys558/ych-template.git',
					projectName,
					{ clone: true },
					(err) => {
						// 错误回调：
						if (err) console.log(err)
						console.log(`${projectName} 项目创建成功`)
					}
				)
				break;
			default:
				console.log("未添加参数，不能下载")
		}
	})


program.parse(process.argv)
