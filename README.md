# swipe

A lighter swipe component based on typescript features & vanilla js


## Installing

```
$ npm install @autots/swipe -S
```

Using yarn:

```
$ yarn add @autots/swipe
```

## Example


### layouts

```
<section id="swipe-demo1" class="swipe">
  <ul class="swipe__container">
    <li class="swipe-item">
      <img src="" alt="">
    </li>
    <li class="swipe-item">
      <img src="" alt="">
    </li>
  </ul>
</section>

<section id="swipe-demo2" class="swipe">
  <div class="swipe__container">
    <div class="swipe-item">
      <img src="" alt="">
    </div>
    <div class="swipe-item">
      <img src="" alt="">
    </div>
  </div>
</section>
```

### import as a module

```
import Swipe from '@autots/swipe';

new Swipe('#swipe-demo1', {
  initIndex: 1,
  autoPlay: 3000,
  showDots: true,
  change: (index) => {}
});
```

### import as a lib

```
<script src="dist/swipe.browser.min.js"></script>

<script>
  const $swipe = document.querySelector('#swipe-demo2');
  var demo = new AutoTs.Swipe($swipe, {
    showDots: true,
    loop: false,
  });

  setTimeout(() => {
    demo.moveTo(2);
  }, 2000)
</script>
```

## Config

| Name | Type | Default | Optional | Description |
|:--|:--|:--|:--|:--|
| el | (string or NodeListOf<Element>) | - | No | - |
| initIndex | Number | 0 | Yes | Index of initial swipe, start from 0 |
| loop | Boolean | true | Yes | Whether to enable loop |
| autoPlay | Number | - | Yes | Autoplay interval (ms) |
| showDots | Boolean | false | Yes | Whether to show indicators |
| change | Function | - | Yes | Triggered when current swipe change end |

## Events

| Event Name | Description | Params |
|:--|:--|:--|
| moveTo `v0.0.2` | Move to the specified index position | index |

