import { Node } from 'butterfly-dag';
import $ from 'jquery';
class BaseNode extends Node {
    constructor(opts) {
        super(opts);
        this.titleBox = null;
    }
    mounted() {
        this.options.PointLabelRight.forEach((item, index) => {
            if (this[item.endpoint]) {
                this.addEndpoint({
                    id: item.endpoint,
                    dom: this[item.endpoint],
                });
            }
        })
        this.options.PointLabelLeft.forEach((item, index) => {
            if (this[item.endpoint]) {
                this.addEndpoint({
                    id: item.endpoint,
                    dom: this[item.endpoint],
                });
            }
        })


    }
    draw = (data) => {

        let container = $('<div class= "test-base-node"> </div>')
            .css('top', data.top)
            .css('left', data.left)
            .css('width', data.options.width)
            .css('height', data.options.height)
            .attr('id', data.id);
        container.append(`<div><span class='text'>${data.options.text}</span></div>`);
        let containerbody = $(`<div class="containerbody"></div>`);

        let containerleft = $(`<div class="containerleft"></div>`);
        let containerright = $(`<div class="containerright"></div>`);

        this.options.PointLabelRight.forEach((item, index) => {
            this[item.endpoint] = ($(`<div class="custom-gray-point"></div>`));
        })
        this.options.PointLabelLeft.forEach((item, index) => {
            this[item.endpoint] = ($(`<div class="custom-gray-point"></div>`));
        })

        if (data.options.PointLabelRight || data.options.PointLabelLeft) {
            data.options.PointLabelRight.forEach((item, index) => {
                let length = data.options.PointLabelRight;
                let height = data.options.height;
                let endpoint = $(`<div class="endpointInfo" "></div>`);
                endpoint.append(`<span class="label_span">${item.label}</span>`);
                endpoint.append(this[item.endpoint]);
                containerright.append(endpoint);
            })
            data.options.PointLabelLeft.forEach((item, index) => {
                let length = data.options.PointLabelRight;
                let height = data.options.height;
                let endpoint = $(`<div class="actionpointInfo" ;"></div>`);
                endpoint.append(this[item.endpoint]);
                endpoint.append(`<span class="label_span">${item.label}</span>`);

                containerleft.append(endpoint);
            })
            containerbody.append(containerleft)
            containerbody.append(containerright)
            container.append(containerbody);

        }


        return container[0];
    }
}
export default BaseNode;