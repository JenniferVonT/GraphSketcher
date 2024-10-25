/**
 * The module that represents the view.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/view/view.js
 * @version 1.0.0
 */

import StartPage from './startPageView'
import SavedPage from './savedPageView'

export default class View {
  #controller
  #navStartBtn
  #navSavedGraphBtn
  #startPage
  #savedPage

  constructor (controller) {
    this.#controller = controller
    this.#startPage = new StartPage(controller)
    this.#savedPage = new SavedPage(controller)
  
    this.#navStartBtn = document.querySelector('#nav_start')
    this.#navSavedGraphBtn = document.querySelector('#nav_saved_graphs')

    this.#configureNavigationButtons()
  }

  #configureNavigationButtons () {
    this.#setEventListenerForNavigationStart()
    this.#setEventListenerForNavigationSaved()
  }

  #setEventListenerForNavigationStart () {
    this.#navStartBtn.addEventListener('click', (event) => {
      event.preventDefault()

      this.#controller.processNavigationInput('start')
    })
  }

  #setEventListenerForNavigationSaved () {
    this.#navSavedGraphBtn.addEventListener('click', (event) => {
      event.preventDefault()

      this.#controller.processNavigationInput('saved')
    })
  }

  showStartPage () {
    this.#startPage.showPage()
    this.#startPage.hideEditor()

    this.#savedPage.hidePage()
  }

  showEditorView (canvasElementToShow) {
    this.#startPage.showEditorView(canvasElementToShow)
  }

  updateChartPreviewInEditor (updatedCanvasElement) {
    this.#startPage.updateChartPreviewInEditor(updatedCanvasElement)
  }

  updateDataListPreviewInEditor (updatedDatapoints) {
    this.#startPage.updateDataListPreviewInEditor(updatedDatapoints)
  }

  showSavedChartsPage (savedCharts) {
    this.#startPage.hidePage()
    this.#savedPage.showPage(savedCharts)
  }

  startDownload (downloadURL, chartType) {
    const downloadLink = document.querySelector('#download_link')

    downloadLink.href = downloadURL
    downloadLink.download = `${chartType}_graph_sketcher.png`

    downloadLink.click()
  }
}
