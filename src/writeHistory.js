import History from './history'

export default (to, from) => {
    if (History.isInTheFuture(to.fullPath)) {
        const amount = History.howFarIntheFuture(to.fullPath)

        History.forward(amount)
    } else if (History.visitedRecently(to.fullPath)) {
        const amount = History.indexOfRecentHistory(to.fullPath)

        History.back(amount)
    } else {
        /**
         * Save the new route
         */
        if (History.ignoreSameRouteParams && to.name && from.name && to.name === from.name) return
        History.push(to.fullPath)
    }
}
