/**
* The custom component that gathers the canvas element and title to show visually at ones.
*
* @author Jennifer von Trotta-Treyden <jv222th>
* @module src/model/saved-canvas.js
* @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
<style>
  :host{}
</style>

<div id="wrapper">
  <h3 id="title"></h3>
  <div id="canvasElement"></div>
</div>
`

customElements.define('saved-canvas', 
  class extends HTMLElement {
    #wrapper
    #title
    #canvasElement
  
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.#wrapper = this.shadowRoot.querySelector('#wrapper')
        this.#title = this.shadowRoot.querySelector('#title')
        this.#canvasElement = this.shadowRoot.querySelector('#canvasElement')
    }
  }
)