import chalk from "chalk"
import Table from "cli-table3"
import { __awaiter } from "../lib/utils/__awaiter.js";
import { AbstractCommand } from './abstract.command.js'

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