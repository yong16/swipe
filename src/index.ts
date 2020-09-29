import { dqs } from './utils';

interface swipeOptions {
  initIndex?: number; // 初始化index位置
  autoPlay?: number; // 是否自动滚动
  showDots?: boolean; // 是否显示指示器
  loop?: boolean; // 是否开启循环播放
  change?: (index:number) => void // 每一页轮播结束后触发
}

// 获取当前事件坐标
const getPos = (e: TouchEvent) => {
  const pos = e.changedTouches[0];
  return {
    x: pos.clientX,
    y: pos.clientY
  }
}

export default class Swipe {
  swipeEl: HTMLElement; // swipe 容器
  swipeW: number; // swipe 容器宽度
  private $ul: HTMLElement;
  private $li: HTMLElement[];
  swipeItemsLen: number;
  pos: {
    startX: number; // 开始触摸X坐标点
    startY: number; // 开始触摸Y坐标点
    endX: number; // 手指到达位置的X坐标点
    endY: number; // 手指到达位置的Y坐标点
    distanceX: number; // 移动的横向距离
  } = {
    startX: 0, // 开始触摸X坐标点
    startY: 0, // 开始触摸Y坐标点
    endX: 0, // 手指到达位置的X坐标点
    endY: 0, // 手指到达位置的Y坐标点
    distanceX: 0 // 移动的横向距离
  }
  loop: {
    timer: number; // 定时器
    cloneNumber: number; // 默认循环播放时clone的节点数量
    startIdxAdd: number; // 循环播放时，默认初始位置 + 1
  } = {
    timer: 0, // 定时器
    cloneNumber: 2, // 默认循环播放时clone的节点数量
    startIdxAdd: 1 // 循环播放时，默认初始位置 + 1
  }
  destroy: () => void = this.destroyed;
  constructor (el: HTMLElement | string, public options: swipeOptions) {
    this.options = {
      initIndex: 0,
      loop: true,
      ...this.options
    }
    if (typeof el === 'string') {
      this.swipeEl = dqs(el) as HTMLElement;
    } else {
      this.swipeEl = el;
    }
    
    // 滑动容器
    this.$ul = this.swipeEl.querySelector('.swipe__container') as HTMLElement;
    this.$li = Array.from(this.$ul.querySelectorAll('.swipe-item')) as HTMLElement[];
    if (this.$li.length === 1) return;
    
    // autoPlay 存在 && loop 为false时，重置 loop 为true（循环模式）
    const { autoPlay, loop } = this.options;
    if (autoPlay && !loop ) {
      this.options.loop = true;
    }
    // 设置是否循环播放
    this.setLoop(this.options.loop)
    
    // 初始化方法
    this.init()
  }

  /**
   * touchstart
   * @param {TouchEvent} e
   */
  private onTouchStart (e: TouchEvent):void {
    this.pos.startX = getPos(e).x;
    this.pos.startY = getPos(e).y;

    // 清除自动播放
    this.clearAutoPlay()
  }

