import { jest } from '@jest/globals'
import { snapshotsDiff } from '../src/changedetection.js' // Assuming the function is in snapshotsDiff.js
import * as diff from 'diff'

jest.mock('diff', () => ({
  diffTrimmedLines: jest.fn()
}))

const mockHistoryItem = jest.fn()

jest.mock('../src/historyItem', () => ({
  historyItem: mockHistoryItem
}))

describe('snapshotsDiff', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return an empty string if snapshots are identical', async () => {
    const watch_uuid = 'uuid-123'
    const tmstmp1 = 1678886400000
    const tmstmp2 = 1678890000000
    const snapshot1 = 'Identical snapshot content'
    const snapshot2 = 'Identical snapshot content'

    mockHistoryItem.mockResolvedValueOnce(snapshot1)
    mockHistoryItem.mockResolvedValueOnce(snapshot2)

    diff.diffTrimmedLines.mockReturnValue([])

    const result = await snapshotsDiff(watch_uuid, tmstmp2, tmstmp1)

    expect(result).toBe('')
    expect(mockHistoryItem).toHaveBeenCalledWith(watch_uuid, tmstmp2)
    expect(mockHistoryItem).toHaveBeenCalledWith(watch_uuid, tmstmp1)
    expect(diff.diffTrimmedLines).toHaveBeenCalledWith(snapshot1, snapshot2)
  })

  it('should return a diff string with added and removed lines', async () => {
    const watch_uuid = 'uuid-456'
    const tmstmp1 = 1678886400000
    const tmstmp2 = 1678890000000
    const snapshot1 = 'Line 1\nLine 2\nLine 3'
    const snapshot2 = 'Line 1\nNew Line 2\nLine 3'

    mockHistoryItem.mockResolvedValueOnce(snapshot1)
    mockHistoryItem.mockResolvedValueOnce(snapshot2)

    diff.diffTrimmedLines.mockReturnValue([
      { value: 'Line 1\n', removed: undefined, added: undefined },
      { value: 'Line 2\n', removed: true, added: undefined },
      { value: 'New Line 2\n', removed: undefined, added: true },
      { value: 'Line 3', removed: undefined, added: undefined }
    ])

    const result = await snapshotsDiff(watch_uuid, tmstmp2, tmstmp1)

    expect(result).toBe('Line 1\n-- Line 2\n++ New Line 2\nLine 3')
    expect(mockHistoryItem).toHaveBeenCalledWith(watch_uuid, tmstmp2)
    expect(mockHistoryItem).toHaveBeenCalledWith(watch_uuid, tmstmp1)
    expect(diff.diffTrimmedLines).toHaveBeenCalledWith(snapshot1, snapshot2)
  })
})
