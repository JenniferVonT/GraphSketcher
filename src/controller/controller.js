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
  #activeData
  #activeChart

  constructor(model) {
    this.#model = model
    this.#view = new View(this)
    this.#validator = new Validator()

    this.#activeData = { title: '', data: [] }
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
      this.#view.updateChartPreviewInEditor(this.#activeChart.getCanvasElement())
    }
  }

  processEditorDataInput (key, value) {
    this.#activeChart = this.#model
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
