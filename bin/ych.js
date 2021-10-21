#!/usr/bin/env node
const commander = require('commander')
const download = require("download-git-repo")
const inquirer = require('inquirer')
const chalk = require('chalk')
const figlet = require('figlet')

// 将不同的commander进行分离，create只负责create命令的处理
const program = new commander.Command()
const create = program.command('create')
	
// 获取package.json中的版本信息
program.version(require('../package.json').version, '-v --version')


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

create
	.usage('直接enter即可创建项目')
	.description('创建项目命令')
	// 在该命令加上 
	.option('-ts', '项目用type script')
	.option('-js', '项目用java script')
	.action((option) => {
		console.log(option)
		inquirer.prompt(questions)
			.then(({projectName, frameWork}) => {
				switch (frameWork) {
					case 'React':
						download(
							'direct:git@github.com:ys558/ych-template.git#main',
							projectName,
							{ clone: true },
							(err) => {
								// 错误回调：
								if (err) {
									console.log(chalk.bgYellow(err))
									return
								}else{
									console.log(`${chalk.bgGrey(projectName)} ${chalk.greenBright('项目创建成功')}`)
								}
							})
						break;
					case 'Vue':
						download(
							'direct:git@github.com:ys558/ych-template.git#main',
							projectName,
							{ clone: true },
							(err) => {
								// 错误回调：
								if (err) {
									console.log(chalk.bgYellow(err))
									return
								}else{
									console.log(`${chalk.bgGrey(projectName)} ${chalk.greenBright('项目创建成功')}`)
								}
							})
						break;
					default:
						break;
				}
			})
	})

program.parse(process.argv)
