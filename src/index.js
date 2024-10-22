/**
 * Starting point of the application.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @version 1.0.0
 */

import Controller from './controller/controller.js'

/**
 * Instantiates a new view and calls the first startPage method.
 */
function startApplication () {
  const controller = new Controller()

  controller.startApplication()
}

startApplication()
