/**
 * The module that represents the saved page view.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/view/savedPageview.js
 * @version 1.0.0
 */

export default class SavedPage {
  #savedPage
  #controller

  constructor (controller) {
    this.#controller = controller
    this.#savedPage = document.querySelector('#saved_page')
  }

  hidePage() {
    this.#savedPage.classList.add('hidden')
    this.clearSavedList()
  }

  clearSavedList () {
    const chartWrapper = this.#savedPage.querySelector('#saved_chart_wrapper')
    chartWrapper.innerHTML = ''
  }

  showPage (savedCharts) {
    this.clearSavedList()

    for (const chart of savedCharts) {
      const chartWrapper = this.#savedPage.querySelector('#saved_chart_wrapper')
      chartWrapper.append(this.#buildSavedChartTemplate(chart))
    }

    this.#configureActionButtonsOnSavedCharts()
    this.#savedPage.classList.remove('hidden')
  }

  #buildSavedChartTemplate (chart) {
    const template = document.querySelector('#saved_page_template')
    const savedChartBox = document.importNode(template.content, true)

    savedChartBox.querySelector('.saved_preview').append(chart.canvas)
    savedChartBox.querySelectorAll('.delete_chart')[0].setAttribute('id', chart.id)
    savedChartBox.querySelectorAll('.download_saved_chart')[0].setAttribute('id', chart.id)

    return savedChartBox
  }

  #configureActionButtonsOnSavedCharts () {
    const deleteButtons = document.querySelectorAll('.delete_chart')
    const downloadButtons = document.querySelectorAll('.download_saved_chart')

    this.#setEventListenersForSavedDeleteButtons(deleteButtons)
    this.#setEventListenerForSavedDownloadButtons(downloadButtons)
  }

  #setEventListenersForSavedDeleteButtons (buttons) {
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('id')

        this.#controller.processDeletionOfSavedChart(id)
      })
    })
  }

  #setEventListenerForSavedDownloadButtons (buttons) {
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('id')

        this.#controller.processDownloadFromSavedPage(id)
      })
    })
  }
}
