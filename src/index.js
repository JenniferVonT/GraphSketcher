/**
 * Starting point of the application.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @version 1.0.0
 */

import View from './view/view.js'

/**
 * Instantiates a new view and calls the first startPage method.
 */
function startApplication () {
  const view = new View()

  view.startPage()
}

startApplication()
