# calendar-vue-mobile

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)  [![downloads](https://img.shields.io/npm/dt/calendar-vue-mobile.svg)](https://www.npmjs.com/package/calendar-vue-mobile)

> A calendar that can be used with cube-ui

### Install

```shell
npm install calendar-vue-mobile --save
```


### Usage
```js
import Calendar from 'calendar-vue-mobile'
Vue.use(Calendar);
```

```js
import Datepicker from 'calendar-vue-mobile'
components: {
    Datepicker:calendar.VueDatepicker
}
```
### example
You can find examples in calendar-vue-mobile/src/demo/ , There are specific ways to use the calendar.

### 例子
你可以在 calendar-vue-mobile/src/demo/ 路径下找到例子，里边有该日历的具体应用方式

| 属性        | 类型           | 说明  |
| ------------- |:-------------:| -------------------------------:|
| options       | Object        | 具体参数说明：curtime：""时，获取当前时间；format: "yyyy-mm-dd"，时间格式；isHideOtherday：false,是否禁止选择未标记的日期 |
|               |     []     |  参数_markList:[{date:"2012-12-12",className:"label1"}]，自定义class选择器样式，用以标记时间  |
|               |          |    |

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
