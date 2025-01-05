import {
	useIsFetching,
	useIsMutating,
	useMutation
} from '@tanstack/react-query'
import React from 'react'

import Loader from '@/components/ui/Loader'

export function GlobalLoader() {
	const isMutating = useIsMutating()
	const isFeatching = useIsFetching()
	return isMutating || isFeatching ? (
		<div className='fixed top-layout right-layout z-50'>
			<Loader />
		</div>
	) : null
}
