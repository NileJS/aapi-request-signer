const crypto = require('crypto');

const AAPIRequestSigner = {
	buildSignature: function (params) {
		const algorithm = 'HmacSHA1';
		const formattedTime = formatDate(params.time);
		const headers = Object.keys(params.headers).map(k => k.toLowerCase()).sort((a, b) => a.localeCompare(b)).join(';');
		
		const data = [
			params.method,
			formattedTime,
			params.keyId,
			algorithm,
			params.path,
			params.query,
			...Object.entries(params.headers).sort((a, b) => a[0].localeCompare(b[0])).map(e => e[0].toLowerCase() + ':' + e[1]),
			headers
		].join('\n');
		
		const signature = sign(data, params.secretKey);
		
		return `${algorithm} Time=${formattedTime} SignedHeaders=${headers} Signature=${signature}/${params.keyId}`;
	}
}

function sign(data, secretKey) {
	return crypto.createHmac('sha1', secretKey).update(data).digest('hex');
}

function formatDate(time) {
	const tzo = -time.getTimezoneOffset(),
		dif = tzo >= 0 ? '+' : '-',
		pad = function(num) {
			var norm = Math.floor(Math.abs(num));
			return (norm < 10 ? '0' : '') + norm;
		};
	return time.getFullYear() +
		'-' + pad(time.getMonth() + 1) +
		'-' + pad(time.getDate()) +
		'T' + pad(time.getHours()) +
		':' + pad(time.getMinutes()) +
		':' + pad(time.getSeconds()) +
		dif + pad(tzo / 60) + pad(tzo % 60);
}

module.exports = AAPIRequestSigner;