import { AbstractCollection } from "./abstract.collection.js";
import { __awaiter } from '../utils/index.js'
import chalk from "chalk";
import { str, url, logger, File } from '../utils/index.js'
import fs from 'fs'
import { t } from "../../locale/index.js";
import Listr from 'listr'
import { SYSTEM_TYPE } from "../../actions/create-project.action.js";


export class CbiCollection extends AbstractCollection {
    constructor(runner) {
        super('@cbi/schematics', runner)
    }

    execute(name, options) {
        const _super = Object.create(null, {
            execute: { get: () => super.execute }
        })

        return __awaiter(this, void 0, void 0, function* () {
            const schematic = this.validate(name)
            yield _super.execute.call(this, schematic, options)
        })
    }
    static getSchematics() {
        return CbiCollection.schematics.filter((item) => item.name !== 'angular-app');
    }

    validate(name) {
        const schematic = CbiCollection.schematics.find((s) => s.name === name || s.alias === name);
        if (schematic === undefined || schematic === null) {
            throw new Error(`Invalid schematic "${name}". Please, ensure that "${name}" exists in this collection.`);
        }
        return schematic.name;
    }
}

CbiCollection.schematics = [
    // {
    //     name: 'model',
    //     alias: 'm',
    //     description: `Generate a new ${chalk.yellowBright('model')}`,
    //     run(inputs) {

    //         let fileName = `./src/app/models/${inputs.name.toLowerCase()}.model.ts`
    //         let modelFolder = `./src/app/models`

    //         File.generateFile(url.getTemplate(`model.ts`), fileName, {
    //             name: str.upperCaseFirstLetter(inputs.name),
    //             url: inputs.name
    //         })

    //         File.insert(`${modelFolder}/index.ts`, [
    //             {
    //                 append: true,
    //                 text: `export * from './${inputs.name}.model'`
    //             }
    //         ])

    //         logger.info(`${t('Create')} model ${t('at')}: ` + chalk.yellowBright(fileName))
    //     }
    // },
    // {
    //     name: 'page',
    //     alias: 'p',
    //     description: `Generate a new ${chalk.yellowBright('page')}`,
    //     run(inputs) {
    //         let { name } = inputs

    //         let dir = name.split('/')


    //         if (dir.length > 1) {
    //             name = dir[dir.length - 1]
    //             dir = dir.join('/') + '/'
    //         }

    //         let folder = `./src/views/pages/${dir}`


    //         if (fs.existsSync(folder)) {
    //             throw new Error(`Page ${name} ${t('exists, please choose another name')}`)
    //         }

    //         fs.mkdirSync(folder, { recursive: true });

    //         let componentName = str.upperCaseFirstLetter(name)

    //         let params = {
    //             component: componentName,
    //             prop: `${componentName}Props`,
    //             name: componentName,
    //         }

    //         File.generateFile(url.getTemplate(`page/index.ts`), `${folder}/index.ts`, params)
    //         File.generateFile(url.getTemplate(`page/page.template.tsx`), `${folder}/${componentName}.template.tsx`, params)

    //         logger.info(`${t('Create')} page ${t('at')}: ` + chalk.yellowBright(folder))
    //     }
    // },

    {
        name: 'convert',
        alias: 'c',
        description: `Convert core to Reactjs or Nextjs`,
        run: async (inputs) => {

            let { name } = inputs

            // let questions = [
            //     {
            //         type: 'list',
            //         message: chalk.yellowBright('Please choose which project type want to use?'),
            //         name: 'system_type',
            //         choices: [SYSTEM_TYPE.REACT, SYSTEM_TYPE.NEXT]
            //     },
            // ]

            // const { system_type } = await inquirer.prompt(questions)

            const run = []


            let packageData = {
                dependencies: {},
                devDependencies: {},
                scripts: {}
            }


            if (name === 'next') {
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


            for (let i in run) {
                await run[i]()
            }


            await task.run()

            if (system_type === SYSTEM_TYPE.NEXT) {
                console.log(`Run ${chalk.yellowBright.bold('yarn dev')} to start project`)
            } else {
                console.log(`Run ${chalk.yellowBright.bold('yarn start')} to start project`)

            }
        }
    },
    {
        name: 'store',
        alias: 's',
        description: `Generate a new store (${chalk.yellowBright('reducer, saga, selector')})`,
        run(inputs) {
            let { name } = inputs

            let params = {
                namecase: str.upperCaseFirstLetter(name),
                name: name,
            }

            let folder = `./src/store/${name}`
            let storeDir = './src/store'

            if (File.existsSync(folder)) {
                throw new Error(`Store ${name} ${t('exists, please choose another name')}`)
            }

            fs.mkdirSync(folder, { recursive: true });

            if (!File.existsSync(`${storeDir}/index.ts`)) {
                File.generateFile(url.getTemplate(`store/rootIndex.ts`), `${storeDir}/index.ts`, params)
            }

            if (!File.existsSync(`${storeDir}/rootReducer.ts`)) {
                File.generateFile(url.getTemplate(`store/rootReducer.ts`), `${storeDir}/rootReducer.ts`, params)
            }

            if (!File.existsSync(`${storeDir}/rootSaga.ts`)) {
                File.generateFile(url.getTemplate(`store/rootSaga.ts`), `${storeDir}/rootSaga.ts`, params)
            }

            if (!File.existsSync(`${storeDir}/rootSelector.ts`)) {
                File.generateFile(url.getTemplate(`store/rootSelector.ts`), `${storeDir}/rootSelector.ts`, params)
            }

            File.generateFile(url.getTemplate(`store/index.ts`), `${folder}/index.ts`, params)
            File.generateFile(url.getTemplate(`store/reducer.ts`), `${folder}/${name}.reducer.ts`, params)
            File.generateFile(url.getTemplate(`store/saga.ts`), `${folder}/${name}.saga.ts`, params)
            File.generateFile(url.getTemplate(`store/selector.ts`), `${folder}/${name}.selector.ts`, params)


            // File.insertAfter(`${storeDir}/rootSaga.ts`, 'combineReducers\\({', `\r\n\t${params.name}: ${params.name}Reducer,`)
            // File.insertAfter(`${storeDir}/rootReducer.ts`, 'combineReducers\\({', `\r\n\t${params.name}: ${params.name}Reducer,`)
            // File.insertFirst(`${storeDir}/index.ts`, `import { ${params.name}Reducer } from './${params.name}';`)

            File.insert(`${storeDir}/rootReducer.ts`, [
                {
                    after: 'combineReducers\\({',
                    text: `\r\n\t${params.name}: ${params.name}Reducer,`
                },
                {
                    first: true,
                    text: `import { ${params.name}Reducer } from './${params.name}';`
                }
            ])

            File.insert(`${storeDir}/rootSaga.ts`, [
                {
                    after: 'createRootSaga\\(\\[',
                    text: `\r\n\t${params.name}Saga,`
                },
                {
                    first: true,
                    text: `import { ${params.name}Saga } from './${params.name}';`
                }
            ])

            logger.info(`${t('Create')} store ${t('at')}: ` + chalk.yellowBright(folder))

        }
    },
    // {
    //     name: 'service',
    //     alias: 's',
    //     description: `Generate a new ${chalk.yellowBright('service')}`
    // },
    // {
    //     name: 'cache',
    //     alias: 'c',
    //     description: `Generate a new ${chalk.yellowBright('cache')}`
    // },
    // {
    //     name: 'auth',
    //     alias: 'a',
    //     description: `Generate a new ${chalk.yellowBright('auth')}`
    // },
    // {
    //     name: 'test',
    //     alias: 't',
    //     description: `Generate a new ${chalk.yellowBright('test')}`
    // },
    // {
    //     name: 'atoms',
    //     alias: 'uia',
    //     description: `Generate a new UI ${chalk.yellowBright('atoms')}`,
    //     run(inputs){
    //         let { name } = inputs

    //         let params = {
    //             namecase: str.upperCaseFirstLetter(name),
    //             name: name,
    //         }

    //         let folder = `./src/views/ui/atoms/${params.namecase}`
    //         let storeDir = './src/views/ui/atoms'

    //         if (File.existsSync(folder)) {
    //             throw new Error(`File ${params.namecase} ${t('exists, please choose another name')}`)
    //         }

    //         fs.mkdirSync(folder, { recursive: true });

    //         if (!File.existsSync(`${storeDir}/index.ts`)) {
    //             File.generateFile(url.getTemplate(`indexEmpty.ts`), `${storeDir}/index.ts`, params)
    //         }

    //         File.generateFile(url.getTemplate(`atoms.tsx`), `${folder}/index.tsx`, params)

    //         File.insert(`${storeDir}/index.ts`, [
    //             {
    //                 append: true,
    //                 text: `export * from './${params.namecase}'`
    //             },
    //         ])

    //         logger.info(`${t('Create')} atoms ${t('at')}: ` + chalk.yellowBright(folder))
    //     }
    // },
    // {
    //     name: 'molecules',
    //     alias: 'uim',
    //     description: `Generate a new UI ${chalk.yellowBright('molecules')}`,
    //     run(inputs){
    //         let { name } = inputs

    //         let params = {
    //             namecase: str.upperCaseFirstLetter(name),
    //             name: name,
    //         }

    //         let folder = `./src/views/ui/molecules/${params.namecase}`
    //         let storeDir = './src/views/ui/molecules'

    //         if (File.existsSync(folder)) {
    //             throw new Error(`File ${params.namecase} ${t('exists, please choose another name')}`)
    //         }

    //         fs.mkdirSync(folder, { recursive: true });

    //         if (!File.existsSync(`${storeDir}/index.ts`)) {
    //             File.generateFile(url.getTemplate(`indexEmpty.ts`), `${storeDir}/index.ts`, params)
    //         }

    //         File.generateFile(url.getTemplate(`atoms.tsx`), `${folder}/index.tsx`, params)

    //         File.insert(`${storeDir}/index.ts`, [
    //             {
    //                 append: true,
    //                 text: `export * from './${params.namecase}'`
    //             },
    //         ])

    //         logger.info(`${t('Create')} molecules ${t('at')}: ` + chalk.yellowBright(folder))
    //     }
    // },
    // {
    //     name: 'organisms',
    //     alias: 'uio',
    //     description: `Generate a new UI ${chalk.yellowBright('organisms')}`,
    //     run(inputs){
    //         let { name } = inputs

    //         let params = {
    //             namecase: str.upperCaseFirstLetter(name),
    //             name: name,
    //         }

    //         let folder = `./src/views/ui/organisms/${params.namecase}`
    //         let storeDir = './src/views/ui/organisms'

    //         if (File.existsSync(folder)) {
    //             throw new Error(`File ${params.namecase} ${t('exists, please choose another name')}`)
    //         }

    //         fs.mkdirSync(folder, { recursive: true });

    //         if (!File.existsSync(`${storeDir}/index.ts`)) {
    //             File.generateFile(url.getTemplate(`indexEmpty.ts`), `${storeDir}/index.ts`, params)
    //         }

    //         File.generateFile(url.getTemplate(`atoms.tsx`), `${folder}/index.tsx`, params)

    //         File.insert(`${storeDir}/index.ts`, [
    //             {
    //                 append: true,
    //                 text: `export * from './${params.namecase}'`
    //             },
    //         ])

    //         logger.info(`${t('Create')} organisms ${t('at')}: ` + chalk.yellowBright(folder))
    //     }
    // },
    // {
    //     name: 'template',
    //     alias: 'uit',
    //     description: `Generate a new UI ${chalk.yellowBright('template')}`,
    //     run(inputs){
    //         let { name } = inputs

    //         let params = {
    //             namecase: str.upperCaseFirstLetter(name),
    //             name: name,
    //         }

    //         let folder = `./src/views/ui/templates/${params.namecase}`
    //         let storeDir = './src/views/ui/templates'

    //         if (File.existsSync(folder)) {
    //             throw new Error(`File ${params.namecase} ${t('exists, please choose another name')}`)
    //         }

    //         fs.mkdirSync(folder, { recursive: true });

    //         if (!File.existsSync(`${storeDir}/index.ts`)) {
    //             File.generateFile(url.getTemplate(`indexEmpty.ts`), `${storeDir}/index.ts`, params)
    //         }

    //         File.generateFile(url.getTemplate(`atoms.tsx`), `${folder}/index.tsx`, params)

    //         File.insert(`${storeDir}/index.ts`, [
    //             {
    //                 append: true,
    //                 text: `export * from './${params.namecase}'`
    //             },
    //         ])

    //         logger.info(`${t('Create')} template ${t('at')}: ` + chalk.yellowBright(folder))
    //     }
    // },
]
