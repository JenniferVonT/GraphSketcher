/**
 * The module that handles saving data in the localstorage.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/model/dataSaver.js
 * @version 1.0.0
 */

export default class DataSaver {
  #maxStorageValues = 5

  constructor () {}

  saveChart (chart, title) {
    // TO-DO: Save chart data as stringified JSON in localstorage.
  }

  deleteChart (id) {
    // TO-DO: Delete he chart from the localstorage.
  }
  
  createUniqueID () {
    // TO-DO: Create a unique id (check against saved charts so as not to have doublicate ids).
  }

}
