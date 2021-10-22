#!/usr/bin/env node

// ! 由于 ora为mjs模块，所以其中一种解决方法就是将所有require引入模块改为 import 模块。且须在package.json中规定 { "type": "module" }
import commander from 'commander'
import download from 'download-git-repo'
import inquirer from 'inquirer'
import chalk from 'chalk'
import figlet from 'figlet'
import ora from 'ora'
import ProgressBar from 'progress'


// 将不同的commander进行分离，create只负责create命令的处理
const program = new commander.Command()
const create = program.command('create')

// ! node 不能直接import json，所以，得从package.json中获取版本信息的require也得修改为利用fs模块读取json文件
import fs from 'fs'
const versionFile = fs.readFileSync('package.json')
const v =JSON.parse(versionFile)
program.version(v.version, '-v --version')

// 大字体
figlet.defaults({font: 'Standard'})
function logo(){
	console.log(figlet.textSync('hi yyt!'));
}

// 交互输入
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

// const bar = new ProgressBar(':bar :current/:total', {total: 10})
// const timer = setInterval(() => {
// 	bar.tick()
// 	if (bar.complete) {
// 		clearInterval(timer)
// 	}else if (bar.curr === 5) {
// 		bar.interrupt('this message appears above the progress bar\ncurrent progress is ' + bar.curr + '/' + bar.total)
// 	}
// },100)

create
	.usage('直接enter即可创建项目')
	.description('创建项目命令')
	// 在该命令加上.option()可以随意添加参数
	.option('-ts', '项目用type script')
	.option('-js', '项目用java script')
	.action((option) => {
		// 参数在.action()回调函数中可以获取到：
		// console.log(option)
		logo()

		// 交互输入
		inquirer.prompt(questions)
			.then(({projectName, frameWork}) => {
				// loading效果
				const spinner = ora("下载初始化模板中...")
				spinner.start()
				switch (frameWork) {
					case 'React':
						download(
							'direct:git@github.com:ys558/yyt-template.git#main',
							projectName,
							{ clone: true },
							(err) => {
								// 错误回调：
								if (err) {
									console.log(chalk.bgYellow(err))
									return
								}else{
									spinner.succeed(`${chalk.bgGrey(projectName)} ${chalk.greenBright('项目创建成功')}`)
									spinner.stop()
								}
							})
						break;
					case 'Vue':
						download(
							'direct:git@github.com:ys558/yyt-template.git#main',
							projectName,
							{ clone: true },
							(err) => {
								// 错误回调：
								if (err) {
									console.log(chalk.bgYellow(err))
									return
								}else{
									spinner.succeed(`${chalk.bgGrey(projectName)} ${chalk.greenBright('项目创建成功')}`)
									spinner.stop()
								}
							})
						break;
					default:
						break;
				}
			})
	})

program.parse(process.argv)
