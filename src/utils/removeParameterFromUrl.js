// REFERENCE: https://stackoverflow.com/a/25214672
export default function removeParameterFromUrl(url, parameter) {
	return url
		.replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
		.replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
}
