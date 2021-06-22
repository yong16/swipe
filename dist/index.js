import { __assign } from "tslib";
import { dqs } from './utils';
// 获取当前事件坐标
var getPos = function (e) {
    var pos = e.changedTouches[0];
    return {
        x: pos.clientX,
        y: pos.clientY,
    };
};
var isTouchMoving = false;
var Swipe = /** @class */ (function () {
    function Swipe(el, options) {
        this.options = options;
        this.pos = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            distanceX: 0,
        };
        this.loop = {
            timer: 0,
            cloneNumber: 2,
            startIdxAdd: 1,
        };
        this.destroy = this.destroyed;
        this.moveTo = this.moveToPosition;
        this.options = __assign({ initIndex: 0, loop: true }, this.options);
        if (typeof el === 'string') {
            this.swipeEl = dqs(el);
        }
        else {
            this.swipeEl = el;
        }
        // 滑动容器
        this.$ul = this.swipeEl.querySelector('.swipe__container');
        this.$li = Array.from(this.$ul.querySelectorAll('.swipe-item'));
        if (this.$li.length === 1)
            return;
        // autoPlay 存在 && loop 为false时，重置 loop 为true（循环模式）
        var _a = this.options, autoPlay = _a.autoPlay, loop = _a.loop, initIndex = _a.initIndex;
        if (autoPlay && !loop) {
            this.options.loop = true;
        }
        // 设置是否循环播放
        this.setLoop(this.options.loop);
        // 初始化无效 initIndex 值
        var maxIndex = this.$li.length - 1 - this.loop.cloneNumber; // 最大索引值
        if (initIndex > maxIndex || initIndex < 0) {
            this.options.initIndex = 0 + this.loop.startIdxAdd;
        }
        // 初始化方法
        this.init();
    }
    /**
     * touchstart
     * @param {TouchEvent} e
     */
    Swipe.prototype.onTouchStart = function (e) {
        isTouchMoving = true;
        this.pos.startX = getPos(e).x;
        this.pos.startY = getPos(e).y;
        // 清除自动播放
        this.clearAutoPlay();
    };
    /**
     * touchmove
     * @param {TouchEvent} e
     */
    Swipe.prototype.onTouchMove = function (e) {
        this.pos.endX = getPos(e).x;
        this.pos.endY = getPos(e).y;
        var distanceX = this.pos.endX - this.pos.startX;
        var distanceY = this.pos.endY - this.pos.startY;
        this.pos.distanceX = distanceX;
        // 判断滑动方向
        if (Math.abs(distanceX) < Math.abs(distanceY))
            return; // 竖向滑动
        // 横向滑动时
        if (isTouchMoving) {
            // e.stopPropagation();
            e.preventDefault();
            this.removeTransition(this.$ul);
            isTouchMoving = false;
        }
        // 非循环时，设置第一张和最后一张滑动边界时不发生位移
        var _a = this.options, loop = _a.loop, initIndex = _a.initIndex;
        if (!loop && ((initIndex === 0 && distanceX > 0) || (initIndex === this.swipeItemsLen - 1 && distanceX < 0))) {
            return;
        }
        var _w = -this.options.initIndex * this.swipeW + distanceX;
        this.setTranslate(this.$ul, _w);
    };
    /**
     * touchend
     */
    Swipe.prototype.onTouchEnd = function () {
        isTouchMoving = false;
        // 滑动距离超过 容器宽度 1/5 视为有效切换，否则回弹
        if (Math.abs(this.pos.distanceX) > this.swipeW / 5) {
            if (this.pos.distanceX > 0) {
                this.options.initIndex--;
            }
            else {
                this.options.initIndex++;
            }
        }
        var _a = this.options, initIndex = _a.initIndex, loop = _a.loop;
        // 添加过渡
        if (!loop) {
            // 非循环播放
            if (initIndex < 0) {
                this.options.initIndex = 0;
            }
            else if (initIndex > this.swipeItemsLen - 1) {
                this.options.initIndex = this.swipeItemsLen - 1;
            }
            else {
                this.addTransition(this.$ul);
            }
        }
        else {
            this.addTransition(this.$ul);
        }
        // 设置位移
        // this.addTransition(this.$ul);
        var _w = -this.options.initIndex * this.swipeW;
        this.setTranslate(this.$ul, _w);
        // 初始化
        this.pos.startX = 0;
        this.pos.distanceX = 0;
        // 恢复自动播放
        this.autoPlay();
    };
    // 自动播放
    Swipe.prototype.autoPlay = function () {
        var _this = this;
        clearInterval(this.loop.timer);
        if (!this.options.autoPlay)
            return;
        this.loop.timer = window.setInterval(function () {
            _this.options.initIndex++;
            // 过渡
            _this.addTransition(_this.$ul);
            // 设置位移距离
            var _w = -_this.options.initIndex * _this.swipeW;
            _this.setTranslate(_this.$ul, _w);
        }, this.options.autoPlay);
    };
    // 清除自动播放
    Swipe.prototype.clearAutoPlay = function () {
        clearInterval(this.loop.timer);
    };
    // 生成指示器
    Swipe.prototype.initDots = function () {
        if (!this.options.showDots)
            return;
        var _a = this, swipeItemsLen = _a.swipeItemsLen, loop = _a.loop;
        var dotsHtml = '';
        for (var i = 0, len = swipeItemsLen - loop.cloneNumber; i < len; i++) {
            dotsHtml += '<i></i>';
        }
        var dotsParent = document.createElement('div');
        dotsParent.className = 'swipe__dots';
        dotsParent.innerHTML = dotsHtml;
        this.swipeEl.appendChild(dotsParent);
        this.setDotsClass();
    };
    // 设置指示器选中
    Swipe.prototype.setDotsClass = function () {
        if (!this.options.showDots)
            return;
        var $dots = Array.from(this.swipeEl.querySelectorAll('.swipe__dots > i'));
        var len = this.swipeItemsLen;
        for (var i = 0; i < len - this.loop.cloneNumber; i++) {
            $dots[i].classList.remove('activate');
        }
        $dots[this.options.initIndex - this.loop.startIdxAdd].classList.add('activate');
    };
    // 设置当前li(卡片)选中
    Swipe.prototype.setItemClass = function () {
        var len = this.swipeItemsLen;
        for (var i = 0; i < len; i++) {
            this.$li[i].classList.remove('activate');
        }
        this.$li[this.options.initIndex].classList.add('activate');
    };
    /**
     * 添加切换时的过渡效果
     * @param {HTMLElement} el
     */
    Swipe.prototype.addTransition = function (el) {
        el.classList.add('transition');
    };
    /**
     * 清除切换时的过渡效果
     * @param {HTMLElement} el
     */
    Swipe.prototype.removeTransition = function (el) {
        el.classList.remove('transition');
    };
    /**
     * 监听每一次图片切换的动画结束事件，添加回掉事件
     * @param {HTMLElement} el
     * Todo prev change, touchstart change, click callback
     */
    Swipe.prototype.onTransEnd = function () {
        var _a = this.options, initIndex = _a.initIndex, loop = _a.loop, change = _a.change;
        // 循环播放
        if (loop) {
            // 右滑过最后一张，显示第一张图
            if (initIndex >= this.$li.length - 1) {
                this.options.initIndex = 1;
            }
            else if (initIndex <= 0) {
                // 左滑过第一张，显示最后一张图
                this.options.initIndex = this.swipeItemsLen - this.loop.cloneNumber;
            }
        }
        // 清除过渡效果
        this.removeTransition(this.$ul);
        // 处理位移位置
        var _w = -this.options.initIndex * this.swipeW;
        this.setTranslate(this.$ul, _w);
        // 设置指示器选中效果
        this.setDotsClass();
        // item 添加选中class
        this.setItemClass();
        // 触发结束回调
        if (change && typeof change === 'function') {
            var _idx = this.options.initIndex;
            if (loop) {
                _idx -= this.loop.startIdxAdd;
            }
            this.options.change(_idx);
        }
    };
    /**
     * 处理位移距离
     * @param {HTMLElement} el
     * @param {number | string} distance 位移距离
     */
    Swipe.prototype.setTranslate = function (el, distance) {
        var _style = el.style;
        _style.transform = "translate3d(" + distance + "px, 0, 0)";
        _style.webkitTransform = "translate3d(" + distance + "px, 0, 0)";
    };
    /**
     * 设置循环播放
     * @param {boolean} isLoop 是否循环播放
     */
    Swipe.prototype.setLoop = function (isLoop) {
        if (!isLoop) {
            // 设置 clone 节点数量为 0，不复制首尾
            this.loop.cloneNumber = 0;
            // 设置默认初始位置 +0
            this.loop.startIdxAdd = 0;
            return;
        }
        this.options.initIndex += this.loop.startIdxAdd;
        // 复制头尾两张图
        var cloneFirst = this.$li[0].cloneNode(true);
        var cloneLast = this.$li[this.$li.length - 1].cloneNode(true);
        this.$ul.insertBefore(cloneLast, this.$li[0]);
        this.$ul.appendChild(cloneFirst);
        this.$li = Array.from(this.$ul.querySelectorAll('.swipe-item'));
    };
    /**
     * 移动到指定索引位置
     * @param {number} idx
     */
    Swipe.prototype.moveToPosition = function (idx) {
        // 无效索引值
        var maxIndex = this.swipeItemsLen - 1 - this.loop.cloneNumber;
        if (idx > maxIndex || idx < 0) {
            return;
        }
        if (this.options.loop) {
            this.options.initIndex = idx + 1;
        }
        else {
            this.options.initIndex = idx;
        }
        // 添加过渡，设置位移
        this.addTransition(this.$ul);
        var _w = -this.options.initIndex * this.swipeW;
        this.setTranslate(this.$ul, _w);
        // 设置class
        this.setItemClass();
        this.setDotsClass();
    };
    /**
     * 初始化
     */
    Swipe.prototype.init = function () {
        var _this = this;
        // 容器宽度
        this.swipeW = this.swipeEl.clientWidth;
        // 设置ul 宽度
        // const $ul = this.swipeEl.querySelector('.swipe__container') as HTMLElement;
        this.$ul.style.width = this.swipeW * this.$li.length + "px";
        // 设置每个 li 宽度
        this.$li.forEach(function (item) {
            item.style.width = _this.swipeW + "px";
        });
        this.swipeItemsLen = this.$li.length;
        // 生成指示器
        this.initDots();
        // 初始化位置
        var _w = -this.options.initIndex * this.swipeW;
        this.setTranslate(this.$ul, _w);
        // item 添加选中class
        this.setItemClass();
        // 处理自动播放
        this.autoPlay();
        // 监听切换动画结束事件
        this.$ul.addEventListener('transitionend', this.onTransEnd.bind(this), false);
        // 监听触摸事件
        this.swipeEl.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        this.swipeEl.addEventListener('touchmove', this.onTouchMove.bind(this), false);
        this.swipeEl.addEventListener('touchend', this.onTouchEnd.bind(this), false);
        // 监听窗口变化
        window.addEventListener('resize', this.onResize.bind(this), false);
    };
    // 窗口重置事件
    Swipe.prototype.onResize = function () {
        this.init();
    };
    // 销毁事件监听
    Swipe.prototype.destroyed = function () {
        this.swipeEl.removeEventListener('touchstart', this.onTouchStart.bind(this), false);
        this.swipeEl.removeEventListener('touchmove', this.onTouchMove.bind(this), false);
        this.swipeEl.removeEventListener('touchend', this.onTouchEnd.bind(this), false);
        this.$ul.removeEventListener('transitionend', this.onTransEnd.bind(this), false);
        window.removeEventListener('resize', this.onResize.bind(this), false);
    };
    return Swipe;
}());
export default Swipe;
