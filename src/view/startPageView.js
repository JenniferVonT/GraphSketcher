/**
 * The module that represents the start page view.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/view/startPageview.js
 * @version 1.0.0
 */

export default class StartPage {
  #startPage
  #editor
  #controller

  constructor (controller) {
    this.#controller = controller
    this.#startPage = document.querySelector('#starting_page')
    this.#editor = document.querySelector('#edit_chart_wrapper')
  }

  showPage () {
    this.#configureStartingSelectButtons()

    this.#startPage.classList.remove('hidden')

    this.clearEditorPreview()
  }

  #configureStartingSelectButtons () {
    const iconElementsAndTypes = this.#bindStartSelectIcons()
    this.#setEventListenersForStartIcons(iconElementsAndTypes)
  }

  #bindStartSelectIcons () {
    const pieSelectButton = document.querySelector('#pie_chart_select_icon')
    const columnSelectButton = document.querySelector('#column_chart_select_icon')
    const lineSelectButton = document.querySelector('#line_chart_select_icon')

    const iconElementsAndTypes = [
      { element: pieSelectButton, type: 'createPieChart' },
      { element: columnSelectButton, type: 'createColumnChart' },
      { element: lineSelectButton, type: 'createLineChart' }
    ]

    return iconElementsAndTypes
  }

  #setEventListenersForStartIcons (iconElementsAndTypes) {
    for (const icon of iconElementsAndTypes) {
      const element = icon.element
      const type = icon.type

      element.addEventListener('click', () => {
        this.#controller.processChartSelectionInput(type)
      })
    }
  }

  clear () {
    this.#startPage.classList.add('hidden')
    this.clearEditorPreview()
    this.hideEditor()
  }

  hideEditor() {
    this.#editor.classList.add('hidden')
  }

  clearEditorPreview () {
    this.#clearEditorInputs()
    this.#clearChartPreview()
    this.clearDataListPreview()
  }

  #clearEditorInputs () {
    try {
      const selector = document.querySelector('chart-selector')
      selector.clearAllInputs()
    } catch (error) {
      // Do nothing.
    }
  }

  #clearChartPreview () {
    const chartPreview = document.querySelector('#chart_preview')
    const activeChart = chartPreview.firstElementChild

    if (activeChart) {
      chartPreview.removeChild(activeChart)
    }
  }

  clearDataListPreview () {
    const dataListPreview = document.querySelector('#data_list_preview')

    if (dataListPreview) {
      dataListPreview.innerHTML = ''
    }
  }

  showEditorView (canvasElementToShow) {
    this.#configureEditorEvents()
    this.#configurePersistenceButtonsInEditor()
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
    this.clearDataListPreview()

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

  #configurePersistenceButtonsInEditor () {
    const resetButton = document.querySelector('#clear_editor_btn')
    const saveButton = document.querySelector('#save_chart_btn')
    const downloadButton = document.querySelector('#download_chart_btn')

    this.#setEventListenerForReset(resetButton)
    this.#setEventListenerForSave(saveButton)
    this.#setEventListenerForDownload(downloadButton)
  }

  #setEventListenerForReset (buttonElement) {
    buttonElement.addEventListener('click', (event) => {
      event.preventDefault()

      this.#updateEditorPreviewReset()
    })
  }

  #updateEditorPreviewReset () {
    const canvasType = document.querySelector('canvas').getAttribute('class')
    const updateTypeName = `create${canvasType.charAt(0).toUpperCase() + canvasType.slice(1)}`

    this.clearEditorPreview()
    this.#controller.processChartSelectionInput(updateTypeName)
  }

  #setEventListenerForSave (buttonElement) {
    buttonElement.addEventListener('click', (event) => {
      event.preventDefault()

      this.#controller.saveActiveChart()
    })
  }

  #setEventListenerForDownload (buttonElement) {
    buttonElement.addEventListener('click', (event) => {
      event.preventDefault()

      this.#controller.processDownloadActiveCanvas()
    })
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
      this.#routeNewHeightData(event.detail)
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
}
