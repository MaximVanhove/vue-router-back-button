# Vue router back button
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

You can add this anywhere in your app as $routerHistory is installed globally. If you can't go back, $routerHistory.previous().path will return null.


```
<router-link
    v-if="$routerHistory.hasHistory()"
    :to="{ path: $routerHistory.previous().path }">
    GO BACK
</router-link>
```
