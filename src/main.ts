import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from "mitt";
import installElementPlus from './plugins/element'
import "@/views/editor/common/fonts/iconfont.css"
import echartsBar from '@/views/components/echartsOptions/echartsBar.vue'
import wbutton from '@/views/components/morecompon/wbutton.vue'
import wradiogroup from '@/views/components/morecompon/wradiogroup.vue'
import wselect from '@/views/components/morecompon/wselect.vue'
import wicon from '@/views/components/morecompon/wicon.vue'
import wspan from '@/views/components/morecompon/wspan.vue'
import wpage from '@/views/components/morecompon/wpage.vue'
import echartsPie from '@/views/components/echartsOptions/echartsPie.vue'
let zjDom = require('@/views/components/zjDom/index.js')

const app = createApp(App)
installElementPlus(app)
app.component("echarts-bar", echartsBar)
app.component("echarts-pie", echartsPie)
app.component("wbutton", wbutton)
app.component("wselect", wselect)
app.component("wpage", wpage)
app.component("wradiogroup", wradiogroup)
app.component("wicon", wicon)
app.component("wspan", wspan)

for (let x in zjDom.default) {
    let val = zjDom.default[x]
    app.component(x, val)
}
//初始化bus总线
app.config.globalProperties.$bus = mitt();
app.use(store).use(router).mount('#app')