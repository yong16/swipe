/**
 * dom 操作
 * @param element
 */
export var dqsa = function (element) { return document.querySelectorAll(element); };
/**
 * dom 操作
 * @param element
 */
export var dqs = function (element) { return document.querySelector(element); };
/**
 * 事件监听
 * @param e
 * @param fn
 */
export var addListener = function (elem, e, fn) { return elem.addEventListener(e, fn, false); };
/**
 * 移除事件监听
 * @param elem
 * @param e
 * @param fn
 */
export var removeListener = function (elem, e, fn) { return elem.removeEventListener(e, fn, false); };
