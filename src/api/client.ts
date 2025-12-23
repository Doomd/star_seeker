import axios from 'axios'

const BASE_URL = 'https://hstc-api.testing.keyholding.com/'
const API_KEY = '94962B9A-966C-43FC-8E1A-145DEAA5970C'

export const client = axios.create({
	baseURL: BASE_URL,
	headers: {
		'x-api-key': API_KEY,
		'Content-Type': 'application/json',
	},
})
