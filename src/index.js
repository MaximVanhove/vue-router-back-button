import routerHistory from './history'
import writeHistory from './writeHistory'

export {
    routerHistory,
    writeHistory
}

export default {
    install (Vue, { router, ignoreRoutesWithSameName }) {
        Vue.use(routerHistory, { ignoreRoutesWithSameName })
        router.afterEach(writeHistory)
    },
}
