/**
 * The module that represents the model.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/model/model.js
 * @version 1.0.0
 */

import DataSaver from './dataSaver.js'
import DataVisualizer from '@jenvont/datavisualizer'

export default class Model {
  #maxDataPoints = 20
  #dataSaver
  #dataVisualizer
  #activeChart
  #activeTitle

  constructor() {
    this.#dataSaver = new DataSaver()
    this.#dataVisualizer = new DataVisualizer()

    this.#activeChart = null
    this.#activeTitle = null
  }

  /**
   * 
   * @param {String} chartType - 'Column', 'line' or 'pie'.
   */
  createNewChart(chartType) {
    const type = chartType.toLowerCase()

    switch (type) {
      case 'column':
        this.#activeChart = this.#dataVisualizer.createColumnChart()
  
        return this.#activeChart
      case 'pie':
        this.#activeChart = this.#dataVisualizer.createPieChart()
    
        return this.#activeChart
      case 'line':
        this.#activeChart = this.#dataVisualizer.createLineChart()

        return this.#activeChart
      default:
        break
    }
  }

  getAllSavedCharts () {
    return this.#dataSaver.getSavedCharts()
  }

  saveActiveChart () {
    if (this.#activeChart) {
      this.#dataSaver(this.#activeChart)
    }
  }

  updateChartHeight (height) {
    this.#activeChart.setHeightTo(height)

    return this.#activeChart
  }

  updateChartWidth (width) {
    this.#activeChart.setWidthTo(width)

    return this.#activeChart
  }

  /**
   * @param {String} color - Update to red, green, blue or yellow.
   */
  updateChartColor (color) {
    this.#activeChart.setColorTheme(color)

    return this.#activeChart
  }

  updateChartDataValue (nameKey, oldValue, newValue) {
    this.#activeChart.updateDataPoint(nameKey, oldValue, newValue)

    return this.#activeChart
  }

  insertNewDataPoint (key, value) {
    this.#activeChart.insertDataPoint(key, value)

    return this.#activeChart
  }

  deleteDataPoint (key, value) {
    this.#activeChart.deleteDataPoint(key, value)

    return this.#activeChart
  }

  updateTitle (newTitle) {
    this.#activeTitle = newTitle
  }

  deleteChart (chart) {
    this.#dataSaver.deleteChart(chart)
  }

  getDataFromActiveChart () {
    return this.#activeChart.getDataPoints()
  }
}
