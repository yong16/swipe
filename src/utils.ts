/**
 * dom 操作
 * @param element 
 */
export const dqsa = (element: string):NodeList => document.querySelectorAll(element);

/**
 * dom 操作
 * @param element
 */
export const dqs = (element: string):Element => document.querySelector(element);

/**
 * 事件监听
 * @param e 
 * @param fn 
 */
 export const addListener = (elem: HTMLElement, e: string, fn: EventListenerObject) => elem.addEventListener(e, fn, false)

 /**
  * 移除事件监听
  * @param elem 
  * @param e 
  * @param fn 
  */
 export const removeListener = (elem: HTMLElement, e: string, fn: EventListenerObject) => elem.removeEventListener(e, fn, false)