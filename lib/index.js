import { Proc } from './lib/process'
import * as fs from 'fs'

/**
 * Checks the arguments
 * @returns {Object} {key,user,grade}
 */
const checkArgs = async () => {
  try {
    let key, user, grade
    for (const arg of process.argv) {
      if (arg.includes('key=')) {
        key = arg.split('=')[1]
      } else if (arg.includes('user=')) {
        user = arg.split('=')[1]
      } else if (arg.includes('grade=')) {
        grade = arg.split('=')[1]
      }
    }
    if (!key || !user) throw Error('Missing arguments')
    else {
      return { key: key, user: user, grade: grade || 1 }
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * Flattens any array
 * @param {Array} arr1
 */
const flattenDeep = arr1 => {
  return arr1.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  )
}

/**
 * Starts the process
 */
const start = async () => {
  try {
    const { key, user, grade } = await checkArgs()
    const processing = new Proc(key, user, grade)
    const firstReq = new Date().getTime()
    const results = await processing.process()
    const endReq = new Date().getTime()
    console.log('Requests process time:', (endReq - firstReq) / 1000)
    const firstWrite = new Date().getTime()
    fs.writeFileSync(
      'scrobs.json',
      JSON.stringify(flattenDeep(results)),
      'utf8'
    )
    const endWrite = new Date().getTime()
    console.log('Write process time:', (endWrite - firstWrite) / 1000)
  } catch (error) {
    return Promise.reject(error)
  }
}

const first = new Date().getTime()
console.log('Processing, please wait...')
start()
  .then(() => {
    const end = new Date().getTime()
    console.log('Total process time:', (end - first) / 1000)
  })
  .catch(err => {
    console.error('Error while processing: ', err.message || err)
  })
