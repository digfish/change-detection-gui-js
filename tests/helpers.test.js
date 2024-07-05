import { jest } from '@jest/globals'
import { fetchFaviconUsingFaviconFetcher } from '@/helpers'
import { getFavicon } from '@hyperjumptech/favicon-fetcher'

jest.mock('@hyperjumptech/favicon-fetcher')

describe('fetchFaviconUsingFaviconFetcher', () => {
  it('should call getFavicon with the correct baseUrl', async () => {
    const baseUrl = 'https://example.com'
    const expectedFaviconUrl = 'https://example.com/favicon.ico'

    getFavicon.mockResolvedValue(expectedFaviconUrl)

    const faviconUrl = await fetchFaviconUsingFaviconFetcher(baseUrl)

    expect(getFavicon).toHaveBeenCalledWith(baseUrl)
    expect(faviconUrl).toBe(expectedFaviconUrl)
  })

  it('should return null if getFavicon returns null', async () => {
    const baseUrl = 'https://example.com'

    getFavicon.mockResolvedValue(null)

    const faviconUrl = await fetchFaviconUsingFaviconFetcher(baseUrl)

    expect(getFavicon).toHaveBeenCalledWith(baseUrl)
    expect(faviconUrl).toBeNull()
  })
})
