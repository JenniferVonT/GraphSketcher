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
  }

  #configureNavigationButtons () {
    this.#setEventListenerForNavigationStart()
    this.#setEventListenerForNavigationSaved()
  }

  #setEventListenerForNavigationStart () {
    this.#navStartBtn.addEventListener('click', (event) => {
      event.preventDefault()
  
      this.showStartPage()
    })
  }

  #setEventListenerForNavigationSaved () {
    this.#navSavedGraphBtn.addEventListener('click', (event) => {
      event.preventDefault()

      this.showSavedChartsPage()
    })
  }

  showStartPage () {
    this.#configureStartingSelectButtons()
    this.#clearEditorPreview()
    this.#hideAndShowElementsForStartPage()
  }

  #configureStartingSelectButtons () {
    const iconElements = this.#bindStartSelectIcons()
    this.#setEventListenersForStartIcons(iconElements)
  }

  #bindStartSelectIcons () {
    const pieSelectButton = document.querySelector('#pie_chart_select_icon')
    const columnSelectButton = document.querySelector('#column_chart_select_icon')
    const lineSelectButton = document.querySelector('#line_chart_select_icon')

    const iconElements = [
      { element: pieSelectButton, type: 'createPieChart' },
      { element: columnSelectButton, type: 'createColumnChart' },
      { element: lineSelectButton, type: 'createLineChart' }
    ]

    return iconElements
  }
  
  #setEventListenersForStartIcons (iconElements) {
    for (const icon of iconElements) {
      const element = icon.element
      const type = icon.type

      element.addEventListener('click', () => {
        this.#controller.processChartSelectionInput(type)
      })
    }
  }

  #clearEditorPreview () {
    this.#clearChartPreview()
    this.#clearDataListPreview()
  }

  #clearChartPreview () {
    const chartPreview = document.querySelector('#chart_preview')
    const activeChart = chartPreview.firstElementChild
    
    if (activeChart) {
      chartPreview.removeChild(activeChart)
    }
  }

  #clearDataListPreview () {
    const dataListPreview = document.querySelector('#data_list_preview')

    if (dataListPreview) {
      dataListPreview.innerHTML = ''
    }
  }

  #hideAndShowElementsForStartPage () {
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

  updateDataListPreviewInEditor (updatedDatapoints) {
    this.#clearDataListPreview()

    const dataPointList = document.querySelector('#data_list_preview')
    dataPointList.append(this.#createDataList(updatedDatapoints))
  }

  #createDataList (dataPoints) {
    const list = document.createElement('ul')

    Object.entries(dataPoints).forEach(([key, value]) => {
      const listPoint = document.createElement('li')
      const data = document.createElement('p')

      data.innerHTML = `<b>name: </b> ${key}, <b>value: </b> ${value}`
      data.setAttribute('key', key)
      data.setAttribute('value', value)

      listPoint.append(data)
      list.append(listPoint)
    })

    return list
  }

  #configureEditorEvents () {
    const editorOptions = document.querySelector('chart-selector')

    editorOptions.addEventListener('input_data', (event) => {
      this.#sendNewDataPointRequestFromEditor(event.detail.key, event.detail.value)
    })

    editorOptions.addEventListener('update_data', (event) => {
      this.#sendUpdateDataPointRequestFromEditor(event.detail.key, event.detail.value)
    })

    editorOptions.addEventListener('delete_data', (event) => {
      this.#sendDeleteDataPointRequestFromEditor(event.detail.key, event.detail.value)
    })

    editorOptions.addEventListener('changeWidth', (event) => {
      this.#routeNewWidthData(event.detail)
    })

    editorOptions.addEventListener('changeHeight', (event) => {
      this.#routeNewHeightData('height', event.detail)
    })

    editorOptions.addEventListener('changeColor', (event) => {
      this.#routeNewColorTheme(event.detail)
    })
  }

  #sendNewDataPointRequestFromEditor (key, value) {
    this.#controller.processEditorDataInput(key, value)
  }

  #sendUpdateDataPointRequestFromEditor (key, newValue) {
    const dataElement = document.querySelector(`[key="${key}"]`)

    if (dataElement) {
      const oldValue = dataElement.getAttribute('value')
      this.#controller.processEditorDataChange(key, newValue, oldValue)
    }
  }

  #sendDeleteDataPointRequestFromEditor (key, value) {
    this.#controller.processEditorDataDelete(key, value)
  }

  #routeNewWidthData (newWidth) {
    this.#controller.processEditorSizeChange('width', newWidth)
  }

  #routeNewHeightData (newHeight) {
    this.#controller.processEditorSizeChange('height', newHeight)
  }

  #routeNewColorTheme (color) {
    this.#controller.processEditorColorChange(color)
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