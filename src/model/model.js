/**
 * The module that represents the model.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/model/model.js
 * @version 1.0.0
 */

import DataSaver from './dataSaver.js'
import DataVisualizer from '@jenvont/datavisualizer'
import Validator from './validator.js'

export default class Model {
  #dataSaver
  #dataVisualizer
  #validator
  #activeChart
  #activeTitle

  constructor() {
    this.#dataSaver = new DataSaver()
    this.#dataVisualizer = new DataVisualizer()
    this.#validator = new Validator()

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
    if (this.#validator.isHeightorWidthValid(heigth)) {
      this.#activeChart.setHeightTo(height)

      return this.#activeChart
    }
  }

  updateChartWidth (width) {
    if (this.#validator.isHeightorWidthValid(width)) {
      this.#activeChart.setWidthTo(width)

      return this.#activeChart
    }
  }

  /**
   * @param {String} color - Update to red, green, blue or yellow.
   */
  updateChartColor (color) {
    if (this.#validator.isColorValid(color)) {
      this.#activeChart.setColorTheme(color)

      return this.#activeChart
    }
  }

  updateChartDataValue (nameTag, oldValue, newValue) {
    if (this.#validator.isDataValueValid(newValue) && oldValue !== newValue) {
      this.#activeChart.updateDataPoint(nameTag, oldValue, newValue)

      return this.#activeChart
    }
  }

  updateTitle (newTitle) {
    if (this.#validator.isTitleValid(newTitle)) {
      this.#activeTitle = newTitle
    }
  }

  deleteChart (chart) {
    this.#dataSaver.deleteChart(chart)
  }
}
