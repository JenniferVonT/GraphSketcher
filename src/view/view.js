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

      this.showStartPage()
    })

    this.#savedGraphBtn.addEventListener('click', (event) => {
      event.preventDefault()

      this.showSavedChartsPage()
    })
  }

  showStartPage () {
    this.#setupStartingSelectButtons()

    const startPage = document.querySelector('#starting_page')
    startPage.classList.remove('hidden')
  }

  #setupStartingSelectButtons () {
    const pieSelectButton = document.querySelector('#pie_chart_select_icon')
    const columnSelectButton = document.querySelector('#column_chart_select_icon')
    const lineSelectButton = document.querySelector('#line_chart_select_icon')

    pieSelectButton.addEventListener('click', () => {
      console.log('pie test')
    })

    columnSelectButton.addEventListener('click', () => {
      console.log('column test')
    })

    lineSelectButton.addEventListener('click', () => {
      console.log('line test')
    })
  }

  showSavedChartsPage() {
    // TO-DO: Implement the saved page.
    // Insert the saved graphs/charts into the DOM.
    const p = document.createElement('p')
    this.#documentBody .append(p.textContent = 'SAVED PAGE! \n')
  }

  showNotifications() {

  }
}
