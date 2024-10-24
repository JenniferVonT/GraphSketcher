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
  #activeId
  #activeColor

  constructor() {
    this.#dataSaver = new DataSaver()
    this.#dataVisualizer = new DataVisualizer()

    this.#activeChart = null
    this.#activeColor = null
    this.#activeId = null
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
        this.#activeColor = 'blue'
  
        return this.#activeChart
      case 'pie':
        this.#activeChart = this.#dataVisualizer.createPieChart()
        this.#activeColor = 'blue'
    
        return this.#activeChart
      case 'line':
        this.#activeChart = this.#dataVisualizer.createLineChart()
        this.#activeColor = 'blue'

        return this.#activeChart
      default:
        break
    }
  }

  getAllSavedCharts () {
    return this.#dataSaver.getSavedCharts()
  }

  saveActiveChart () {
    if (!this.#activeId) {
      const id = this.#dataSaver.createUniqueID()
      this.#activeId = id
    }

    if (this.#activeChart) {
      const chartData = {
        type: this.#activeChart.getCanvasElement().getAttribute('class'),
        height: this.#activeChart.getCanvasElement().height,
        width: this.#activeChart.getCanvasElement().width,
        color: this.#activeColor,
        data: this.#activeChart.getDataPoints(),
      }
  
      console.log(chartData)
      this.#dataSaver.saveChart(this.#activeId, JSON.stringify(chartData))
    }
  }

  clearActiveChart () {
    this.#activeChart = null
    this.#activeId = null
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
    this.#activeColor = color

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

  deleteChart (chart) {
    this.#dataSaver.deleteChart(chart)
  }

  getDataFromActiveChart () {
    return this.#activeChart.getDataPoints()
  }
}
