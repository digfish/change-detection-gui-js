import moment from 'moment'
import * as cheerio from 'cheerio'
import { getFavicon, EStrategies } from '@hyperjumptech/favicon-fetcher'

export function toIsoString(tmstmp) {
  let d = new Date(tmstmp * 1000)
  return d.toISOString()
}

export function toDatetime(tmstmp) {
  let d = moment(new Date(tmstmp * 1000))
  return moment(d).format('YYYY-MM-DD HH:mm:ss')
}

export async function _getFavicon(baseUrl) {
  let resp = await fetch(baseUrl +'?callback=skip',{mode:'no-cors'})
  let html = await resp.text()
  const $ = cheerio.load(html)
  let icon = $('link[rel="shortcut icon"]').attr('href')
  console.log('icon',icon);
  if (icon) {
  let iconUrl = baseUrl + icon;
  return iconUrl
  } else return null;
}

export  async function fetchFaviconUsingFaviconFetcher(baseUrl) {
  return await getFavicon(baseUrl)
}

export async function fetchFavicon(baseUrl) {
  return await getFavicon(baseUrl)
}


export function favicone(url) {
    return 'https://favicone.com/' + url.host + '?s=24'
}

export async function iconAsBlob(url) {
  let resp = await fetch(url)
  let blob = await resp.blob()
  return URL.createObjectURL(blob)
}

export function capitalizeString(string) {
  return string.replaceAll('_',' ').charAt(0).toUpperCase() + string.slice(1).replaceAll('_',' ')
}

//console.log(await getFavicon('http://www.cm-ourique.pt'))
