import { Api } from './api'

/**
 * Handles processing
 * @param {String} apiKey The LastFM API key
 * @param {String} user The user to get data from
 * @param {Number} levelConcurrency The pages to be requested concurrently. Example: 10 total results and 2 level of concurrency -> 10/2 : 5 pages will be requested concurrently. If
 * passed levelConcurrenty is greater than total number of results, then all requests will be done sequentially.
 */
export class Proc {
  /**
   * Constructor class
   */
  constructor (apiKey, user, levelConcurrency) {
    this.levelConcurrency = levelConcurrency
    this.api = new Api(user, apiKey)
  }

  /**
   * Get the total of pages
   * @returns {Number} The total of pages
   */
  async getTotalPages () {
    try {
      const resultJson = await this.api.apiReq()
      return resultJson.recenttracks['@attr'].totalPages
    } catch (error) {
      return Promise.reject(error.message || error)
    }
  }

  /**
   * Performs requests and return results
   * @returns {Object} The results object
   */
  async process () {
    try {
      let results = []
      const totalPages = Number(await this.getTotalPages())
      const levelConcurrency = Number(this.levelConcurrency) || totalPages
      const chunk =
        levelConcurrency >= totalPages
          ? 1
          : Math.floor(totalPages / levelConcurrency)
      let requests = []
      let count = 0
      for (let i of [...Array(totalPages).keys()]) {
        count++
        if (count <= chunk) {
          console.log('pusing to send: ', i)
          requests.push(this.api.apiReq({ page: i }))
        }
        if (count === chunk) {
          count = 0
          console.log('throwing all promises')
          const data = await Promise.all(requests)
          requests = []
          results.push(
            ...data.map(page => {
              delete page.recenttracks['@attr']
              page.recenttracks.track.map(tr => {
                if (tr.date) {
                  if (tr.date['#text']) {
                    tr.timestamp = tr.date['#text']
                    delete tr.date
                  }
                }
              })
              return page.recenttracks.track
            })
          )
        }
      }
      return results
    } catch (error) {
      return Promise.reject(error.message || error)
    }
  }
}
