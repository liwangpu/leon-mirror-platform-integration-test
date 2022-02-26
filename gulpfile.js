const { src, dest, series } = require("gulp");
const fs = require('fs');
const del = require("del");

const platformManagementDist = `C://Leon/Codes/CXIST/Mirror.PlatformManagement.Frontend/dist`;
const businessConfigurationDist = `C://Leon/Codes/CXIST/Mirror.BusinessConfiguration.Frontend/dist`;
const businessManagementDist = `C://Leon/Codes/CXIST/Mirror.BusinessManagement.Frontend/dist`;
const businessForegroundDist = `C://Leon/Codes/CXIST/Mirror.BusinessForeground.Frontend/dist`;
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
    let envConfig;

    const platformManagementConfigPath = `./platform-management/dist/assets/${envConfigFileName}`;
    if (fs.existsSync(platformManagementConfigPath)) {
        envConfig = readEnvConfig(platformManagementConfigPath);
        envConfig.businessConfigurationEntry = businessConfigurationEntry;
        envConfig.businessForegroundEntry = businessForegroundEntry;
        envConfig.businessManagementEntry = businessManagementEntry;
        updateEnvConfig(platformManagementConfigPath, envConfig);
    }

    const businessConfigurationConfigPath = `./business-configuration/dist/assets/${envConfigFileName}`;
    if (fs.existsSync(businessConfigurationConfigPath)) {
        envConfig = readEnvConfig(businessConfigurationConfigPath);
        envConfig.platformManagementEntry = platformManagementEntry;
        envConfig.businessManagementEntry = businessManagementEntry;
        envConfig.businessForegroundEntry = businessForegroundEntry;
        updateEnvConfig(businessConfigurationConfigPath, envConfig);
    }

    const businessManagementConfigPath = `./business-management/dist/assets/${envConfigFileName}`;
    if (fs.existsSync(businessManagementConfigPath)) {
        envConfig = readEnvConfig(businessManagementConfigPath);
        envConfig.platformManagementEntry = platformManagementEntry;
        envConfig.businessConfigurationEntry = businessConfigurationEntry;
        envConfig.businessForegroundEntry = businessForegroundEntry;
        updateEnvConfig(businessManagementConfigPath, envConfig);
    }

    const businessForegroundConfigPath = `./business-foreground/dist/assets/${envConfigFileName}`;
    if (fs.existsSync(businessForegroundConfigPath)) {
        envConfig = readEnvConfig(businessForegroundConfigPath);
        envConfig.platformManagementEntry = platformManagementEntry;
        envConfig.businessConfigurationEntry = businessConfigurationEntry;
        envConfig.businessManagementEntry = businessManagementEntry;
        updateEnvConfig(businessForegroundConfigPath, envConfig);
    }

    cb();
}

function copyPlatformManagementDist(cb) {
    del.sync([`platform-management/dist/**`]);
    src(`${platformManagementDist}/mirror-platform-management/**`)
        .pipe(dest(`platform-management/dist`))
        .on('end', () => {
            cb();
        });
}

function copyBusinessConfigurationDist(cb) {
    del.sync([`business-configuration/dist/**`]);
    src(`${businessConfigurationDist}/mirror-business-configuration/**`)
        .pipe(dest(`business-configuration/dist`))
        .on('end', () => {
            cb();
        });
}

function copyBusinessManagementDist(cb) {
    del.sync([`business-management/dist/**`]);
    src(`${businessManagementDist}/mirror-business-management/**`)
        .pipe(dest(`business-management/dist`))
        .on('end', () => {
            cb();
        });
}

function copyBusinessForegroundDist(cb) {
    del.sync([`business-foreground/dist/**`]);
    src(`${businessForegroundDist}/mirror-business-foreground/**`)
        .pipe(dest(`business-foreground/dist`))
        .on('end', () => {
            cb();
        });
}

exports.copyPlatformManagement = series(copyPlatformManagementDist);
exports.copyBusinessConfiguration = series(copyBusinessConfigurationDist);
exports.copyBusinessManagement = series(copyBusinessManagementDist);
exports.copyBusinessForeground = series(copyBusinessForegroundDist);
exports.updateAppEnv = series(updateAppEnv);

