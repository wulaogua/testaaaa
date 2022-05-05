import config from './config' // 基础路径
import service from './service' //封装的axios
/**
 * data 是post传参
 *
 */
export const allrequest = (req) => service({
    url: req.options.url,
    method: req.options.method,
    data: req.data,

})