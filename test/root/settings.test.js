const settings = require('../../settings.js');

describe(" Test Suite Settings", () => {

    it('Settings', async () => {
        
        const remoteApiUrl = settings.getSetting("API_URL");
        expect(remoteApiUrl).toBe(process.env['REACT_APP_API_URL']);
    });

    it('Settings profile', async () => {
        
        const remoteApiUrl = settings.getSettingProfile("API_URL");
        expect(remoteApiUrl).toBe(process.env['PROFILING_API_URL']);       
    });
});
