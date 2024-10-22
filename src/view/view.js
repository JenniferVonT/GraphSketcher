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
    this.#insertStartingTitle()
    this.#insertGraphSelectButtons()
  }

  #insertStartingTitle () {
    const title = document.createElement('h1')

    title.setAttribute('id', 'start_title')
    title.textContent = 'Pick a graph type to start!'

    this.#documentBody.append(title)
  }

  #insertGraphSelectButtons () {
    const wrapper = document.createElement('div')
    wrapper.setAttribute('id', 'starting_page_select_wrapper')

    wrapper.append(this.#createPieGraphButton())
    wrapper.append(this.#createColumnGraphButton())
    wrapper.append(this.#createLineGraphButton())

    this.#documentBody.append(wrapper)
  }

  #createStartingSelectIcons (idToSetAsAttribute) {
    const imgElement = document.createElement('img')
    imgElement.setAttribute('id', idToSetAsAttribute)
    imgElement.classList.add('starting_page_select_btns')
    imgElement.setAttribute('src', `./img/${idToSetAsAttribute}.png`)
    imgElement.setAttribute('alt', idToSetAsAttribute)
  
    return imgElement
  }

  #createPieGraphButton () {
    const pieChart = this.#createStartingSelectIcons('pie_chart_select_icon')

    pieChart.addEventListener('click', () => {
      console.log('pie test')
    })

    return pieChart
  }

  #createColumnGraphButton () {
    const columnChart = this.#createStartingSelectIcons('column_chart_select_icon')
    columnChart.addEventListener('click', () => {
      console.log('column test')
    })

    return columnChart
  }

  #createLineGraphButton () {
    const lineChart = this.#createStartingSelectIcons('line_chart_select_icon')
    lineChart.addEventListener('click', () => {
      console.log('line test')
    })

    return lineChart
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