  /**
   * touchmove
   * @param {TouchEvent} e
   */
  private onTouchMove (e: TouchEvent):void {
    this.pos.endX = getPos(e).x;
    this.pos.endY = getPos(e).y;
    
    let distanceX = this.pos.endX - this.pos.startX;
    let distanceY = this.pos.endY - this.pos.startY;

    this.pos.distanceX = distanceX;
    // 判断为横向滑动
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      e.stopPropagation();
      e.preventDefault();
      this.removeTransition(this.$ul);
      const _w = -this.options.initIndex * this.swipeW + distanceX;
      this.setTranslate(this.$ul, _w);
    }
  }
  
  /**
   * touchend
   */
  private onTouchEnd ():void {
    // 滑动距离超过 容器宽度 1/5 视为有效切换，否则回弹
    if (Math.abs(this.pos.distanceX) > this.swipeW / 5) {
      if (this.pos.distanceX > 0) {
        this.options.initIndex --;
      } else {
        this.options.initIndex ++;
      }
    }

    const { initIndex, loop } = this.options;
    // 非循环播放
    if (!loop) {
      if (initIndex < 0) {
        this.options.initIndex = 0;
      }
      if (initIndex > this.swipeItemsLen - 1) {
        this.options.initIndex = this.swipeItemsLen - 1;
      }
    }

    // 添加过渡，设置位移
    this.addTransition(this.$ul);
    const _w = -this.options.initIndex * this.swipeW;
    this.setTranslate(this.$ul, _w);
    
    // 初始化
    this.pos.startX = 0;
    this.pos.distanceX = 0;
    // 恢复自动播放
    this.autoPlay()
  }

  // 自动播放
  private autoPlay() {
    clearInterval(this.loop.timer);

    if (!this.options.autoPlay) return;

    this.loop.timer = window.setInterval(() => {
      this.options.initIndex ++;
      // 过渡
      this.addTransition(this.$ul);
      // 设置位移距离
      const _w = -this.options.initIndex * this.swipeW;
      this.setTranslate(this.$ul, _w);
    }, this.options.autoPlay)
  }

  // 清除自动播放
  private clearAutoPlay () {
    clearInterval(this.loop.timer);
  }

  // 生成指示器
  private initDots () {
    if (!this.options.showDots) return;
    const { swipeItemsLen, loop } = this;
    let dotsHtml = '';
    for (let i = 0, len = swipeItemsLen - loop.cloneNumber; i < len; i++) {
      dotsHtml += '<i></i>'
    }

    let dotsParent = document.createElement('div');
    dotsParent.className = 'swipe__dots';
    dotsParent.innerHTML = dotsHtml;
    this.swipeEl.appendChild(dotsParent);
    this.setDotsClass();
  }

  // 设置指示器选中
  private setDotsClass () {
    if (!this.options.showDots) return;
    const $dots = Array.from(this.swipeEl.querySelectorAll('.swipe__dots > i')) as HTMLElement[];
    const len = this.swipeItemsLen;
    for (let i = 0; i < len - this.loop.cloneNumber; i++){
      $dots[i].classList.remove('activate');
    }
    $dots[this.options.initIndex - this.loop.startIdxAdd].classList.add('activate');
  }

  /**
   * 添加切换时的过渡效果
   * @param {HTMLElement} el 
   */
  private addTransition (el:HTMLElement) {
    el.classList.add('transition');
  }

  /**
   * 清除切换时的过渡效果
   * @param {HTMLElement} el 
   */
  private removeTransition (el:HTMLElement) {
    el.classList.remove('transition');
  }

  /**
   * 监听每一次图片切换的动画结束事件，添加回掉事件
   * @param {HTMLElement} el 
   * Todo prev change, touchstart change, click callback
   */
  private onTransEnd () {
    let { initIndex, loop, change } = this.options
    // 循环播放
    if (loop) {
      // 右滑过最后一张，显示第一张图
      if (initIndex >= this.$li.length - 1) {
        this.options.initIndex = 1;
      } else if (initIndex <= 0) {
        // 左滑过第一张，显示最后一张图
        this.options.initIndex = this.swipeItemsLen - this.loop.cloneNumber;
      }
    }
    
    // 清除过渡效果
    this.removeTransition(this.$ul);
    // 处理位移位置
    const _w = -this.options.initIndex * this.swipeW;
    this.setTranslate(this.$ul, _w);
    // 设置指示器选中效果
    this.setDotsClass();
    // 触发结束回调
    if (change && typeof change === 'function') {
      let _idx = this.options.initIndex;
      if (loop) {
        _idx -= this.loop.startIdxAdd;
      }
      this.options.change(_idx);
    }
  }
  
  /**
   * 处理位移距离
   * @param {HTMLElement} el 
   * @param {number | string} distance 位移距离
   */
  private setTranslate (el: HTMLElement, distance: number | string) {
    const _style = el.style;
    _style.transform = `translate3d(${distance}px, 0, 0)`;
    _style.webkitTransform = `translate3d(${distance}px, 0, 0)`;
  }

  /**
   * 设置循环播放
   * @param {boolean} isLoop 是否循环播放
   */
  setLoop (isLoop: boolean) {
    if (!isLoop) {
      // 设置 clone 节点数量为 0，不复制首尾
      this.loop.cloneNumber = 0;
      // 设置默认初始位置 +0
      this.loop.startIdxAdd = 0;
      return;
    };
    this.options.initIndex += this.loop.startIdxAdd;
    // 复制头尾两张图
    const cloneFirst = this.$li[0].cloneNode(true);
    const cloneLast = this.$li[this.$li.length - 1].cloneNode(true);
    this.$ul.insertBefore(cloneLast, this.$li[0]);
    this.$ul.appendChild(cloneFirst);

    this.$li = Array.from(this.$ul.querySelectorAll('.swipe-item')) as HTMLElement[];
  }

  /**
   * 初始化
   */
  init () {
    // 容器宽度
    this.swipeW = this.swipeEl.clientWidth;
    
    // 设置ul 宽度
    const $ul = this.swipeEl.querySelector('.swipe__container') as HTMLElement;
    $ul.style.width = `${this.swipeW * this.$li.length}px`;

    // 设置每个 li 宽度
    this.$li.forEach((item) => {
      item.style.width = `${this.swipeW}px`;
    })
    this.swipeItemsLen = this.$li.length;

    // 生成指示器
    this.initDots();

    // 初始化位置
    const _w = -this.options.initIndex * this.swipeW;
    this.setTranslate(this.$ul, _w);

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
  }
  // 窗口重置事件
  onResize () {
    this.init();
  }
  // 销毁事件监听
  destroyed () {
    this.swipeEl.removeEventListener('touchstart', this.onTouchStart.bind(this), false);
    this.swipeEl.removeEventListener('touchmove', this.onTouchMove.bind(this), false);
    this.swipeEl.removeEventListener('touchend', this.onTouchEnd.bind(this), false);
    this.$ul.removeEventListener('transitionend', this.onTransEnd.bind(this), false);
    window.removeEventListener('resize', this.onResize.bind(this), false);
  }
} 
