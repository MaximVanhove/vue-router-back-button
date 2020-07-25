import History from './history'
import removeParameterFromUrl from './utils/removeParameterFromUrl'

export default (to, from) => {
	const fullPath = removeParameterFromUrl(to.fullPath, 'replaceRoute')
    if (History.visitedRecently(fullPath)) {
        const amount = History.indexOfRecentHistory(fullPath)

        History.back(amount)
    } else {
        /**
         * Ignore navigation to a route with the same name
         */
        if (History.ignoreRoutesWithSameName && to.name && from.name && to.name === from.name) {
            return
		}

		if (to && to.query && to.query.replaceRoute) {
			/**
			 * Replace the last route
			 */
			History.replace(fullPath)
			return
		}

        /**
         * Save the new route
         */
        History.push(fullPath)
    }
}
