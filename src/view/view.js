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
  #startBtn
  #savedGraphBtn
  #documentBody

  constructor() {
    this.#controller = new Controller()

    this.#startBtn = document.querySelector('#nav_start')
    this.#savedGraphBtn = document.querySelector('#nav_saved_graphs')
    this.#documentBody = document.querySelector('main')

    this.#configureNavigationButtons()
  }

  #configureNavigationButtons () {
    this.#startBtn.addEventListener('click', (event) => {
      event.preventDefault()

      this.#showStartPage()
    })

    this.#savedGraphBtn.addEventListener('click', (event) => {
      event.preventDefault()

      this.#showSavedChartsPage()
    })
  }

  #showStartPage () {
      const p = document.createElement('p')
      this.#documentBody .append(p.textContent = 'START PAGE! \n')
  }

  #showSavedChartsPage() {
    // TO-DO: Implement the saved page.
    // Insert the saved graphs/charts into the DOM.
    const p = document.createElement('p')
    this.#documentBody .append(p.textContent = 'SAVED PAGE! \n')
  }

  showNotifications() {

  }
}
