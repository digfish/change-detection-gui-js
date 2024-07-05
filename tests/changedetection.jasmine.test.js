import { snapshotsDiff } from '../src/changedetection.js' // Assuming the function is in snapshotsDiff.js
import * as diff from 'diff'

describe('snapshotsDiff', () => {

  it('should return an empty string if snapshots are identical', async () => {

    const result = await snapshotsDiff(
      '75f68244-18e9-4c65-9a0d-c91343336594',
      1719781226,
      1719694779
    );
    console.log(result);
    expect(result).toBeTruthy();
  })

})
