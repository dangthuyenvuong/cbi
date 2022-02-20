
import semver from 'semver';
import pkgJson from 'package-json';
import semverDiff from 'semver-diff';
import boxen from 'boxen';
import chalk from 'chalk'

import { createRequire } from "module";


const require = createRequire(import.meta.url);


const { version, name } = require("../../package.json")


const capitalizeFirstLetter = (str) => str

export const checkUpdate = async () => {
    const { version: latestVersion } = await pkgJson(name);
  
    // check if local package version is less than the remote version
    const updateAvailable = semver.lt(version, latestVersion);
  
    if (true) {
      let updateType = '';
  
      // check the type of version difference which is usually patch, minor, major etc.
      let verDiff = semverDiff(version, latestVersion);
  
      if (verDiff) {
        updateType = capitalizeFirstLetter(verDiff);
      }
  
      const msg = {
        updateAvailable: `${updateType} update available ${chalk.dim(version)} → ${chalk.green(latestVersion)}`,
        runUpdate: `Run ${chalk.cyan(`npm i -g ${name}`)} to update`,
      };
  
      // notify the user about the available udpate
      console.log(boxen(`${msg.updateAvailable}\n${msg.runUpdate}`, {
        margin: 1,
        padding: 1,
        align: 'center',
      }));
    }
  };