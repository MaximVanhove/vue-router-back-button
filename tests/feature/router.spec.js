import mock from 'mock-vue-router'
import { routerHistory, writeHistory } from '@/index'

const routes = [
    '/home',
    '/index',
    '/show',
    '/edit'
]

describe('vue-router', () => {
    let $router

    beforeEach(() => {
        $router = mock(routes).$router
        $router.afterEach(writeHistory)
    })

    test('it can write history', () => {
        $router.push('/index')

        expect(routerHistory.getHistory()).toContain('/index')
    })

    test('it goes back where you actually came from', () => {
        $router.push('/index')
        $router.push('/show')
        $router.push('/edit')
        $router.push('/show')

        expect(routerHistory.previous().path).toEqual('/index')
    })

    test('it takes you forward', () => {
        $router.push('/index')
        $router.push('/show')
        $router.push('/edit')
        $router.push('/show')

        expect(routerHistory.next().path).toEqual('/edit')
    })
})
