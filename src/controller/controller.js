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

  constructor (model) {
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
        break
      case 'saved':
        this.#model.clearActiveChart()
        this.#view.showSavedChartsPage(this.#model.getAllSavedCharts())
        break
      default:
        break
    }
  }

  processChartSelectionInput (input) {
    this.#model.clearActiveChart()

    switch (input) {
      case 'createPieChart':
        this.#createChart('pie')

        this.#view.showEditorView(this.#model.getActiveChartCanvas())
        break
      case 'createColumnChart':
        this.#createChart('column')

        this.#view.showEditorView(this.#model.getActiveChartCanvas())
        break
      case 'createLineChart':
        this.#createChart('line')

        this.#view.showEditorView(this.#model.getActiveChartCanvas())
        break
      default:
        break
    }
  }

  #createChart (typeOfChart) {
    return this.#model.createNewChart(typeOfChart)
  }

  processEditorColorChange (colorToChangeTo) {
    if (this.#validator.isColorValid(colorToChangeTo)) {
      this.#model.updateChartColor(colorToChangeTo)

      const canvas = this.#model.getActiveChartCanvas()

      this.#updateEditorPreview(canvas)
    }
  }

  processEditorDataInput (key, value) {
    if (this.#validator.isTitleValid(key) && this.#validator.isDataValueValid(value)) {
      this.#model.insertNewDataPoint(key, value)

      const canvas = this.#model.getActiveChartCanvas()
      const dataPoints = this.#model.getDataFromActiveChart()

      this.#updateEditorPreview(canvas, dataPoints)
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
      case 'width': {
        this.#model.updateChartWidth(valueInt)
  
        this.#updateEditorPreview(this.#model.getActiveChartCanvas())
        break
      }
      case 'height': {
        this.#model.updateChartHeight(valueInt)

        this.#updateEditorPreview(this.#model.getActiveChartCanvas())
        break
      }
      default:
        break
    }
  }

  #updateEditorPreview (canvasElement, dataPoints) {
    this.#view.updateChartPreviewInEditor(canvasElement)

    if (dataPoints) {
      this.#view.updateDataListPreviewInEditor(dataPoints)
    }
  }

  processDownloadActiveCanvas () {
    const url = this.#createDownloadableURLFromCanvasElement(this.#model.getActiveChartCanvas())
  
    const chart = this.#model.getActiveChartCanvas()
    const type = chart.getAttribute('class')

    this.#view.startDownload(url, type)
  }

  processDeletionOfSavedChart (id) {
    if (id) {
      this.#model.deleteChart(id)
    }
    this.#view.showSavedChartsPage(this.#model.getAllSavedCharts())
  }

  processDownloadFromSavedPage (id) {
    const chartData = this.#model.getSavedChartById(id)

    const url = this.#createDownloadableURLFromCanvasElement(chartData.canvas)
    const type = chartData.canvas.getAttribute('class')

    this.#view.startDownload(url, type)
  }

  saveActiveChart () {
    this.#model.saveActiveChart()
  }

  clearActiveChart () {
    this.#model.clearActiveChart()
  }

  #createDownloadableURLFromCanvasElement (canvasElement) {
    const blobObject = this.#createBlobObject(canvasElement)

    return URL.createObjectURL(blobObject)
  }

  #createBlobObject (canvasElement) {
    const canvasURL = canvasElement.toDataURL('image/png')

    return this.#convertBase64ToBlob(canvasURL, 'image/png')
  }

  #convertBase64ToBlob (base64, mimeType) {
    const decodedBase64ToString = atob(base64.split(',')[1])
    const arrayBuffer = new ArrayBuffer(decodedBase64ToString.length)
    const uintArray = new Uint8Array(arrayBuffer)

    for (let i = 0; i < decodedBase64ToString.length; i++) {
      uintArray[i] = decodedBase64ToString.charCodeAt(i)
    }

    return new Blob([uintArray], { type: mimeType })
  }
}
