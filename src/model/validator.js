/**
 * The module that represents the validator.
 *
 * @author Jennifer von Trotta-Treyden <jv222th>
 * @module src/model/validator.js
 * @version 1.0.0
 */

export default class Validator {
  #VALID_COLORS = ['red', 'green', 'blue', 'yellow']

  isHeightorWidthValid (measurement) {
    if (measurement && typeof measurement === 'number' && measurement > 0) {
      return true
    }
    return false
  }

  isColorValid (color) {
    if (color && typeof color === 'String' && this.#VALID_COLORS.includes(color.toLowerCase())) {
      return true
    }
    return false
  }

  isDataValueValid (value) {
    if (value && typeof value === 'number' && value >= 0) {
      return true
    }
    return false
  }

  isTitleValid (titleInput) {
    const title = titleInput.toString()
    if (title && title.length > 0 && title.length < 30) {
      return true
    }
    return false
  }
}