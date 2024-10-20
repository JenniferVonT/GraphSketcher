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
  #dataSaver
  #dataVisualizer

  constructor() {
    this.#dataSaver = new DataSaver()
    this.#dataVisualizer = new DataVisualizer()
  }
}
