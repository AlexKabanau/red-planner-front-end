import axios from 'axios'
import { type CreateAxiosDefaults } from 'axios'

import { errorCatch } from './error'
import {
	getAccessToken,
	removeFromStorage
} from '@/services/auth-tokent.service'
import { authService } from '@/services/auth.service'

const optins: CreateAxiosDefaults = {
	baseURL: 'http://localhost:4200/api',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosClassic = axios.create(optins)
const axiosWithAuth = axios.create(optins)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewToken()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeFromStorage()
			}
		}

		throw error
	}
)

export { axiosClassic, axiosWithAuth }
