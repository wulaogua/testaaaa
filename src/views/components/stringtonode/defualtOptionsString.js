function buttonOptions() {
    return {
        name: '按钮',
        type: 'button',
        disabled: true,
        value: '',
        style: {},
        class: '',
        fun(code1, code2) {
            return {
                click: new Function(`return ${code1}`)(),
                dbclick: new Function(`return ${code2}`)()
            }
        }
    }

}

function divOptions() {
    return {
        name: 'div',
        type: 'div',
        disabled: true,
        value: '',
        style: {
            height: '100px',
            width: '100px',
            border: '1px solid #000'
        },
        class: '',
        fun(code1, code2) {
            return {
                click: new Function(`return ${code1}`)(),
                dbclick: new Function(`return ${code2}`)()
            }
        }
    }

}
export { buttonOptions, divOptions }