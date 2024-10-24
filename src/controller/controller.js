/**
 * The module that represents the controller.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/controller/controller.js
 * @version 1.0.0
 */

import View from '../view/view.js'
import Validator from './validator.js'

export default class Controller {
  #model
  #view
  #validator

  constructor(model) {
    this.#model = model
    this.#view = new View(this)
    this.#validator = new Validator()
  }

  startApplication () {
    this.#view.showStartPage()
  }

  processNavigationInput (input) {
    switch (input) {
      case 'start':
        this.#model.clearActiveChart()
        this.#view.showStartPage()
        break;
      case 'saved':
        this.#model.clearActiveChart()
        this.#view.showSavedChartsPage(this.#model.getAllSavedCharts())
        break;
      default:
        break;
    }
  }

  processChartSelectionInput (input) {
      this.#model.clearActiveChart()

    switch (input) {
      case 'createPieChart':
        this.#view.showEditorView(this.#createChart('pie').getCanvasElement())
        break;
      case 'createColumnChart':
        this.#view.showEditorView(this.#createChart('column').getCanvasElement())
        break;
      case 'createLineChart':
        this.#view.showEditorView(this.#createChart('line').getCanvasElement())
        break;
      default:
        break;
    }
  }

  #createChart (typeOfChart) {
    return this.#model.createNewChart(typeOfChart)
  }

  processEditorColorChange (colorToChangeTo) {
    if (this.#validator.isColorValid(colorToChangeTo)) {
      const chart = this.#model.updateChartColor(colorToChangeTo)

      this.#updateEditorPreview(chart.getCanvasElement())
    }
  }

  processEditorDataInput (key, value) {
    if (this.#validator.isTitleValid(key) && this.#validator.isDataValueValid(value)) {
      const chart = this.#model.insertNewDataPoint(key, value)
      const dataPoints = this.#model.getDataFromActiveChart()

      this.#updateEditorPreview(chart.getCanvasElement(), dataPoints)
    }
  }

  processEditorDataChange (key, newValue, oldValue) {
    const newValueInt = parseInt(newValue)
    const oldValueInt = parseInt(oldValue)

    if (this.#validator.isTitleValid(key) && this.#validator.isDataValueValid(newValueInt)) {
      if (newValueInt !== oldValueInt && this.#isDataPointPresent(key)) {
        const chart = this.#model.updateChartDataValue(key, oldValueInt, newValueInt)
        const dataPoints = this.#model.getDataFromActiveChart()

        this.#updateEditorPreview(chart.getCanvasElement(), dataPoints)
      }
    }
  }

  processEditorDataDelete (key, value) {
    const valueInt = parseInt(value)

    if (this.#validator.isTitleValid(key) && this.#validator.isDataValueValid(valueInt)) {
      if (this.#isDataPointPresent(key)) {
        const chart = this.#model.deleteDataPoint(key, valueInt)
        const dataPoints = this.#model.getDataFromActiveChart()

        this.#updateEditorPreview(chart.getCanvasElement(), dataPoints)
      }
    }
  }

  #isDataPointPresent (key) {
    const savedDataPoints = this.#model.getDataFromActiveChart()

    const foundDataPoint = savedDataPoints[key]

    if (foundDataPoint) {
      return true
    }
    return false
  }

  processEditorSizeChange (sizeType, value) {
    const valueInt = parseInt(value)

    if (!this.#validator.isDataValueValid(valueInt) || valueInt > 600) {
      return
    }

    switch (sizeType) {
      case 'width':
        const updateChartWidth = this.#model.updateChartWidth(valueInt)
        this.#updateEditorPreview(updateChartWidth.getCanvasElement())
        break;
      case 'height':
        const updatedChartHeight = this.#model.updateChartHeight(valueInt)
        this.#updateEditorPreview(updatedChartHeight.getCanvasElement())
        break;
      default:
        break;
    }
  }

  #updateEditorPreview (canvasElement, dataPoints) {
    this.#view.updateChartPreviewInEditor(canvasElement)

    if (dataPoints) {
      this.#view.updateDataListPreviewInEditor(dataPoints)
    }
  }

  saveActiveChart() {
    this.#model.saveActiveChart()
  }

  clearActiveChart () {
    this.#model.clearActiveChart()
  }

  processDownloadActiveCanvas () {
    const url = this.#createDownloadableURLFromActiveChart()
    const type = this.#model.getActiveChartCanvas().getAttribute('class')

    this.#view.startDownload(url, type)
  }

  #createDownloadableURLFromActiveChart () {
    const blobObject = this.#createBlobObject()

    return URL.createObjectURL(blobObject)
  }
  
  #createBlobObject () {
    const canvasChartElement = this.#model.getActiveChartCanvas()
    const canvasURL = canvasChartElement.toDataURL('image/png')

    return this.#convertBase64ToBlob(canvasURL, 'image/png')
  }

  #convertBase64ToBlob(base64, mimeType) {
    const decodedBase64ToString = atob(base64.split(',')[1])
    const arrayBuffer = new ArrayBuffer(decodedBase64ToString.length)
    const uintArray = new Uint8Array(arrayBuffer)
  
    for (let i = 0; i < decodedBase64ToString.length; i++) {
        uintArray[i] = decodedBase64ToString.charCodeAt(i)
    }
  
    return new Blob([uintArray], { type: mimeType })
  }

  #deleteChart(canvasChartElement) {
    // TO-DO: Implement functionality to delete a chart by calling the model.
  }
}
