import ChangeDetectionCli from '../src/changedetectioncli.class.js'
import { jest } from '@jest/globals'
import {describe, it, expect, beforeEach, global} from '@jest/globals'


describe('ChangeDetectionCli', () => {
  let cli
  const domain = 'https://***REMOVED***' // Replace with your actual domain
  const apiKey = '***REMOVED***' // Replace with your actual API key

  beforeEach(() => {
    cli = new ChangeDetectionCli(domain, apiKey)
  })

/*   describe('#baseRequest', () => {
    it('should make a successful GET request and return JSON data', async () => {
      const urlToken = 'systeminfo'
      const mockResponse = {
        // Mock JSON response data
        status: 'OK',
        version: '1.2.3'
      }

      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        headers: new Headers({
          'content-type': 'application/json'
        }),
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const data = await cli.#baseRequest(urlToken)
      expect(data).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith(`https://${domain}/api/v1/${urlToken}`, {
        method: 'GET',
        headers: {
          'x-api-key': apiKey
        }
      })
    })
    it('should make a successful GET request and return text data', async () => {
      const urlToken = 'some-text-endpoint'
      const mockTextResponse = 'This is some text data'

      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        headers: new Headers({
          'content-type': 'text/plain'
        }),
        text: jest.fn().mockResolvedValue(mockTextResponse)
      })

      const data = await cli.#baseRequest(urlToken)
      expect(data).toEqual(mockTextResponse)
      expect(fetch).toHaveBeenCalledWith(`https://${domain}/api/v1/${urlToken}`, {
        method: 'GET',
        headers: {
          'x-api-key': apiKey
        }
      })
    })

    it('should throw an error if the request fails', async () => {
      const urlToken = 'error-endpoint'
      const mockErrorResponse = 'Error message'

      global.fetch = jest.fn().mockResolvedValue({
        status: 500,
        text: jest.fn().mockResolvedValue(mockErrorResponse)
      })

      await expect(cli.#baseRequest(urlToken)).rejects.toThrowError(mockErrorResponse)
      expect(fetch).toHaveBeenCalledWith(`https://${domain}/api/v1/${urlToken}`, {
        method: 'GET',
        headers: {
          'x-api-key': apiKey
        }
      })
    })
  })
 */

  describe('info', () => {
    it('should call #baseRequest with the correct URL token', async () => {
      const mockInfoResponse = {
        // Mock JSON response data
        status: 'OK',
        version: '1.2.3'
      }

      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        headers: new Headers({
          'content-type': 'application/json'
        }),
        json: jest.fn().mockResolvedValue(mockInfoResponse)
      })

      const data = await cli.info()
      expect(data).toEqual(mockInfoResponse)
      //expect(cli.#baseRequest).toHaveBeenCalledWith('systeminfo')
    })
  })

  describe('list', () => {
    it('should call #baseRequest with the correct URL token', async () => {
      const mockListResponse = {
        // Mock JSON response data
        status: 'OK',
        watches: []
      }

      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        headers: new Headers({
          'content-type': 'application/json'
        }),
        json: jest.fn().mockResolvedValue(mockListResponse)
      })

      const data = await cli.list()
      expect(data).toEqual(mockListResponse)
      //expect(cli.#baseRequest).toHaveBeenCalledWith('watch')
    })
  })
})
