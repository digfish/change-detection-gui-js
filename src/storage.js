import {LocalStorage} from 'node-localstorage';
 let localStorage;

if (typeof window === 'undefined') {
 localStorage = new LocalStorage('./scratch');
}
//import * as storage from 'localStorage';
//const localStorage = storage.localStorage;


export function getItem(key) {
    return localStorage.getItem(key);
}

export function setItem(key,value) {
    localStorage.setItem(key,value);
}
