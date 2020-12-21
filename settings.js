
module.exports.getSetting = function getSetting(variableName) {
    const variablePrefix = 'REACT_APP_';
    const variableFullName = variablePrefix + variableName;
    
    return process.env[variableFullName];
}

module.exports.getSettingProfile = function getSettingProfile(variableName) {
    const variablePrefix = 'PROFILING_';
    const variableFullName = variablePrefix + variableName;
    
    return process.env[variableFullName];
}

module.exports.getSettingSC = function getSettingSC(variableName) {
    const variablePrefix = 'SMART_CONTRACT_';
    const variableFullName = variablePrefix + variableName;
    
    return process.env[variableFullName];
}

