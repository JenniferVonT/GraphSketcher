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

  processChartSelectionInput (input) {
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

  #createURLfromCanvasElement (canvasChartElement) {
    // TO-DO: Implement converting canvas element to a URL.
  }

  #deleteChart(canvasChartElement) {
    // TO-DO: Implement functionality to delete a chart by calling the model.
  }
}
