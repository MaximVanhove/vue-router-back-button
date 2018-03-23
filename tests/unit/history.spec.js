import { routerHistory } from '@/index'

describe('empty history', () => {
    test('it returns an empty history stack', () => {
        expect(routerHistory.getHistory()).toEqual([])
    })

    test('it can write history', () => {
        routerHistory.push('/home')
        routerHistory.push('/contact')

        expect(routerHistory.getHistory()).toContain('/home')
        expect(routerHistory.getHistory()).toContain('/contact')
    })

    test('it can reset the history', () => {
        routerHistory.push('/about')

        routerHistory.reset()

        expect(routerHistory.getHistory()).toEqual([])
    })
})

describe('filled history stack', () => {
    beforeEach(() => {
        routerHistory.reset()
        routerHistory.push('/step-1')
        routerHistory.push('/step-2')
        routerHistory.push('/step-3')
    })

    test('it has history', () => {
        expect(routerHistory.hasHistory()).toBeTruthy()
    })

    test('it can check if it can go back', () => {
        expect(routerHistory.hasPrevious()).toBeTruthy()
    })

    test('it can go back', () => {
        routerHistory.push('/step-4')
        routerHistory.push('/step-5')

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
