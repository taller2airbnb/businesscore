
module.exports = function getSetting(variableName) {
    const variablePrefix = 'REACT_APP_';
    const variableFullName = variablePrefix + variableName;
    
    return process.env[variableFullName];
}


module.exports = function getSettingProfile(variableName) {
    const variablePrefix = 'PROFILING_';
    const variableFullName = variablePrefix + variableName;
    
    return process.env[variableFullName];
}

