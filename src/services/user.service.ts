import { axiosWithAuth } from '@/api/interceptors'

import { IUser, TypeUserForm } from '@/type/auth.types'

export interface IProfileResponse {
	user: IUser
	statistics: {
		labe: string
		value: string
	}[]
}

class UserService {
	private BASE_URL = '/user/profile'

	async getUserProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)
		return response.data
	}

	async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put(this.BASE_URL, data)
		return response.data
	}
}
