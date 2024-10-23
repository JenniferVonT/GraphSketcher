/**
 * The module that represents the view.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/view/view.js
 * @version 1.0.0
 */

export default class View {
  #controller
  #navStartBtn
  #navSavedGraphBtn
  #startPage
  #savedGraphsPage

  constructor(controller) {
    this.#controller = controller
    this.#navStartBtn = document.querySelector('#nav_start')
    this.#navSavedGraphBtn = document.querySelector('#nav_saved_graphs')
    this.#startPage = document.querySelector('#starting_page')
    this.#savedGraphsPage = document.querySelector('#saved_page')

    this.#configureNavigationButtons()
  }

  #configureNavigationButtons () {
    this.#navStartBtn.addEventListener('click', (event) => {
      event.preventDefault()
  
      this.showStartPage()
    })

    this.#navSavedGraphBtn.addEventListener('click', (event) => {
      event.preventDefault()

      this.showSavedChartsPage()
    })
  }

  showStartPage () {
    this.#savedGraphsPage.classList.add('hidden')
    this.#startPage.classList.remove('hidden')

    this.#setupStartingSelectButtons()
  }

  #setupStartingSelectButtons () {
    const pieSelectButton = document.querySelector('#pie_chart_select_icon')
    const columnSelectButton = document.querySelector('#column_chart_select_icon')
    const lineSelectButton = document.querySelector('#line_chart_select_icon')

    pieSelectButton.addEventListener('click', () => {
      this.#controller.processChartSelectionInput('createPieChart')
    })

    columnSelectButton.addEventListener('click', () => {
      this.#controller.processChartSelectionInput('createColumnChart')
    })

    lineSelectButton.addEventListener('click', () => {
      this.#controller.processChartSelectionInput('createLineChart')
    })
  }

  showEditorView (canvasElementToShow) {
    console.log('show editor')
    document.querySelector('#starting_page').classList.add('hidden')
    document.querySelector('#edit_chart_wrapper').classList.remove('hidden')

    const chartPreview = document.querySelector('#chart_preview')
    chartPreview.append(canvasElementToShow)
  }

  showSavedChartsPage() {
    // TO-DO: Implement the saved page.
    this.#startPage.classList.add('hidden')
    this.#savedGraphsPage.classList.remove('hidden')

    this.#savedGraphsPage.append(document.createElement('p').textContent = 'TESTING!!')

    // Insert the saved graphs/charts into the DOM.
  }

  showNotifications() {

  }
}