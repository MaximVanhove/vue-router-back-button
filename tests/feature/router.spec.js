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

    let push = (path) => {
        window.history.pushState({}, '', path)
        $router.push(path)
    }

    let replace = (path) => {
        $router.replace(path)
    }

    beforeEach(() => {
        $router = mock(routes).$router
        $router.afterEach(writeHistory)
        routerHistory.reset()
    })

    test('it can write history', () => {
        push('/index')

        expect(routerHistory.getHistory()).toContain('/index')
    })

    test('it goes back where you actually came from', () => {
        push('/index')
        push('/show')
        push('/edit')
        push('/show')

        expect(routerHistory.previous().path).toEqual('/index')
    })

    test('it ignores the route when it was replaced', () => {
        push('/index')
        push('/show')
        replace('/edit')

        expect(routerHistory.previous().path).toEqual('/index')
    })

    test('it can go back to routes with the same name', () => {
        routerHistory.ignoreRoutesWithSameName = false

        push('/index')
        push('/home')
        push('/dashboard')
        push('/dashboard/stats')
        push('/dashboard/map')

        expect(routerHistory.previous().path).toEqual('/dashboard/stats')
    })

    test('it can ignore routes with the same name', () => {
        routerHistory.ignoreRoutesWithSameName = true

        push('/index')
        push('/home')
        push('/dashboard')
        push('/dashboard/stats')
        push('/dashboard/map')

        expect(routerHistory.previous().path).toEqual('/home')
    })

    test('it takes you forward', () => {
        push('/index')
        push('/show')
        push('/edit')
        push('/show')

        expect(routerHistory.next().path).toEqual('/edit')
    })

    test('it rewrites history when you go forward', () => {
        push('/1')
        push('/1.1')
        push('/2')

        push('/1.1')
        push('/1')
        push('/2')

        expect(routerHistory.previous().path).toEqual('/1')
        expect(routerHistory.next().path).toEqual(undefined)
    })
})
