var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var { start } = require('./')

module.exports = class Setup extends Nanocomponent {
  constructor (id, state, emit, opts) {
    super()
    this.emit = emit
    this.opts = opts
  }

  createElement (state) {
    this.coc_accepted = state.user.coc_accepted
    this.privacy_setup = state.user.privacy_setup

    var el

    if (!state.user.coc_accepted) {
      el = require('../cards/signup/code-of-conduct')(state, this.emit)
    } else if (!state.user.privacy_setup) {
      el = require('../cards/signup/identity-choice')(state, this.emit)
    } else {
      el = start(state)
    }

    return html`
      
    <div class="flex flex-column justfy-center items-center pb4 bb b--black-20">
      ${el}
    </div>
  
    `
  }

  load () {

  }

  // Implement conditional rendering
  update (state) {
    if (state.user.coc_accepted !== this.coc_accepted || state.user.privacy_setup !== this.privacy_setup) return true
    return false // do not update
  }
}
