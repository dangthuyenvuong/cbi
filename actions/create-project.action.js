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


export const SYSTEM_TYPE = {
    REACT: 'Reactjs',
    NEXT: 'Nextjs'
}

const SYTEM_DESIGN = {
    MUI: 'Material UI',
    ANT: 'Ant Design'
}

export class CreateProjectAction {
    async handle(inputs, options) {
        try {
            let { name } = inputs

            let questions = [
                {
                    type: 'list',
                    message: chalk.yellowBright('Please choose which project type want to use?'),
                    name: 'system_type',
                    choices: [SYSTEM_TYPE.REACT, SYSTEM_TYPE.NEXT]
                },
                {
                    type: 'list',
                    message: chalk.yellowBright('Please choose which system design want to use?'),
                    name: 'system_design',
                    choices: [SYTEM_DESIGN.MUI, SYTEM_DESIGN.ANT]
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

            if (!answer.name) {

                throw new Error(t('Please input project name'))
            }

            answer.name = answer.name.toLowerCase()

            let folder = `./${answer.name}`

            if (fs.existsSync(folder)) {
                throw new Error(`Folder ${answer.name} ${t('exists, please choose another name')}`)
            }


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


            await task.run()
            console.log("%s Project ready", chalk.green.bold('DONE'))

            if (answer.system_type === SYSTEM_TYPE.NEXT) {
                console.log(`Run ${chalk.yellowBright.bold('yarn dev')} to start project`)
            } else {
                console.log(`Run ${chalk.yellowBright.bold('yarn start')} to start project`)
    
            }

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
        let { name, system_type, system_design } = inputs

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

        const run = [
            async () => {
                await File.copyFolder(url.getTemplate(`project`), `${folder}`)
                // await File.generateFile(url.getTemplate(`.gitignore`,`${folder}/.gitignore`))
            }
        ]

        let packageData = {
            name,
            version: '1.0.0',
            dependencies: {},
            devDependencies: {},
            scripts: {}
        }

        if (system_type === SYSTEM_TYPE.NEXT) {
            packageData = {
                ...packageData,
                dependencies: {
                    ...packageData.dependencies,
                    "next": "^12.0.8",
                    "next-images": "^1.8.4",
                },
                scripts: {
                    "build": "next build",
                    "start": "NODE_ENV=production node ./server/server.js",
                    "dev": "node ./server/server.js",
                }

            }


            run.push(async () => {

                const object = {
                    REACT_APP: 'NEXT_PUBLIC'
                }

                File.replace(`${folder}/.env`, object)
                File.replace(`${folder}/ci/.env.development`, object)
                File.replace(`${folder}/src/constant/api.ts`, object)
                File.replace(`${folder}/.env.example`, object)

                await File.copyFolder(url.getTemplate(`nextjs`), `${folder}`)

            })

        } else {
            packageData = {
                ...packageData,
                devDependencies: {
                    ...packageData.devDependencies,
                    "@types/react-helmet": "^6.1.4",
                    "@types/nprogress": "^0.2.0",
                },
            }
            run.push(async () => {
                await File.copyFolder(url.getTemplate(`reactjs`), `${folder}`)
            })
        }

        if (system_design === SYTEM_DESIGN.MUI) {
            packageData = {
                ...packageData,
                dependencies: {
                    ...packageData.dependencies,
                    "@date-io/moment": "^2.11.0",
                    "@emotion/react": "^11.5.0",
                    "@emotion/styled": "^11.3.0",
                    "@mui/icons-material": "^5.2.1",
                    "@mui/lab": "^5.0.0-alpha.53",
                    "@mui/material": "^5.0.6",
                    "@stripe/react-stripe-js": "^1.6.0",
                    "@stripe/stripe-js": "^1.21.2",
                    "nprogress": "^0.2.0",
                }
            }
        } else {

        }

        run.push(() => File.updateJsonFile(`${folder}/package.json`, packageData))

        for (let i in run) {
            await run[i]()
        }

        // File.generateFile(url.getTemplate(`project/package.json`), `${folder}/package.json`, params, { override: true })



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