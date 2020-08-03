import { routerHistory } from '@/index'

let push = (path) => {
    window.history.pushState({}, '', path)
    routerHistory.push(path)
}

describe('empty history', () => {
    beforeEach(() => {
        routerHistory.reset()
    })

    test('it returns an empty history stack', () => {
        expect(routerHistory.getHistory()).toEqual([])
    })

    test('it can write history', () => {
        push('/home')
        push('/contact')

        expect(routerHistory.getHistory()).toContain('/home')
        expect(routerHistory.getHistory()).toContain('/contact')
    })

    test('it can reset the history', () => {
        push('/about')

        routerHistory.reset()

        expect(routerHistory.getHistory()).toEqual([])
    })
})

describe('filled history stack', () => {
    beforeEach(() => {
        routerHistory.reset()
        push('/step-1')
        push('/step-2')
        push('/step-3')
    })

    test('it has history', () => {
        expect(routerHistory.hasHistory()).toBeTruthy()
    })

    test('it can check if it can go back', () => {
        expect(routerHistory.hasPrevious()).toBeTruthy()
    })

    test('it can go back', () => {
        push('/step-4')
        push('/step-5')

        routerHistory.back(1)

        expect(routerHistory.current().path).toEqual('/step-4')
    })

    test('it can check if it can go forward', () => {
        routerHistory.back(1)

        expect(routerHistory.hasForward()).toBeTruthy()
    })

    test('it can go forward', () => {
        routerHistory.back(1)

        routerHistory.forward(1)

        expect(routerHistory.current().path).toEqual('/step-3')
    })
})
