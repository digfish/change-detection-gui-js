/* eslint-disable no-unused-vars */
//import dotenv from 'dotenv';
import * as diff from 'diff'
import { getItem, setItem } from './storage'
//import * as colors from 'colors';
//const { bgGreen,bgRed} = colors;

// get the value of the environment variable
//const CHANGEDETECTION_BASE_URL =  import.meta.env.CHANGEDETECTION_BASE_URL;
//const API_KEY = import.meta.env.API_KEY ;

async function baseRequest(urlToken) {
	const  baseUrl = getItem('CHANGEDETECTION_BASE_URL')
	const apiKey = getItem('API_KEY')

   //console.log('baseRequest() API_KEY: '+apiKey);
  let url = `${baseUrl}/api/v1/${urlToken}`
  let resp = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': apiKey
    }
  })
  if (resp.status != 200) {
    //console.log(`Error: ${resp.status}`) 
    throw new Error((await resp.text()))
  } else {
    const isJson = resp.headers.get('content-type')?.includes('application/json')
    const data = isJson ? await resp.json() : await resp.text()
    return data
  }
}

export async function info() {
  let resp =   baseRequest('systeminfo');
  resp.then((data) => {
    console.log(data);
    //return data;
  }).catch((err) => {
    throw err;})
    return resp;
}

export async function list()  {
  let resp =  baseRequest('watch')
  resp.then((data) => {
    console.log(data);
    //return data;
  }).catch((err) => {
    throw err;})
    return resp;
}

export async function watchInfo(watch_uuid) {
  return await baseRequest(`watch/${watch_uuid}`)
}

export async function watchHistory(watch_uuid) {
  console.log('watchHistory', `watch/${watch_uuid}/history/`)
  return await baseRequest(`watch/${watch_uuid}/history`)
}

export async function historyItem(watch_uuid, timestamp) {
  console.log('historyItem', `watch/${watch_uuid}/history/${timestamp}`)
  return await baseRequest(`watch/${watch_uuid}/history/${timestamp}`)
}

export async function snapshotsDiff(watch_uuid, tmstmp2, tmstmp1) {
  const snapshot2 = await historyItem(watch_uuid, tmstmp2)
  const snapshot1 = await historyItem(watch_uuid, tmstmp1)
  let changeObjs = diff.diffTrimmedLines(snapshot1, snapshot2)
  let buffer = ''
  changeObjs.forEach((change) => {
    buffer += change.added
      ? `++ ${change.value} `
      : change.removed
        ? `-- ${change.value}`
        : change.value
    buffer += '\n'
  })
  return buffer
}

async function main() {
  console.log(await info())
  let watches = await list()
  let keys = Object.keys(watches)

  // for (let key of keys) {
  //     let watch = watches[key];
  //     console.log(watch.title,watch.url);
  // };

  let aKey = keys[2]
  //console.log(await watch_history(aKey));

  let tmsmtmps = Object.keys(await watch_history(aKey))
  let mostRecent = tmsmtmps[tmsmtmps.length - 1]
  let mostRecentFetch = await history_item(aKey, mostRecent)

  let previousTmstmp = tmsmtmps[tmsmtmps.length - 2]
  let previousFetch = await history_item(aKey, previousTmstmp)

  let _diff = diff.diffTrimmedLines(previousFetch, mostRecentFetch)
  console.log(_diff)
}

//export  {info,list,watch_info,watch_history,history_item};
// export all symbols
//export * from './changedetection.js';

//await main();
