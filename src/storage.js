//const LocalStorage =  (await import( 'node-localstorage')).LocalStorage;
//const localStorage = (typeof window === 'undefined') ?  LocalStorage('./storage') : window.localStorage;
let localStorage = null;
 if (typeof window === 'undefined')  {
    const LocalStorage =  (await import( 'node-localstorage')).LocalStorage;
    
    localStorage = new LocalStorage('./storage');
 } else localStorage = window.localStorage;
 ///import * as storage from 'localStorage';
//const localStorage = storage.localStorage;

export function hasKey(key) {
    return getItem(key) !== null;
}

export function getItem(key) {
    return localStorage.getItem(key);
}

export function setItem(key,value) {
    localStorage.setItem(key,value);
}

export function removeItem(key) {
	localStorage.removeItem(key);
}

function tests() {
    setItem('abc','123');
   console.log( hasKey('abc'));
}

//tests();
