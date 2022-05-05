/**
 * 公共配置文件
 */


const currentConfigKey = process.env.NODE_ENV
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'development'

const configObj = {
    isDevelop: (isDev || isTest),

    // h5模式宽高
    canvasH5Width: 1920,
    canvasH5Height: 1080,
    pageModeList: [{
        value: 'h5',
        label: 'H5',
        disabled: false
    }, {
        value: 'longPage',
        label: '长页H5',
        disabled: false
    }, {
        name: 'relativePage',
        label: '排版图文',
        disabled: true
    }, {
        value: 'pc',
        label: 'PC页面',
        disabled: false
    }]
}

export default configObj