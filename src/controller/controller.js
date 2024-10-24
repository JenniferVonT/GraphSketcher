/**
 * The module that represents the controller.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/controller/controller.js
 * @version 1.0.0
 */

import View from '../view/view.js'
import Validator from '../model/validator.js'

export default class Controller {
  #model
  #view
  #validator
  #activeChart

  constructor(model) {
    this.#model = model
    this.#view = new View(this)
    this.#validator = new Validator()
    this.#activeChart = null
  }

  startApplication () {
    this.#view.showStartPage()
  }

  processChartSelectionInput (input) {
    switch (input) {
      case 'createPieChart':
        this.#createChartAndSetAsActive('pie')
        this.#view.showEditorView(this.#activeChart.getCanvasElement())
        break;
      case 'createColumnChart':
        this.#createChartAndSetAsActive('column')
        this.#view.showEditorView(this.#activeChart.getCanvasElement())
        break;
      case 'createLineChart':
        this.#createChartAndSetAsActive('line')
        this.#view.showEditorView(this.#activeChart.getCanvasElement())
        break;
      default:
        break;
    }
  }

  #createChartAndSetAsActive (typeOfChart) {
    this.#activeChart = this.#model.createNewChart(typeOfChart)
  }

  processEditorColorChange (colorToChangeTo) {
    if (this.#validator.isColorValid(colorToChangeTo)) {
      this.#activeChart = this.#model.updateChartColor(colorToChangeTo)

      this.#updateEditorPreview()
    }
  }

  processEditorDataInput (key, value) {
    if (this.#validator.isTitleValid(key) && this.#validator.isDataValueValid(value)) {
      this.#activeChart = this.#model.insertNewDataPoint(key, value)

      this.#updateEditorPreview()
    }
  }

  processEditorDataChange (key, newValue, oldValue) {
    if (this.#validator.isTitleValid(key) && this.#validator.isDataValueValid(newValue)) {

    }
  }

  processEditorDataDelete (key, value) {

  }

  #updateEditorPreview () {
    this.#view.updateChartPreviewInEditor(this.#activeChart.getCanvasElement())
    this.#view.updateDataListPreview(this.#activeChart.getDataPoints())
  }

  unsetActiveChart() {
    this.#activeChart = null
  }

  #createURLfromCanvasElement (canvasChartElement) {
    // TO-DO: Implement converting canvas element to a URL.
  }

  #deleteChart(canvasChartElement) {
    // TO-DO: Implement functionality to delete a chart by calling the model.
  }
}
