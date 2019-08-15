# aapi-request-signer
Sign requests to the Amazon API

## Usage
	const signer = require('./index.js');
	
	signer.buildSignature({
		keyId: '********************', // {string} hex string representation of the key id
		secretKey: Buffer.from('KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKio=', 'base64'), // {string/buffer} hmac key
		method: 'GET', // {string} HTTP request method
		headers: { // {string dict} HTTP request headers
			'Accept-Language':'en-US',
			'Accept': 'application/vnd.com.amazon.api+json; type="cart.count/v1"',
			'X-Amzn-App-Id': 'name=CartAndroidClient,version=18.15.3,build=100',
			'X-Amzn-Device-Id': 'abcdef',
			'X-Amzn-Session-Id': '123-1234567-1234567',
			'X-Amzn-UBID': '123-1234567-1234567'
		},
		path: '/shop/marketplaces/ATVPDKIKX0DER/cart/count', // {string} HTTP request path
		query: '', // {string} HTTP request querystring
		time: new Date() // {Date} time of signing
	});
	
&#13;

	'HmacSHA1 Time=2019-08-14T22:43:08-0700 SignedHeaders=accept;accept-language;x-amzn-app-id;x-amzn-device-id;x-amzn-session-id;x-amzn-ubid Signature=ab02724c88671cec6ada773a3a28ab3c97f00331/********************'
