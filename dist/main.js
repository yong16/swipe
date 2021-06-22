/*!
 * @autots/swipe v0.0.1
 * Last Modified @ 2021-6-22 6:24:11 ├F10: PM┤
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Swipe"] = factory();
	else
		root["AutoTs"] = root["AutoTs"] || {}, root["AutoTs"]["Swipe"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ src_Swipe; });

// EXTERNAL MODULE: external "@babel/runtime/helpers/classCallCheck"
var classCallCheck_ = __webpack_require__(0);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/createClass"
var createClass_ = __webpack_require__(1);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_);

// CONCATENATED MODULE: ./src/utils.ts
/**
 * dom 操作
 * @param element
 */
var dqsa = function dqsa(element) {
  return document.querySelectorAll(element);
};
/**
 * dom 操作
 * @param element
 */

var dqs = function dqs(element) {
  return document.querySelector(element);
};
/**
 * 事件监听
 * @param e
 * @param fn
 */

var addListener = function addListener(elem, e, fn) {
  return elem.addEventListener(e, fn, false);
};
/**
 * 移除事件监听
 * @param elem
 * @param e
 * @param fn
 */

var removeListener = function removeListener(elem, e, fn) {
  return elem.removeEventListener(e, fn, false);
};
// CONCATENATED MODULE: ./src/index.ts


 // 获取当前事件坐标

var getPos = function getPos(e) {
  var pos = e.changedTouches[0];
  return {
    x: pos.clientX,
    y: pos.clientY
  };
};

var isTouchMoving = false;

