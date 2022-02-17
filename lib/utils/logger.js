import chalk from "chalk";


const fun = {
    log: (...ref) => {
        console.log(chalk.greenBright(...ref))
    },
    info: (...ref) => {
        console.log(chalk.blueBright(...ref))
    },
    warning: (...ref) => {
        console.log(chalk.yellowBright(...ref))
    },
    error: (...ref) => {
        console.log(chalk.redBright(...ref))
    }
}


const ENV = 'development'
class Logger {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Logger();
        }
        return this.instance;
    }

    log(...ref) {
        if (ENV === 'production') return;
        fun.log(...ref);
    }

    info(...ref) {
        if (ENV === 'production') return;
        fun.info(...ref);
    }

    warn(...ref) {
        if (ENV === 'production') return;
        fun.warning(...ref);
    }

    error(...ref) {
        if (ENV === 'production') return;
        fun.error(...ref);
    }
}

export const logger = Logger.getInstance();
