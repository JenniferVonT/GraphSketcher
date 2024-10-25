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

  constructor () {
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
  createNewChart (chartType, dataPoints) {
    try {
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
    } catch (error) {
      console.error(error.message)
    }
  }

  getSavedChartById (id) {
    try {
      const chartData = this.#dataSaver.getSavedChart(id)

      const chart = this.#buildChart(chartData)
      this.clearActiveChart()

      const canvasElement = chart.getCanvasElement()

      return { id: chartData.id, canvas: canvasElement }
    } catch (error) {
      console.error(error.message)
    }
  }

  getAllSavedCharts () {
    try {
      const savedCharts = this.#dataSaver.getAllSavedCharts()
      const canvasElementsAndIds = []

      for (const chart of savedCharts) {
        const newChart = this.#buildChart(chart)
        const canvasElement = newChart.getCanvasElement()

        canvasElementsAndIds.push({ id: chart.id, canvas: canvasElement })

        this.clearActiveChart()
      }

      return canvasElementsAndIds
    } catch (error) {
      console.error(error.message)
    }
  }

  #buildChart (data) {
    try {
      const type = data.payload.type.slice(0, (data.payload.type.length - 5))

      if (Object.keys(data.payload.data).length > 0) {
        this.createNewChart(type, data.payload.data)
      } else {
        this.createNewChart(type)
      }

      return this.#buildCanvasElement(this.#activeChart, data.payload)
    } catch (error) {
      console.error(error.message)
    }
  }

  #buildCanvasElement (chart, options) {
    try {
      chart.setColorTheme(options.color)
      chart.setHeightTo(options.height)
      chart.setWidthTo(options.width)

      return chart
    } catch (error) {
      console.error(error.message)
    }
  }

  saveActiveChart () {
    try {
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
          data: this.#activeChart.getDataPoints()
        }
        this.#dataSaver.saveChart(this.#activeId, chartData)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  clearActiveChart () {
    this.#activeChart = null
    this.#activeId = null
  }

  updateChartHeight (height) {
    try {
      this.#activeChart.setHeightTo(height)

      return this.#activeChart
    } catch (error) {
      console.error(error.message)
    }
  }

  updateChartWidth (width) {
    try {
      this.#activeChart.setWidthTo(width)

      return this.#activeChart
    } catch (error) {
      console.error(error.message)
    }
  }

  updateChartColor (color) {
    try {
      this.#activeChart.setColorTheme(color)
      this.#activeColor = color

      return this.#activeChart
    } catch (error) {
      console.error(error.message)
    }
  }

  updateChartDataValue (nameKey, oldValue, newValue) {
    try {
      this.#activeChart.updateDataPoint(nameKey, oldValue, newValue)

      return this.#activeChart
    } catch (error) {
      console.error(error.message)
    }
  }

  insertNewDataPoint (key, value) {
    try {
      const existingData = Object.keys(this.#activeChart.getDataPoints()).length

      if ((existingData + 1) <= this.#maxDataPoints) {
        this.#activeChart.insertDataPoint(key, value)
      }
      return this.#activeChart
    } catch (error) {
      console.error(error.message)
    }
  }

  deleteDataPoint (key, value) {
    try {
      this.#activeChart.deleteDataPoint(key, value)

      return this.#activeChart
    } catch (error) {
      console.error(error.message)
    }
  }

  deleteChart (id) {
    try {
      this.#dataSaver.deleteChart(id)
    } catch (error) {
      console.error(error.message)
    }
  }

  getDataFromActiveChart () {
    try {
      return this.#activeChart.getDataPoints()
    } catch (error) {
      console.error(error.message)
    }
  }

  getActiveChartCanvas () {
    try {
      return this.#activeChart.getCanvasElement()
    } catch (error) {
      console.error(error.message)
    }
  }
}
