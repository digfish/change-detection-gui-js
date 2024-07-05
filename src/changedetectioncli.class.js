import { getItem, setItem } from './storage.js'

class ChangeDetectionCli {

    constructor(domain,apiKey) {
        this.domain = domain;
        this.apiKey = apiKey;
    }
    
    async  #baseRequest(urlToken) {
        let url = `${this.domain}/api/v1/${urlToken}`
        let resp = await fetch(url, {
          method: 'GET',
          headers: {
            'x-api-key': this.apiKey
          }
        })
        if (resp.status != 200) {
          console.log(`Error: ${resp.status}`)
          throw new Error(await resp.text())
        } else {
          const isJson = resp.headers.get('content-type')?.includes('application/json')
          const data = isJson ? await resp.json() : await resp.text()
          return data
        }
      }
      

       async  info() {
        return await this.#baseRequest('systeminfo')
      }
      
       async  list() {
        return await this.#baseRequest('watch')
      }
      
}

export default ChangeDetectionCli;

// eslint-disable-next-line no-unused-vars
function tests() {
    setItem('CHANGEDETECTION_BASE_URL', 'https://***REMOVED***')
    setItem('API_KEY', '***REMOVED***')
    let baseUrl = getItem('CHANGEDETECTION_BASE_URL');
    console.log(baseUrl);
    let cli = new ChangeDetectionCli(getItem('CHANGEDETECTION_BASE_URL'), getItem('API_KEY'))
    cli.info().then(console.log)
    cli.list().then(console.log)
}

 tests();
