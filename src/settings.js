export function getSetting(variableName) {
    const variablePrefix = 'REACT_APP_';
    const variableFullName = variablePrefix + variableName;
    
    return process.env[variableFullName];
}

export function getSettingProfile(variableName) {
    const variablePrefix = 'PROFILING_';
    const variableFullName = variablePrefix + variableName;
    
    return process.env[variableFullName];
}

