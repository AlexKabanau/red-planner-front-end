'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { TypeTimeBlockFormState } from '@/types/time-block.types'

import TimeBlockingForm from './form/TimeBlockingForm'

export default function TimeBlocking() {
	const methods = useForm<TypeTimeBlockFormState>()
	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
				{/* <TimeBlockingList /> */}
				<TimeBlockingForm />
			</div>
		</FormProvider>
	)
}
