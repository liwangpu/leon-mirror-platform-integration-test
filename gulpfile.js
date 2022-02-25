const { src, dest, series } = require("gulp");
const sass = require("gulp-dart-sass");
const fs = require('fs');
const path = require('path');
const del = require("del");
const rename = require('gulp-rename');
const concat = require('gulp-concat');

const platformManagementDist = `C://Leon/Codes/CXIST/Mirror.PlatformManagement.Frontend/dist`;
const businessManagementDist = `C://Leon/Codes/CXIST/Mirror.BusinessManagement.Frontend/dist`;
const workstationDomain = 'http://cxist-dev.com';
const envConfigFileName = 'env-config.json';

const platformManagementEntry = `${workstationDomain}/platform-management`;
const businessManagementEntry = `${workstationDomain}/business-management`;
const businessConfigurationEntry = `${workstationDomain}/business-configuration`;
const businessForegroundEntry = `${workstationDomain}/business-foreground`;

function readEnvConfig(configPath) {
    const str = fs.readFileSync(configPath, { encoding: 'utf8' });
    if (!str) { return {}; }
    return JSON.parse(str);
}

function updateEnvConfig(configPath, config) {
    fs.writeFileSync(configPath, JSON.stringify(config), { encoding: 'utf8' });
}

function updateAppEnv(cb) {
    const businessManagementConfigPath = `./business-management/dist/assets/${envConfigFileName}`;
    let envConfig;
    if (fs.existsSync(businessManagementConfigPath)) {
        envConfig = readEnvConfig(businessManagementConfigPath);
        envConfig.platformManagementEntry = platformManagementEntry;
        envConfig.businessConfigurationEntry = businessConfigurationEntry;
        envConfig.businessForegroundEntry = businessForegroundEntry;
        updateEnvConfig(businessManagementConfigPath, envConfig);
    }

    const platformManagementConfigPath = `./platform-management/dist/assets/${envConfigFileName}`;
    if (fs.existsSync(platformManagementConfigPath)) {
        envConfig = readEnvConfig(platformManagementConfigPath);
        envConfig.businessConfigurationEntry = businessConfigurationEntry;
        envConfig.businessForegroundEntry = businessForegroundEntry;
        envConfig.businessManagementEntry = businessManagementEntry;
        updateEnvConfig(platformManagementConfigPath, envConfig);
    }


    cb();
}

function copyPlatformManagementDist(cb) {
    del.sync([`platform-management/dist/**`]);
    src(`${platformManagementDist}/mirror-platform-management/**`)
        .pipe(dest(`platform-management/dist`))
        .on('end', () => {
            console.log('copy finished');
            cb();
        });
}

function copyBusinessManagementDist(cb) {
    del.sync([`business-management/dist/**`]);
    src(`${businessManagementDist}/mirror-business-management/**`)
        .pipe(dest(`business-management/dist`))
        .on('end', () => {
            console.log('copy finished');
            cb();
        });
}

exports.copyPlatformManagement = series(copyPlatformManagementDist);
exports.copyBusinessManagement = series(copyBusinessManagementDist);
exports.updateAppEnv = series(updateAppEnv);

