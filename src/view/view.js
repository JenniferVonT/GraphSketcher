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

  constructor (controller) {
    this.#controller = controller
    this.#navStartBtn = document.querySelector('#nav_start')
    this.#navSavedGraphBtn = document.querySelector('#nav_saved_graphs')
    this.#startPage = document.querySelector('#starting_page')
    this.#savedGraphsPage = document.querySelector('#saved_page')

    this.#configureNavigationButtons()
    this.#configureStartingSelectButtons()
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

  #configureStartingSelectButtons () {
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

  #configureEditorEvents () {
    const editorOptions = document.querySelector('chart-selector')

    editorOptions.addEventListener('input_data', (event) => {
      this.#handleDataInEditor('input', event.detail)
    })

    editorOptions.addEventListener('update_data', (event) => {
      this.#handleDataInEditor('update', event.detail)
    })

    editorOptions.addEventListener('delete_data', (event) => {
      this.#handleDataInEditor('delete', event.detail)
    })

    editorOptions.addEventListener('changeWidth', (event) => {
      console.log(event.detail)
    })

    editorOptions.addEventListener('changeHeight', (event) => {
      console.log(event.detail)
    })

    editorOptions.addEventListener('changeColor', (event) => {
      console.log(event.detail)
    })
  }

  showStartPage () {
    // Clear the preview from the editor.
    const chartPreview = document.querySelector('#chart_preview')
    const activeChart = chartPreview.firstElementChild

    this.#controller.unsetActiveChart()
    
    if (activeChart) {
      chartPreview.removeChild(activeChart)
    }

    // Hide/Show the relevant elements.
    this.#savedGraphsPage.classList.add('hidden')
    this.#startPage.classList.remove('hidden')
    document.querySelector('#edit_chart_wrapper').classList.add('hidden')
  }

  showEditorView (canvasElementToShow) {
    this.#configureEditorEvents()
    document.querySelector('#starting_page').classList.add('hidden')
    document.querySelector('#edit_chart_wrapper').classList.remove('hidden')

    this.updateChartPreviewInEditor(canvasElementToShow)
  }

  updateChartPreviewInEditor (updatedCanvasElement) {
    const chartPreview = document.querySelector('#chart_preview')
    chartPreview.innerHTML = ''

    chartPreview.prepend(updatedCanvasElement)
  }

  updateDataListPreview (updatedDatapoints) {
    const dataPointList = document.querySelector('#data_list_preview')
    dataPointList.innerHTML = ''

    const list = document.createElement('ul')

    Object.entries(updatedDatapoints).forEach(([key, value]) => {
      const listPoint = document.createElement('li')
      const data = document.createElement('p')

      data.innerHTML = `<b>name: </b> ${key}, <b>value: </b> ${value}`
      data.setAttribute('key', key)
      data.setAttribute('value', value)

      listPoint.append(data)
      list.append(listPoint)
    })

    dataPointList.append(list)
  }

  #handleDataInEditor (eventType, data) {
    switch (eventType) {
      case 'input':
        this.#controller.processEditorDataInput(data.key, data.value)
        break;
      case 'update':
        const dataElement = document.querySelector(`[key="${data.key}"]`)

        if (dataElement) {
          const oldValue = dataElement.getAttribute('value')
          this.#controller.processEditorDataChange(data.key, data.value, oldValue)
        }
        break;
      case 'delete':
        this.#controller.processEditorDataDelete(data.key, data.value)
        break;
      default:
        break;
    }
  }

  showSavedChartsPage () {
    // TO-DO: Implement the saved page.
    this.#startPage.classList.add('hidden')
    this.#savedGraphsPage.classList.remove('hidden')

    this.#savedGraphsPage.append(document.createElement('p').textContent = 'TESTING!!')

    // Insert the saved graphs/charts into the DOM.
  }

  showNotifications () {

  }
}