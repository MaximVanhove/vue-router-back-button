import routerHistory from './history'
import writeHistory from './writeHistory'

export {
    routerHistory,
    writeHistory
}

export default {
    install (Vue, { router }) {
        Vue.use(routerHistory)
        router.afterEach(writeHistory)
    },
}
