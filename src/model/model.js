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
   * @param {Object} dataPoints - Optional, is inserted at the start if present.
   */
  createNewChart(chartType, dataPoints) {
    const type = chartType.toLowerCase()

    switch (type) {
      case 'column':
        this.#activeChart = this.#dataVisualizer.createColumnChart(dataPoints)
        this.#activeColor = 'blue'
  
        return this.#activeChart
      case 'pie':
        this.#activeChart = this.#dataVisualizer.createPieChart(dataPoints)
        this.#activeColor = 'blue'
    
        return this.#activeChart
      case 'line':
        this.#activeChart = this.#dataVisualizer.createLineChart(dataPoints)
        this.#activeColor = 'blue'

        return this.#activeChart
      default:
        break
    }
  }

  getSavedChartById (id) {
    const chartData = this.#dataSaver.getSavedChart(id)

    const chart = this.#buildChart(chartData)
    this.clearActiveChart()

    const canvasElement = chart.getCanvasElement()

    return { id: chartData.id, canvas: canvasElement }

  }

  getAllSavedCharts () {
    const savedCharts = this.#dataSaver.getAllSavedCharts()
    const canvasElementsAndIds = []

    for (const chart of savedCharts) {
      const newChart = this.#buildChart(chart)
      const canvasElement = newChart.getCanvasElement()

      canvasElementsAndIds.push({ id: chart.id, canvas: canvasElement})

      this.clearActiveChart()
    }

    return canvasElementsAndIds
  }

  #buildChart (data) {
    const type = data.payload.type.slice(0, (data.payload.type.length - 5))
      
    let newChart

    if (Object.keys(data.payload.data).length > 0) {
      newChart = this.createNewChart(type, data.payload.data)
    } else {
      newChart = this.createNewChart(type)
    }

    return this.#buildCanvasElement(this.#activeChart, data.payload)
  }

  #buildCanvasElement (chart, options) {
    chart.setColorTheme(options.color)
    chart.setHeightTo(options.height)
    chart.setWidthTo(options.width)

    return chart
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

  deleteChart (id) {
    this.#dataSaver.deleteChart(id)
  }

  getDataFromActiveChart () {
    return this.#activeChart.getDataPoints()
  }

  getActiveChartCanvas () {
    return this.#activeChart.getCanvasElement()
  }
}
