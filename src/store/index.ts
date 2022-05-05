import { createStore } from 'vuex'
let {editor} = require("./modules/editor.js")

export default createStore({
    modules: {
        editor:editor
    } 
})