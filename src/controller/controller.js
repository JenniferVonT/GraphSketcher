/**
 * The module that represents the controller.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/controller/controller.js
 * @version 1.0.0
 */

import Model from '../model/model.js'
import View from '../view/view.js'

export default class Controller {
  #model
  #view
  #activeData
  #activeChart

  constructor(model) {
    this.#model = model
    this.#view = new View(this)

    this.#activeData = { title: '', data: [] }
    this.#activeChart = null
  }

  startApplication () {
    this.#view.showStartPage()
  }

  processChartSelectionInput (input) {
    console.log('process user input')
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

  #createURLfromCanvasElement (canvasChartElement) {
    // TO-DO: Implement converting canvas element to a URL.
  }

  #deleteChart(canvasChartElement) {
    // TO-DO: Implement functionality to delete a chart by calling the model.
  }
}
