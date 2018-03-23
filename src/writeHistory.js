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
        History.push(to.fullPath)
    }
}
