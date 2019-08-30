import History from './history'

export default (to, from) => {
    if (History.visitedRecently(to.fullPath)) {
        const amount = History.indexOfRecentHistory(to.fullPath)

        History.back(amount)
    } else {
        /**
         * Ignore navigation to a route with the same name
         */
        if (History.ignoreRoutesWithSameName && to.name && from.name && to.name === from.name) {
            return
        }

        /**
         * Save the new route
         */
        History.push(to.fullPath)
    }
}
