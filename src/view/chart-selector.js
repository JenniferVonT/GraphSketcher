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

#width, #height {
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
      <label for="width">Width:</label>
      <input id="width" type="number">
    </div>

    <div class="size_option">
      <label for="height">Height:</label>
      <input id="height" type="number">
    </div>
  </div>

  <div id="data-selectors">
    <form class="data_option">
      <fieldset>
        <legend>Input data</legend>
        <div>
          <label for="input_key">name: </label>
          <input class="input_data key" type="text" maxlength="15" id="input_key">
        </div>

        <div>
          <label for="input_value">value: </label>
          <input class="input_data value" type="number" max="1500" min="0" id="input_value">
        </div>
      </fieldset>
    </form>

    <form class="data_option">
      <fieldset>
        <legend>Update data</legend>
        <div>
          <label for="update_key">name: </label>
          <input class="update_data key" type="text" maxlength="15" id="update_key">
        </div>

        <div>
          <label for="update_value">value: </label>
          <input class="update_data value" type="number" max="1500" min="0" id="update_value">
        </div>
      </fieldset>
    </form>

    <form class="data_option">
      <fieldset>
        <legend>Delete data</legend>
        <div>
          <label for="delete_key">name: </label>
          <input class="delete_data key" type="text" maxlength="15" id="delete_key">
        </div>

        <div>
          <label for="delete_value">value: </label>
          <input class="delete_data value" type="number" max="1500" min="0" id="delete_value">
        </div>
      </fieldset>
    </form>
  </div>
</div>
`

customElements.define('chart-selector', 
  class extends HTMLElement {
    #wrapper
    #widthSelector
    #heightSelector
    #colorSelector
    #inputData
    #updateData
    #deleteData
  
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.#wrapper = this.shadowRoot.querySelector('#wrapper')
        this.#widthSelector = this.shadowRoot.querySelector('#width')
        this.#heightSelector = this.shadowRoot.querySelector('#height')
        this.#colorSelector = this.shadowRoot.querySelectorAll('.color')
        this.#inputData = this.shadowRoot.querySelectorAll('.input_data')
        this.#updateData = this.shadowRoot.querySelectorAll('.update_data')
        this.#deleteData = this.shadowRoot.querySelectorAll('.delete_data')
    }
  }
)