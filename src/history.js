const History = {
    /**
     * Key to set in sessionStorage
     * @type {String}
     */
    _storageKey: 'vue.router.back.button.history',

    /**
     * Fallback if sessionStorage is not available
     * @type {Array}
     */
    _history: [],

    /**
     * Current path
     * @type {Integer}
     */
    _current: -1,

    /**
     * Current path
     * @type {Integer}
     */
    _previousBrowserHistoryLength: 0,

    /**
     * Check if sessionStorage is available
     */
    useSession: (() => {
        try {
            return !!window.sessionStorage
        } catch(e) {
            return false
        }
    })(),

    /**
     * Ignore navigation to a route with the same name
     */
    ignoreRoutesWithSameName: false,

    /**
     * Install global property $routerHistory
     */
    install (Vue, { ignoreRoutesWithSameName } = {}) {
        History.ignoreRoutesWithSameName = ignoreRoutesWithSameName || false

        Object.defineProperty(Vue.prototype, '$routerHistory', {
            get () { return History }
        })
    },

    /**
     * Reset the history, mainly for testing
     */
    reset () {
        this._history = []
        this._current = -1
        this._previousBrowserHistoryLength = 0

        this.save()
    },

    /**
     * Get full history list
     * @method
     * @return {Array}
     */
    getHistory () {
        if (!this.useSession) {
            return this._history
        }

        const session = sessionStorage.getItem(this._storageKey)

        if (!session) {
            this._history = []
        } else {
            this._history = window.JSON.parse(session).history
        }

        return this._history
    },

    /**
     * Get current index
     * @method
     * @return {Array}
     */
    getCurrent () {
        if (!this.useSession) {
            return this._current
        }

        const session = sessionStorage.getItem(this._storageKey)

        if (!session) {
            this._current = -1
        } else {
            this._current = window.JSON.parse(session).current
        }

        return this._current
    },

    /**
     * Save to session
     */
    save () {
        if (this.useSession) {
            const session = window.JSON.stringify({
                history: this._history,
                current: this._current
            })

            sessionStorage.setItem(this._storageKey, session)

            return this
        }
    },

    /**
     * Get the previous path
     */
    previous () {
        const history = this.getHistory()

        if (history.length > 1) {
            return { path: history[this._current - 1] }
        }

        return { path: null }
    },

    /**
     * Get the current path
     */
    current () {
        const history = this.getHistory()

        if (history.length > 1) {
            return { path: history[this._current] }
        }

        return { path: null }
    },

    /**
     * Get the next path
     */
    next () {
        const history = this.getHistory()

        if (history.length + 1 > this._current) {
            return { path: history[this._current + 1] }
        }

        return { path: null }
    },

    /**
     * Do we have any items in the history
     */
    hasHistory () {
        const history = this.getHistory()

        return history.length > 1
    },

    /**
     * Can we go back in history?
     */
    hasPrevious () {
        const current = this.getCurrent()

        return current > 0
    },

    /**
     * Can we go forward into the future?
     */
    hasForward () {
        const current = this.getCurrent()
        const history = this.getHistory()

        return current + 1 < history.length
    },

    /**
     * Add new route to the history
     */
    push (path) {
        // Check if history length has changed since last push
        // We asume the replace function was called when not
        if (this._previousBrowserHistoryLength === window.history.length) {
            return;
        }

        this._previousBrowserHistoryLength = window.history.length

        this._history = this.getHistory()
        this._current = this.getCurrent()

        this._history.splice(this._current + 1, this._history.length)

        const currentPath = this._history[this._history.length - 1]

        if (currentPath !== path) {
            this._history.push(path)
            this._current = this._current + 1
        }

        this.save()
    },

    /**
     * User went back in history
     */
    back (amount) {
        if (amount < 0) {
            return
        }

        this._current = this.getCurrent()
        this._current = this._current - amount

        this.save()
    },

    /**
     * User went forward to the future
     */
    forward (amount) {
        if (amount < 0) {
            return
        }

        this._current = this.getCurrent()
        this._current = this._current + amount

        this.save()
    },

    /**
     * Get the recent future from history, uuh what?? =P
     */
    getTheRecentFuture () {
        const history = this.getHistory()
        const current = this.getCurrent()

        return history.slice(current + 1, current + 4)
    },

    /**
     * Get the index of recently visited route
     */
    indexOfRecentHistory (path) {
        const history = this.getHistory()
        const current = this.getCurrent()

        const recentHistory = history.slice(0, current + 1).reverse()

        return recentHistory.indexOf(path)
    },

    /**
     * Check if user visited a path recently
     * If so, the user must go back
     */
    visitedRecently (path) {
        const index = this.indexOfRecentHistory(path)

        return index !== -1
    }
}

export default History
