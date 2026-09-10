

export const saveSetting = (setting) => {

     localStorage.setItem('clickFast.settings', JSON.stringify(setting));

}

export const getSetting  = () => {
    return JSON.parse(localStorage.getItem('clickFast.settings'));
}