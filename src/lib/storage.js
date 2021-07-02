export const Storage = {
    setItem,
    getItem,
    removeItem
};

function setItem(key, item) {
    const stringifiedItem = JSON.stringify(item);
    localStorage.setItem(key, stringifiedItem);
}

function getItem(key) {
    const stringifiedItem = localStorage.getItem(key);
    if (stringifiedItem) {
        return JSON.parse(stringifiedItem);
    }
    return null;
}

function removeItem(key) {
    localStorage.removeItem(key);
}