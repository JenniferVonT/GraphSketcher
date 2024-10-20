/**
 * The module that represents the controller.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/controller/controller.js
 * @version 1.0.0
 */

import Model from '../model/model.js'

export default class Controller {
  #model

  constructor() {
    this.#model = new Model()
  }

  test () {
    console.log('test')
  }
}
