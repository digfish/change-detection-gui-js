// storage.js
import { jest } from '@jest/globals'
import {describe, it, expect, beforeEach, global} from '@jest/globals'
import { hasKey, getItem, setItem } from '../src/storage'

describe('Storage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    //localStorage.clear()
  })

  it('should check if a key exists in localStorage', () => {
    setItem('testKey', 'testValue')
    expect(hasKey('testKey')).toBe(true)
  })

  it('should return null if key does not exist', () => {
    expect(hasKey('nonExistentKey')).toBe(false)
  })

  it('should retrieve an item from localStorage', () => {
    setItem('testKey', 'testValue')
    expect(getItem('testKey')).toBe('testValue')
  })

  it('should return null if key does not exist', () => {
    expect(getItem('nonExistentKey')).toBe(null)
  })

  it('should store an item in localStorage', () => {
    setItem('testKey', 'testValue')
    expect(localStorage.getItem('testKey')).toBe('testValue')
  })
})
