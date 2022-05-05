import Node from './node';
import Edge from './edge';
import BaseGroup from './group';
import BaseEndpoint from './endpoint';


let data = {
    nodes: [],
    //组
    groups: [],
    //线
    edges: []
};

export function setdata(params) {
    params.forEach((item, index) => {
        let maxlength = item.out.length > item.in.length ? item.out.length : item.in.length
        data.nodes.push({
            id: item.cardid,
            top: 216 + (index * 10),
            left: 250 + (index * 10),
            height: 30 + (maxlength * 30),
            width: 400,
            PointLabelRight: [...item.out],
            PointLabelLeft: [...item.in],
            text: item.title,
            Class: Node,
        })
    });
    return data
}