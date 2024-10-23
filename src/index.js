/**
 * Starting point of the application.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @version 1.0.0
 */

import Controller from './controller/controller.js'
import Model from './model/model.js'

/**
 * Instantiates a new view and calls the first startPage method.
 */
function startApplication () {
  const model = new Model
  const controller = new Controller(model)

  controller.startApplication()
}

startApplication()
