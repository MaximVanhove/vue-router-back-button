import mock from 'mock-vue-router'
import { routerHistory, writeHistory } from '@/index'

const routes = [
    {
        path : '/home',
        name: 'home',
    },
    {
        path : '/dashboard',
        name: 'dashboard',
        children : [
            {
                path : 'stats',
                name: 'dashboard',
            },
            {
                path : 'map',
                name: 'dashboard',
            },
        ],
    },
    {
        path : '/index',
        name: 'index',
    },
    {
        path : '/show',
        name: 'show',
    },
    {
        path : '/edit',
        name: 'edit',
    },
]

describe('vue-router', () => {
    let $router

    beforeEach(() => {
        $router = mock(routes).$router
        $router.afterEach(writeHistory)
        routerHistory.reset()
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

    test('it can go back to routes with the same name', () => {
        routerHistory.ignoreRoutesWithSameName = false

        $router.push('/index')
        $router.push('/home')
        $router.push('/dashboard')
        $router.push('/dashboard/stats')
        $router.push('/dashboard/map')

        expect(routerHistory.previous().path).toEqual('/dashboard/stats')
    })

    test('it can ignore routes with the same name', () => {
        routerHistory.ignoreRoutesWithSameName = true

        $router.push('/index')
        $router.push('/home')
        $router.push('/dashboard')
        $router.push('/dashboard/stats')
        $router.push('/dashboard/map')

        expect(routerHistory.previous().path).toEqual('/home')
    })

    test('it takes you forward', () => {
        $router.push('/index')
        $router.push('/show')
        $router.push('/edit')
        $router.push('/show')

        expect(routerHistory.next().path).toEqual('/edit')
    })
})
