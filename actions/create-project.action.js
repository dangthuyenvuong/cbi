import chalk from "chalk";
import { SchematicOption } from '../lib/schematics/index.js'
import fs from 'fs'
import path from 'path'
import { url, str, logger, __awaiter, File } from "../lib/utils/index.js";
import { t } from "../locale/index.js";
import { config } from '../config/index.js'
import { CbiCollection } from '../lib/schematics/index.js'
import shell from 'shelljs'
import inquirer from 'inquirer'


import execa from 'execa'
import Listr from 'listr'
import { projectInstall } from 'pkg-install'

export class CreateProjectAction {
    async handle(inputs, options) {
        let { name } = inputs

        let questions = [
            {
                type: 'list',
                message: chalk.yellowBright('Please choose which project type want to use?'),
                name: 'system_type',
                choices: ['Reactjs', 'Nextjs']
            },
            {
                type: 'list',
                message: chalk.yellowBright('Please choose which system design want to use?'),
                name: 'system_design',
                choices: ['Material UI', 'Ant Design']
            }
        ]

        if (!name) {
            questions.unshift({
                type: 'input',
                message: chalk.yellowBright('Enter project name?'),
                name: 'name',
            })
        }

        const answer = await inquirer.prompt(questions)

        inputs = Object.assign(inputs, answer)

        options = {
            ...options,
            targetDirectory: options.targetDirectory || (process.cwd() + `\\${inputs.name.toLowerCase()}`)
        }

        const task = new Listr([
            {
                title: 'Copy project files',
                task: () => copyProjectFile(inputs)
            },
            {
                title: 'Initialize git',
                task: () => initGit(options),
                // enabled: () => options.git
            },
            {
                title: 'Install depenedcies',
                task: () => projectInstall({
                    cwd: options.targetDirectory,
                })
            }
        ])

        try {
            await task.run()
            console.log("%s Project ready", chalk.green.bold('DONE'))
            // logger.info(`${t('Create')} project ${t('at')}: ` + chalk.yellowBright(folder))
        } catch (error) {
            logger.error("\n" + error.message + "\n")
        }


        // return __awaiter(this, void 0, void 0, function* () {

        //     copyProjectFile(inputs)
        // });
    }
}



async function copyProjectFile(inputs) {

    try {
        let { name } = inputs
        if (!name) {

            throw new Error(t('Please input project name'))
        }
        name = name.toLowerCase()


        let folder = `./${name}`

        if (fs.existsSync(folder)) {
            throw new Error(`Folder ${name} ${t('exists, please choose another name')}`)
        }

        fs.mkdirSync(folder, { recursive: true });

        let params = {
            project_name: name,
            design_system: `
                "antd": "^4.16.13"
            `
        }

        await File.copyFolder(url.getTemplate(`project`), `${folder}`)
        File.generateFile(url.getTemplate(`project/package.json`), `${folder}/package.json`, params, { override: true })



        // shell.cd(name)

        // if (shell.exec(`yarn install`).code === 0) {
        //     logger.info(`${t('Create')} project ${t('at')}: ` + chalk.yellowBright(folder))
        // }
        // shell.exit(1)

    } catch (error) {
        logger.error("\n" + error.message + "\n")
        return;
    }

}


async function initGit(options) {
    const result = await execa('git', ['init'], {
        cwd: options.targetDirectory
    })
    if (result.failed) {
        return Promise.reject(new Error('Failed to nitialize Git'))
    }
    return
}