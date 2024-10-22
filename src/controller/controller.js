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
  #activeChartType
  #activeChart

  constructor() {
    this.#model = new Model()

    this.#activeData = { title: '', data: [] }
    this.#activeChartType = null
    this.#activeChart = null
  }

  startApplication () {
    this.#view = new View()
  }

  #createURLfromCanvasElement (canvasChartElement) {
    // TO-DO: Implement converting canvas element to a URL.
  }

  #deleteChart(canvasChartElement) {
    // TO-DO: Implement functionality to delete a chart by calling the model.
  }
}
