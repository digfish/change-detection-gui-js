// storage.js
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
const storageFile = path.join(dirname, 'storage.json') // Adjust path as needed

// Function to load data from the storage file
function loadStorage() {
  try {
    const data = fs.readFileSync(storageFile, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    // File doesn't exist, return an empty object
    return {}
  }
}

// Function to save data to the storage file
function saveStorage(data) {
  fs.writeFileSync(storageFile, JSON.stringify(data), 'utf-8')
}

// Emulated localStorage API
const localStorage = {
  getItem(key) {
    const data = loadStorage()
    return data[key]
  },
  setItem(key, value) {
    const data = loadStorage()
    data[key] = value
    saveStorage(data)
  },
  removeItem(key) {
    const data = loadStorage()
    delete data[key]
    saveStorage(data)
  },
  clear() {
    fs.writeFileSync(storageFile, '{}', 'utf-8')
  }
}

// Export the emulated localStorage
export default localStorage
