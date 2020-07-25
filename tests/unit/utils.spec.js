import removeParameterFromUrl from '@/utils/removeParameterFromUrl'

describe('removeParameterFromUrl', () => {
	const someUrl = '/some-url'
    test('it removes query parameter when present', () => {
		const url = removeParameterFromUrl(someUrl + '?replaceRoute=true', 'replaceRoute')
        expect(url).toEqual(someUrl)
	})

	test('it removes the correct query parameter when more than 1 query param is present ', () => {
		const url = removeParameterFromUrl(someUrl + '?replaceRoute=true&someParam=1', 'replaceRoute')
        expect(url).toEqual(someUrl + '?someParam=1')
	})

	test('it removes the correct query parameter when more than 1 query param is present and param to replace is last ', () => {
		const url = removeParameterFromUrl(someUrl + '?someParam=1&replaceRoute=true', 'replaceRoute')
        expect(url).toEqual(someUrl + '?someParam=1')
	})

	test('it removes the correct query parameter when more than 1 query param is present and param to replace is not first and not last ', () => {
		const url = removeParameterFromUrl(someUrl + '?someParam=1&replaceRoute=true&someOtherParam=2', 'replaceRoute')
        expect(url).toEqual(someUrl + '?someParam=1&someOtherParam=2')
	})
})
