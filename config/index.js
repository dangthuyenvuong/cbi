import fs from 'fs'
import { logger } from '../lib/utils/logger.js';
import { t, selectLanguage } from '../locale/index.js';

const CLI_CONFIG = '.cbi-cli/index.json';

const getCliConfig = () => {
    if (fs.existsSync(CLI_CONFIG)) {
        let cli_json = fs.readFileSync(CLI_CONFIG, 'utf-8');
        try {
            return JSON.parse(cli_json)
        } catch (err) {
            throw new Error(`.cbi-cli/index.json ${t('incorrect json format')}`)
        }
    }
    return {}
}

let config = {}

try {
    config = getCliConfig()
} catch (error) {
    logger.error(error.message)
    process.exit(1)
}


export { config }


if (config?.language) {
    selectLanguage(config.language)
}
