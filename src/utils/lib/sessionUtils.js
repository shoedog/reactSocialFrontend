// Check if storage type is available
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

// If session storage is available get item
export function getSessionItem(item) {
    if ( typeof(localStorage) != 'undefined') {
        if( sessionStorage.getItem(item) != null ){
            return sessionStorage.getItem(item)
        } else {
            return false;
        }
    } else {
        return false;
    }
};

// If session storage is available, delete item
export function removeFromStorage(item) {
    if ( typeof(sessionStorage) != 'undefined') {
        sessionStorage.removeItem(item);
    } else {
        return false;
    }
}

// If session storage is available, erase all items in storage
export function eraseStorage() {
    if ( typeof(localStorage) != 'undefined') {
        sessionStorage.clear();
    } else {
        return false;
    }
}

// If session storage is available, set item in storage
export function populateStorage(item) {
    if ( typeof(sessionStorage) != 'undefined') {
        sessionStorage.setItem(item);
    } else {
        return false;
    }
}
