import chalk from "chalk"
import Table from "cli-table3"
import { AbstractCommand } from './abstract.command.js'


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

export class CreateProjectCommand extends AbstractCommand {
    load(program) {
        program
            .command('new [name]')
            .description(this.buildDescription())
            // .option('')
            .action((name) => __awaiter(this, void 0, void 0, function* () {
                // console.log(schematic, name, path, command)
                const options = [];


                const inputs = [];
                // inputs.push({ name: 'schematic', value: schematic });
                inputs.push({ name: 'name', value: name });
                // inputs.push({ name: 'path', value: path });
                yield this.action.handle({
                    name
                }, options);
            }))
    }

    buildDescription() {
        return (`${chalk.yellowBright('Create Project')} with full setup`);
    }
}