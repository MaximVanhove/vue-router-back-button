# Vue router back button

 [![npm](https://img.shields.io/npm/dt/vue-router-back-button.svg)](https://www.npmjs.com/package/vue-router-back-button)  [![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/MaximVanhove/vue-router-back-button.svg)](https://github.com/MaximVanhove/vue-router-back-button) [![GitHub stars](https://img.shields.io/github/stars/MaximVanhove/vue-router-back-button.svg?style=social&logo=github&label=Stars)](https://github.com/MaximVanhove/vue-router-back-button)


A simple VueJS package to extend vue-router with a back button.

## Why? I could just add "history.back()"
Sure thing, but the in browser history does not account for programatic navigation. This is where vue-router-back-button comes in. This package does not just sends you to the previous route. Instead it tracks your navigation and sends you back to where you came from.

### Regular
Overview page > show page > edit page
After save, a programatic navigation to show page > go back will take you to **edit page**

### Vue-router-back-button
Overview page > show page > edit page
After save, a programatic navigation to show page > go back will take you to **overview page** as intented

## Dependencies
- vue >2.3.3
- vue-router >2.6.0

## Setup
```
npm install vue-router-back-button --save-dev
```

Tell Vue to use routerHistory and add writeHistory as Global After Hook.

```
import Vue from 'vue'
import Router from 'vue-router'
import { routerHistory, writeHistory } from 'vue-router-back-button'

Vue.use(Router)
Vue.use(routerHistory)

const router = new Router({
    routes: []
})

router.afterEach(writeHistory)
```

## Usage

### Going back

You can add this anywhere in your app as $routerHistory is installed globally. If you can't go back, $routerHistory.previous().path will return null.

```
<router-link
    v-if="$routerHistory.hasPrevious()"
    :to="{ path: $routerHistory.previous().path }">
    GO BACK
</router-link>
```

### Going forward

If you went back, you might want to undo that action right? Well now you can go forward as well!

```
<router-link
    v-if="$routerHistory.hasForward()"
    :to="{ path: $routerHistory.next().path }">
    GO FORWARD
</router-link>
```

## Documentation


| Function | Description |
| -------- |-------------|
| previous () | Returns the previous visited path in an object |
| hasPrevious() | Returns true if the user can go back |
| next () | Returns the next visited path in an object, this happens when a user went back |
| hasForward () | Returns true if the user can go forward |
|  |  |

## TODO

- Add an es5 build for people who sadly aren't using es6
- Add Testing

Feel free to send PR's or request new features (I'll might need to rename this to vue-router-history if you do though)

## Author

Maxim Vanhove
Web developer at [Starring Jane](https://starringjane.com)

 [![Twitter Follow](https://img.shields.io/twitter/follow/MrMaximVanhove.svg?style=social&logo=twitter&label=Follow)](https://twitter.com/MrMaximVanhove)
