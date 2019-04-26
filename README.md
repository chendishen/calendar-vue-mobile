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
```html
<Datepicker ref="Datepicker" :options="options" @change="clock"></Datepicker>
```

```js
import Datepicker from 'calendar-vue-mobile'
components: {
    Datepicker:calendar.VueDatepicker
}
```





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
