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
  constructor(apiKey, user, levelConcurrency) {
    this.levelConcurrency = levelConcurrency
    this.api = new Api(user, apiKey)
  }

  /**
   * Get the total of pages
   * @returns {Number} The total of pages
   */
  async getTotalPages() {
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
  async process(start = 0, end) {
    try {
      let results = []
      const totalPages = end || Number(await this.getTotalPages())
      const levelConcurrency = Number(this.levelConcurrency) || totalPages
      const chunk =
        levelConcurrency >= totalPages - start
          ? 1
          : (totalPages - start) % levelConcurrency !== 0
          ? Math.floor((totalPages - start) / levelConcurrency) - 1
          : (totalPages - start) / levelConcurrency
      let requests = []
      let count = 0
      for (let i of [
        ...Array.from(
          { length: totalPages - start },
          (value, key) => key + start
        )
      ]) {
        count++
        if (count < chunk) {
          requests.push(this.api.apiReq({ page: i }))
        }
        if (count >= chunk) {
          count = 0
          requests.push(this.api.apiReq({ page: i }))
          const data = await Promise.all(requests)
          requests = []
          results.push(
            ...data.map(page => {
              if (
                page &&
                page.recenttracks &&
                typeof page.recenttracks === 'object' &&
                page.recenttracks['@attr']
              ) {
                delete page.recenttracks['@attr']
                if (Array.isArray(page.recenttracks.track)) {
                  if (page.recenttracks.track[0]['@attr']) {
                    page.recenttracks.track.shift()
                  }
                  page.recenttracks.track.map(tr => {
                    if (tr.date) {
                      if (tr.date['#text']) {
                        tr.timestamp = tr.date['#text']
                        delete tr.date
                      }
                    }
                  })

                  return page.recenttracks.track
                }
              }
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
