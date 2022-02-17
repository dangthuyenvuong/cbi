#!/usr/bin/env node
import program from 'commander'
// import { createRequire } from "module"
import clipboardy from 'clipboardy'
import { CommandLoader } from "../commands/index.js"
import figlet from 'figlet'
import { config } from '../config/index.js'
// const require = createRequire(import.meta.url);
// const package = require('./package.json')
// import { version } from '../package.json'

const version = '1.0.0'

const bootstrap = () => {

  // program.version('1.0.0').description(chalk.greenBright('Heron React Project 1.0.0'))
  // .option('-v, -version', 'output the version number')



  // program
  //   .option('-l, --length <number>', 'length of password', '8')
  //   .option('-s, --save', 'save password to passwords.txt')
  //   .option('-nn, --no-numbers', 'remove numbers')
  //   .option('-ns, --no-symbols', 'remove symbols')
  //   .parse()
  program.showSuggestionAfterError();
  // program.showHelpAfterError('(add --help for additional information)');
  // console.log(chalk.yellowBright(figlet.textSync('Heron', {horizontalLayout: 'full'})))
  program
    // .name('heron')
    .version(version, '-v, --version', 'Output the current version.')
    .usage("<command> [options]")
    .helpOption('-h, -help', 'Output usage information.')



  CommandLoader.load(program)


  // .versionOption('-v, -version', 'output the version number')
  // .command('model', `Create a new ${chalk.yellowBright('Model')} class`)
  // .command('page', `Create a new ${chalk.yellowBright('page')}`)
  // .command('store', `Create a reducer ${chalk.yellowBright('store')}`)
  // .argument('<model>')
  // .description('Generate model, page')
  // .option('model', 'Generate Model')




  // const { length, save, numbers, symbols } = program.opts()


  // // Get generated password
  // const generatedPassword = createPassword(length, numbers, symbols)
  // // Save to file
  // if (save) {
  //   savePassword(generatedPassword)
  // }

  // // Copy to clipboard
  // clipboardy.writeSync(generatedPassword)

  // // Output generated password
  // log(chalk.blue('Generated Password: ') + chalk.bold(generatedPassword))
  // log(chalk.yellow('Password copied to clipboard'))
  // commander.parse(process.argv);
  program.parse(process.argv);

}

bootstrap()