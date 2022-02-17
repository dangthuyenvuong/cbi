import fs from 'fs'
import { t } from '../../locale/index.js'
import { logger, str } from './index.js'
import ncp from 'ncp'

export class File {
    static data = ''
    static file = ''

    static checkFile(targetDir) {
        return fs.existsSync(targetDir)
    }

    static generateFile(sourceFile, targetDir, params, options = {}) {

        let dir = sourceFile.split('/')
        let name = dir.pop()
        dir = dir.join('/')


        let dirTarget = targetDir.split('/')
        let nameTarget = dirTarget.pop()
        dirTarget = dirTarget.join('/')


        // let fileName = `./src/app/models/${inputs.name.toLowerCase()}.model.ts`

        if (!options.override && fs.existsSync(targetDir)) {
            throw new Error(`${targetDir} ${t('exists, please choose another name')}`)
        }


        let data = fs.readFileSync(sourceFile, 'utf-8');


        fs.mkdirSync(dirTarget, { recursive: true });

        fs.writeFileSync(targetDir, str.replace(data, params))

        return true
    }

    static insertAfter(fileName, afterString, value) {
        let data = fs.readFileSync(fileName, 'utf-8');
        let regexp = new RegExp(`(${afterString})`, 'g')

        data = data.replace(regexp, `$1${value}`)
        fs.writeFileSync(fileName, data)

        return this
    }

    static insertFirst(fileName, value) {
        let data = fs.readFileSync(fileName, 'utf-8');

        data = `${value}\r\n` + data
        fs.writeFileSync(fileName, data)

        return this
    }

    static insert(fileName, options = []){
        let data = fs.readFileSync(fileName, 'utf-8');
        for(let i in options){
            let task = options[i]

            if(task.after){
                let regexp = new RegExp(`(${task.after})`, 'g')
                data = data.replace(regexp, `$1${task.text}`)
            }else if(task.first){
                data = `${task.text}\r\n` + data
            }else if(task.append){
                data +=  `\r\n${task.text}`
            }
        }
        fs.writeFileSync(fileName, data)
    }

    static copyFolder(sourceDir, targetDir){
        return new Promise((res, rej) => {
            ncp.ncp(sourceDir, targetDir, (err) => {
                if(err){
                    rej(err)
                }else{
                    res(true)
                }
            })
        })
    }

    static existsSync(target){
        return fs.existsSync(target)
    }
}

