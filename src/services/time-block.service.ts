import { axiosWithAuth } from '@/api/interceptors'

import {
	ITimeBlockResponse,
	TypeTimeBlockFormState
} from '@/type/time-block.types'

class TimeBlockService {
	private BASE_URL = '/user/tine-blocks'

	async getTimeBlocks() {
		const response = await axiosWithAuth.get<ITimeBlockResponse>(this.BASE_URL)

		return response
	}
	async createTimeBlock(data: TypeTimeBlockFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)

		return response
	}

	async updateOrderTimeBlock(ids: string[]) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/update-order`, {
			ids
		})
		return response
	}

	async updateTimeBlock(id: string, data: TypeTimeBlockFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteTimeBlock(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
	// ... other methods for time-block operations
}

export const timeBlockService = new TimeBlockService()