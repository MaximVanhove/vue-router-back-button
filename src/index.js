import routerHistory from './history'
import writeHistory from './writeHistory'

export {
    routerHistory,
    writeHistory
}

export default {
    install (Vue, { router, ignoreRoutesWithSameName } = {}) {
        if (!router) {
            console.error('VueRouterBackButton: router is required on install')
            return
        }

        Vue.use(routerHistory, { router, ignoreRoutesWithSameName })
        router.afterEach(writeHistory)
    },
}