var src_Swipe = /*#__PURE__*/function () {
  function Swipe(el, options) {
    classCallCheck_default()(this, Swipe);

    this.options = options;
    this.pos = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      distanceX: 0
    };
    this.loop = {
      timer: 0,
      cloneNumber: 2,
      startIdxAdd: 1
    };
    this.destroy = this.destroyed;
    this.moveTo = this.moveToPosition;
    this.options = Object.assign({
      initIndex: 0,
      loop: true
    }, this.options);

    if (typeof el === 'string') {
      this.swipeEl = dqs(el);
    } else {
      this.swipeEl = el;
    } // 滑动容器


    this.$ul = this.swipeEl.querySelector('.swipe__container');
    this.$li = Array.from(this.$ul.querySelectorAll('.swipe-item'));
    if (this.$li.length === 1) return; // autoPlay 存在 && loop 为false时，重置 loop 为true（循环模式）

    var _this$options = this.options,
        autoPlay = _this$options.autoPlay,
        loop = _this$options.loop,
        initIndex = _this$options.initIndex;

    if (autoPlay && !loop) {
      this.options.loop = true;
    } // 设置是否循环播放


    this.setLoop(this.options.loop); // 初始化无效索引值

    var maxIndex = this.$li.length - 1 - this.loop.cloneNumber; // 最大索引值

    if (initIndex > maxIndex || initIndex < 0) {
      this.options.initIndex = 0 + this.loop.startIdxAdd;
    } // 初始化方法


    this.init();
  }
  /**
   * touchstart
   * @param {TouchEvent} e
   */


  createClass_default()(Swipe, [{
    key: "onTouchStart",
    value: function onTouchStart(e) {
      isTouchMoving = true;
      this.pos.startX = getPos(e).x;
      this.pos.startY = getPos(e).y; // 清除自动播放

      this.clearAutoPlay();
    }
    /**
     * touchmove
     * @param {TouchEvent} e
     */

  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      this.pos.endX = getPos(e).x;
      this.pos.endY = getPos(e).y;
      var distanceX = this.pos.endX - this.pos.startX;
      var distanceY = this.pos.endY - this.pos.startY;
      this.pos.distanceX = distanceX; // 判断滑动方向

      if (Math.abs(distanceX) < Math.abs(distanceY)) return; // 竖向滑动
      // 横向滑动时

      if (isTouchMoving) {
        // e.stopPropagation();
        e.preventDefault();
        this.removeTransition(this.$ul);
        isTouchMoving = false;
      } // 非循环时，设置第一张和最后一张滑动边界时不发生位移


      var _this$options2 = this.options,
          loop = _this$options2.loop,
          initIndex = _this$options2.initIndex;

      if (!loop && (initIndex === 0 && distanceX > 0 || initIndex === this.swipeItemsLen - 1 && distanceX < 0)) {
        return;
      }

      var _w = -this.options.initIndex * this.swipeW + distanceX;

      this.setTranslate(this.$ul, _w);
    }
    /**
     * touchend
     */

  }, {
    key: "onTouchEnd",
    value: function onTouchEnd() {
      isTouchMoving = false; // 滑动距离超过 容器宽度 1/5 视为有效切换，否则回弹

      if (Math.abs(this.pos.distanceX) > this.swipeW / 5) {
        if (this.pos.distanceX > 0) {
          this.options.initIndex--;
        } else {
          this.options.initIndex++;
        }
      }

      var _this$options3 = this.options,
          initIndex = _this$options3.initIndex,
          loop = _this$options3.loop; // 添加过渡

      if (!loop) {
        // 非循环播放
        if (initIndex < 0) {
          this.options.initIndex = 0;
        } else if (initIndex > this.swipeItemsLen - 1) {
          this.options.initIndex = this.swipeItemsLen - 1;
        } else {
          this.addTransition(this.$ul);
        }
      } else {
        this.addTransition(this.$ul);
      } // 设置位移
      // this.addTransition(this.$ul);


      var _w = -this.options.initIndex * this.swipeW;

      this.setTranslate(this.$ul, _w); // 初始化

      this.pos.startX = 0;
      this.pos.distanceX = 0; // 恢复自动播放

      this.autoPlay();
    } // 自动播放

  }, {
    key: "autoPlay",
    value: function autoPlay() {
      var _this = this;

      clearInterval(this.loop.timer);
      if (!this.options.autoPlay) return;
      this.loop.timer = window.setInterval(function () {
        _this.options.initIndex++; // 过渡

        _this.addTransition(_this.$ul); // 设置位移距离


        var _w = -_this.options.initIndex * _this.swipeW;

        _this.setTranslate(_this.$ul, _w);
      }, this.options.autoPlay);
    } // 清除自动播放

  }, {
    key: "clearAutoPlay",
    value: function clearAutoPlay() {
      clearInterval(this.loop.timer);
    } // 生成指示器

  }, {
    key: "initDots",
    value: function initDots() {
      if (!this.options.showDots) return;
      var swipeItemsLen = this.swipeItemsLen,
          loop = this.loop;
      var dotsHtml = '';

      for (var i = 0, len = swipeItemsLen - loop.cloneNumber; i < len; i++) {
        dotsHtml += '<i></i>';
      }

      var dotsParent = document.createElement('div');
      dotsParent.className = 'swipe__dots';
      dotsParent.innerHTML = dotsHtml;
      this.swipeEl.appendChild(dotsParent);
      this.setDotsClass();
    } // 设置指示器选中

  }, {
    key: "setDotsClass",
    value: function setDotsClass() {
      if (!this.options.showDots) return;
      var $dots = Array.from(this.swipeEl.querySelectorAll('.swipe__dots > i'));
      var len = this.swipeItemsLen;

      for (var i = 0; i < len - this.loop.cloneNumber; i++) {
        $dots[i].classList.remove('activate');
      }

      $dots[this.options.initIndex - this.loop.startIdxAdd].classList.add('activate');
    } // 给当前索引 item 添加类名

  }, {
    key: "setItemClass",
    value: function setItemClass() {
      var len = this.swipeItemsLen;

      for (var i = 0; i < len; i++) {
        this.$li[i].classList.remove('activate');
      }

      this.$li[this.options.initIndex].classList.add('activate');
    }
    /**
     * 添加切换时的过渡效果
     * @param {HTMLElement} el
     */

  }, {
    key: "addTransition",
    value: function addTransition(el) {
      el.classList.add('transition');
    }
    /**
     * 清除切换时的过渡效果
     * @param {HTMLElement} el
     */

  }, {
    key: "removeTransition",
    value: function removeTransition(el) {
      el.classList.remove('transition');
    }
    /**
     * 监听每一次图片切换的动画结束事件，添加回掉事件
     * @param {HTMLElement} el
     * Todo prev change, touchstart change, click callback
     */

  }, {
    key: "onTransEnd",
    value: function onTransEnd() {
      var _this$options4 = this.options,
          initIndex = _this$options4.initIndex,
          loop = _this$options4.loop,
          change = _this$options4.change; // 循环播放

      if (loop) {
        // 右滑过最后一张，显示第一张图
        if (initIndex >= this.$li.length - 1) {
          this.options.initIndex = 1;
        } else if (initIndex <= 0) {
          // 左滑过第一张，显示最后一张图
          this.options.initIndex = this.swipeItemsLen - this.loop.cloneNumber;
        }
      } // 清除过渡效果


      this.removeTransition(this.$ul); // 处理位移位置

      var _w = -this.options.initIndex * this.swipeW;

      this.setTranslate(this.$ul, _w); // 设置指示器选中效果

      this.setDotsClass(); // 设置当前索引 item 的类名

      this.setItemClass(); // 触发结束回调

      if (change && typeof change === 'function') {
        var _idx = this.options.initIndex;

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

  }, {
    key: "setTranslate",
    value: function setTranslate(el, distance) {
      var _style = el.style;
      _style.transform = "translate3d(".concat(distance, "px, 0, 0)");
      _style.webkitTransform = "translate3d(".concat(distance, "px, 0, 0)");
    }
    /**
     * 设置循环播放
     * @param {boolean} isLoop 是否循环播放
     */

  }, {
    key: "setLoop",
    value: function setLoop(isLoop) {
      if (!isLoop) {
        // 设置 clone 节点数量为 0，不复制首尾
        this.loop.cloneNumber = 0; // 设置默认初始位置 +0

        this.loop.startIdxAdd = 0;
        return;
      }

      this.options.initIndex += this.loop.startIdxAdd; // 复制头尾两张图

      var cloneFirst = this.$li[0].cloneNode(true);
      var cloneLast = this.$li[this.$li.length - 1].cloneNode(true);
      this.$ul.insertBefore(cloneLast, this.$li[0]);
      this.$ul.appendChild(cloneFirst);
      this.$li = Array.from(this.$ul.querySelectorAll('.swipe-item'));
    }
    /**
     * 移动到指定索引位置
     * @param {number} idx
     */

  }, {
    key: "moveToPosition",
    value: function moveToPosition(idx) {
      // 无效索引值
      var maxIndex = this.swipeItemsLen - 1 - this.loop.cloneNumber;

      if (idx > maxIndex || idx < 0) {
        return;
      }

      if (this.options.loop) {
        this.options.initIndex = idx + 1;
      } else {
        this.options.initIndex = idx;
      } // 添加过渡，设置位移


      this.addTransition(this.$ul);

      var _w = -this.options.initIndex * this.swipeW;

      this.setTranslate(this.$ul, _w); // 设置选中类名

      this.setItemClass();
      this.setDotsClass();
    }
    /**
     * 初始化
     */

  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      // 容器宽度
      this.swipeW = this.swipeEl.clientWidth; // 设置ul 宽度
      // const $ul = this.swipeEl.querySelector('.swipe__container') as HTMLElement;

      this.$ul.style.width = "".concat(this.swipeW * this.$li.length, "px"); // 设置每个 li 宽度

      this.$li.forEach(function (item) {
        item.style.width = "".concat(_this2.swipeW, "px");
      });
      this.swipeItemsLen = this.$li.length; // 生成指示器

      this.initDots(); // 初始化位置

      var _w = -this.options.initIndex * this.swipeW;

      this.setTranslate(this.$ul, _w); // item 添加选中class

      this.setItemClass(); // 处理自动播放

      this.autoPlay(); // 监听切换动画结束事件

      this.$ul.addEventListener('transitionend', this.onTransEnd.bind(this), false); // 监听触摸事件

      this.swipeEl.addEventListener('touchstart', this.onTouchStart.bind(this), false);
      this.swipeEl.addEventListener('touchmove', this.onTouchMove.bind(this), false);
      this.swipeEl.addEventListener('touchend', this.onTouchEnd.bind(this), false); // 监听窗口变化

      window.addEventListener('resize', this.onResize.bind(this), false);
    } // 窗口重置事件

  }, {
    key: "onResize",
    value: function onResize() {
      this.init();
    } // 销毁事件监听

  }, {
    key: "destroyed",
    value: function destroyed() {
      this.swipeEl.removeEventListener('touchstart', this.onTouchStart.bind(this), false);
      this.swipeEl.removeEventListener('touchmove', this.onTouchMove.bind(this), false);
      this.swipeEl.removeEventListener('touchend', this.onTouchEnd.bind(this), false);
      this.$ul.removeEventListener('transitionend', this.onTransEnd.bind(this), false);
      window.removeEventListener('resize', this.onResize.bind(this), false);
    }
  }]);

  return Swipe;
}();



/***/ })
/******/ ])["default"];
});