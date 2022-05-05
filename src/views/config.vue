<template>
    <div class="page-box">
        <renderPage v-if="isShow" class="abc" :template="data" />
    </div>
</template>

<script>
import axios from 'axios'
import renderPage from './components/render.vue'
export default {
    components: { renderPage },
    data () {
        return {
            isShow: false,
            data: {},
            data1: { abc: '123' }
        }
    },
    methods: {
        conLog (data) {
            this.$message(data)
        }
    },
    mounted () {
        axios.get('/member/json/resdata.json').then(res => {
      
            this.data =  res.data
            this.isShow=true
        })
    }
}
</script>

<style></style>
