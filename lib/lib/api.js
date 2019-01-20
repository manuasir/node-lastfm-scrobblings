import * as http from 'http'

/**
 * Handles last-fm api interaction
 * @param {String} user
 * @param {String} apiKey
 */
export class Api {
  /**
   * Constructor class
   */
  constructor(user, apiKey) {
    this.apiKey = apiKey
    this.user = user
  }

  /**
   * Promised HTTP GET request
   * @param {String} endpoint
   * @returns {Promise}
   */
  async asyncGetReq(endpoint) {
    try {
      return new Promise((resolve, reject) => {
        const request = http.get(endpoint, response => {
          if (response.statusCode > 200) {
            reject(
              new Error(
                'Failed to load page, status code: ' + response.statusCode
              )
            )
          }
          const body = []
          // on every content chunk, push it to the data array
          response.on('data', chunk => body.push(chunk))
          // we are done, resolve promise with those joined chunks
          response.on('end', () => resolve(JSON.parse(body.join(''))))
        })
        request.on('error', err => reject(err))
      })
    } catch (err) {
      return Promise.reject(
        new Error('Error sending GET request: ', err.message || err)
      )
    }
  }

  /**
   * Performs an API request
   * @param {Object} params The request parameters. If page param is missing then will request first page.
   * @returns {Promise} The API result
   */
  async apiReq(params) {
    try {
      const page = params && params.page ? params.page : 1
      if (
        !this.apiKey ||
        this.apiKey === '' ||
        !this.user ||
        this.user === ''
      ) {
        throw Error('Invalid arguments')
      }
      return this.asyncGetReq(
        `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${
          this.user
        }&api_key=${this.apiKey}&format=json&limit=200&page=${page}`
      )
    } catch (err) {
      return Promise.reject(err.message || err)
    }
  }
}
