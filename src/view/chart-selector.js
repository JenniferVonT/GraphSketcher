/**
* The custom component that handles the selector for a chart.
*
* @author Jennifer von Trotta-Treyden <jv222th>
* @module src/view/chart-selector.js
* @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
<style>
#wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas:
    "color data"
    "color data"
    "size data";
  gap: 10px;
  height: 100%;
}

#color_selectors, #size_selectors, #data-selectors {
  width: 100%;
  box-sizing: border-box;
}

.size_option input, .data_option input {
  min-width: 50px;
}

#Width, #Height {
  max-width: 80px;
}

.color_option {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
}

.color_example {
  width: 20px;
  height: 20px;
  border-radius: 50px;
  margin-right: 10px;
}

#color_selectors {
  grid-area: color;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  height: 100%; 
  padding: 15px;
  border: 1px solid black;
}

#red_prev > div {
  background-color: red;
}

#green_prev > div {
  background-color: green;
}

#blue_prev > div {
  background-color: blue;
}

#yellow_prev > div {
  background-color: yellow;
}

#size_selectors {
  grid-area: size;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  height: 100%;
  padding: 15px;
  border: 1px solid black;
}

.size_option {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 0;
}

.size_option label {
  flex-shrink: 0;
  margin-right: 10px;
}

#data-selectors {
  grid-area: data;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  padding: 15px;
  border: 1px solid black;
}

.data_option {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.data_option div {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
}

.data_option label {
  justify-self: flex-start;
}

.data_option input {
  justify-self: stretch;
  min-width: 50px;
  max-width: 150px;
}

.data_option legend {
  justify-self: flex-end;
}

.hidden {
  display: none;
}
</style>

<div id="wrapper">
  <div id="color_selectors">
    <div id="red_prev" class="color_option">
      <div class="color_example"></div>
      <input class="color" type="radio" name="color" id="red">
      <label for="red">Red</label>
    </div>

    <div id="green_prev" class="color_option">
      <div class="color_example"></div>
      <input class="color" type="radio" name="color" id="green">
      <label for="green">Green</label>
    </div>

    <div id="blue_prev" class="color_option">
      <div class="color_example"></div>
      <input class="color" type="radio" name="color" id="blue">
      <label for="blue">Blue</label>
    </div>

    <div id="yellow_prev" class="color_option">
      <div class="color_example"></div>
      <input class="color" type="radio" name="color" id="yellow">
      <label for="yellow">Yellow</label>
    </div>
  </div>

  <div id="size_selectors">
    <div class="size_option">
      <label for="Width">Width:</label>
      <input id="Width" type="number" max="600" min="0" autocomplete="off" placeholder="300">
    </div>

    <div class="size_option">
      <label for="Height">Height:</label>
      <input id="Height" type="number" max="600" min="0" autocomplete="off" placeholder="200">
    </div>
  </div>

  <div id="data-selectors">
    <form class="data_option" id="input_data_form">
      <fieldset>
        <legend>Input data</legend>
        <div>
          <label for="input_key">name: </label>
          <input class="input_data" type="text" maxlength="15" id="input_key" autocomplete="off">
        </div>

        <div>
          <label for="input_value">value: </label>
          <input class="input_data" type="number" id="input_value" autocomplete="off">
        </div>
      </fieldset>
      <input type="submit" class="hidden">
    </form>

    <form class="data_option" id="update_data_form">
      <fieldset>
        <legend>Update data</legend>
        <div>
          <label for="update_key">name: </label>
          <input class="update_data" type="text" maxlength="15" id="update_key" autocomplete="off">
        </div>

        <div>
          <label for="update_value">new value: </label>
          <input class="update_data" type="number" id="update_value" autocomplete="off">
        </div>
      </fieldset>
      <input type="submit" class="hidden">
    </form>

    <form class="data_option" id="delete_data_form">
      <fieldset>
        <legend>Delete data</legend>
        <div>
          <label for="delete_key">name: </label>
          <input class="delete_data" type="text" maxlength="15" id="delete_key" autocomplete="off">
        </div>

        <div>
          <label for="delete_value">value: </label>
          <input class="delete_data" type="number" id="delete_value" autocomplete="off">
        </div>
      </fieldset>
      <input type="submit" class="hidden">
    </form>
  </div>
</div>
`

customElements.define('chart-selector',
  class extends HTMLElement {
    #WidthSelector
    #HeightSelector
    #colorSelectors
    #inputData
    #updateData
    #deleteData
    #enterPressed

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#colorSelectors = this.shadowRoot.querySelectorAll('.color')
      this.#WidthSelector = this.shadowRoot.querySelector('#Width')
      this.#HeightSelector = this.shadowRoot.querySelector('#Height')
      this.#inputData = this.shadowRoot.querySelector('#input_data_form')
      this.#updateData = this.shadowRoot.querySelector('#update_data_form')
      this.#deleteData = this.shadowRoot.querySelector('#delete_data_form')

      this.#setEnterPressedTo(false)
    }

    connectedCallback () {
      this.#setEventListenersOnColorOptions()
      this.#setEventListenersOnSizeOption()
      this.#setEventListenersOnDataInputs()
    }

    #setEventListenersOnColorOptions () {
      this.#colorSelectors.forEach((color) => {
        color.addEventListener('change', () => {
          this.#emitCustomEvent('changeColor', color.getAttribute('id'))
        })
      })
    }

    #setEventListenersOnSizeOption () {
      const sizeElements = [this.#WidthSelector, this.#HeightSelector]

      sizeElements.forEach((element) => {
        const type = element.getAttribute('id')
        const eventName = `change${type}`

        element.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            this.#setEnterPressedTo(true) // Has to come before blurring target as to not handle the blur event right after.
            event.target.blur()

            this.#emitCustomEvent(eventName, event.target.value)
          }
          this.#setEnterPressedTo(false)
        })

        element.addEventListener('blur', (event) => {
          if (!this.#enterPressed) {
            this.#emitCustomEvent(eventName, event.target.value)
          }
        })
      })
    }

    #setEventListenersOnDataInputs () {
      const dataElements = [this.#inputData, this.#updateData, this.#deleteData]

      dataElements.forEach((element) => {
        element.addEventListener('submit', (event) => {
          event.preventDefault()

          const keyInput = element.querySelectorAll('input')[0]
          const valueInput = element.querySelectorAll('input')[1]

          const key = keyInput.value
          const value = valueInput.value
          const eventName = keyInput.className

          if (key && value) {
            this.#emitCustomEvent(eventName, value, key)

            keyInput.value = ''
            valueInput.value = ''
          }
        })
      })
    }

    #emitCustomEvent (event, value, keyName) {
      if (keyName) {
        this.dispatchEvent(new CustomEvent(event, {
          bubbles: true,
          detail: { key: keyName, value: parseInt(value) }
        }))
      } else {
        this.dispatchEvent(new CustomEvent(event, {
          bubbles: true,
          detail: value
        }))
      }
    }

    #setEnterPressedTo (trueOrFalse) {
      this.#enterPressed = trueOrFalse
    }

    clearAllInputs () {
      const inputs = this.shadowRoot.querySelectorAll('input')
      for (const input of inputs) {
        input.value = ''
      }
    }
  }
)
