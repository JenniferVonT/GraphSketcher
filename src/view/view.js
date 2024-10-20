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
    const doc = document.querySelector('main')

    doc.append(document.createElement('p').textContent = 'test hejsan!')

    const navStart = document.querySelector('#nav_start')
    const navSaved = document.querySelector('#nav_saved_graphs')

    navStart.addEventListener('click', () => {
      const p = document.createElement('p')
      doc.append(p.textContent = 'START PAGE! \n')
    })

    navSaved.addEventListener('click', () => {
      const p = document.createElement('p')
      doc.append(p.textContent = 'SAVED PAGE! \n')
    })

    this.#controller.test()
  }
}
