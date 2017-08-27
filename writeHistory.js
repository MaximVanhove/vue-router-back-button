import History from './history'

export default (to, from) => {
    if (!History.visitedRecently(to.fullPath)) {
        /**
         * Save the new route
         */
        History.push(to.fullPath)
    } else {
        const amount = History.indexOfRecentHistory(to.fullPath)

        History.back(amount)
    }
}
