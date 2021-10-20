#!/usr/bin/env node
const program = require('commander')
const download = require("download-git-repo")
const inquirer = require('inquirer')
const chalk = require('chalk')

// 获取package.json中的版本信息
program.version(require("../package.json").version)

const questions = [
	{
		type: 'input',
		name: 'projectName',
		message: '请输入项目名称',
	},
	{
		type: 'list',
		name: 'frameWork',
		message: '请选择框架',
		default: 'React',
		choices: ['React','Vue']
	},
]

program
	.command('create')
	.action(() => {
		inquirer.prompt(questions)
			.then(({projectName, frameWork}) => {
				switch (frameWork) {
					case 'React':
						download(
							'direct:git@github.com:ys558/ych-template.git',
							projectName,
							{ clone: true },
							(err) => {
								// 错误回调：
								if (err) console.log(chalk.bgYellow(err))
								console.log(`${chalk.greenBright(projectName)} ${chalk.greenBright('项目创建成功')}`)
							})
						break;
					case 'Vue':
						download(
							'direct:git@github.com:ys558/ych-template.git',
							projectName,
							{ clone: true },
							(err) => {
								// 错误回调：
								if (err) console.log(chalk.bgYellow(err))
								console.log(`${projectName} 项目创建成功`)
							})
						break;
					default:
						break;
				}
			})
	})


program.parse(process.argv)
