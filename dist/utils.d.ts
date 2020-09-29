/**
 * dom 操作
 * @param element
 */
export declare const dqsa: (element: string) => NodeList;
/**
 * dom 操作
 * @param element
 */
export declare const dqs: (element: string) => Element;
/**
 * 事件监听
 * @param e
 * @param fn
 */
export declare const addListener: (elem: HTMLElement, e: string, fn: EventListenerObject) => void;
/**
 * 移除事件监听
 * @param elem
 * @param e
 * @param fn
 */
export declare const removeListener: (elem: HTMLElement, e: string, fn: EventListenerObject) => void;
