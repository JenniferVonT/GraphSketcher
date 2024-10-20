/**
 * The module that represents the view.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/view/view.js
 * @version 1.0.0
 */

import Controller from '../controller/controller.js'

export default class View {
  #controller

  constructor() {
    this.#controller = new Controller()
  }

  startPage () {
    const doc = document.querySelector('body')

    doc.append(document.createElement('p').textContent = 'test hejsan!')

    this.#controller.test()
  }
}
