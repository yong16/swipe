interface swipeOptions {
    initIndex?: number;
    autoPlay?: number;
    showDots?: boolean;
    loop?: boolean;
    change?: (index: number) => void;
}
export default class Swipe {
    options: swipeOptions;
    swipeEl: HTMLElement;
    swipeW: number;
    private $ul;
    private $li;
    swipeItemsLen: number;
    pos: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        distanceX: number;
    };
    loop: {
        timer: number;
        cloneNumber: number;
        startIdxAdd: number;
    };
    destroy: () => void;
    constructor(el: HTMLElement | string, options: swipeOptions);
    /**
     * touchstart
     * @param {TouchEvent} e
     */
    private onTouchStart;
    /**
     * touchmove
     * @param {TouchEvent} e
     */
    private onTouchMove;
    /**
     * touchend
     */
    private onTouchEnd;
    private autoPlay;
    private clearAutoPlay;
    private initDots;
    private setDotsClass;
    /**
     * 添加切换时的过渡效果
     * @param {HTMLElement} el
     */
    private addTransition;
    /**
     * 清除切换时的过渡效果
     * @param {HTMLElement} el
     */
    private removeTransition;
    /**
     * 监听每一次图片切换的动画结束事件，添加回掉事件
     * @param {HTMLElement} el
     * Todo prev change, touchstart change, click callback
     */
    private onTransEnd;
    /**
     * 处理位移距离
     * @param {HTMLElement} el
     * @param {number | string} distance 位移距离
     */
    private setTranslate;
    /**
     * 设置循环播放
     * @param {boolean} isLoop 是否循环播放
     */
    setLoop(isLoop: boolean): void;
    /**
     * 初始化
     */
    init(): void;
    onResize(): void;
    destroyed(): void;
}
export {};
