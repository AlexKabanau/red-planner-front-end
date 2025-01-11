import React from 'react'

import { useTimer } from './hooks/useTimer'
import { useTimerActions } from './hooks/useTimerActions'
import { useTodaySession } from './hooks/useTodaySession'

export default function Pomodoro() {
	const timerState = useTimer()
	const { isLoading, isSuccess, refetch, sessiosResponse } =
		useTodaySession(timerState)
	const rounds = sessiosResponse?.data.rounds
	const actions = useTimerActions({ ...timerState, rounds })
	return (
		<div className='relative w-80 text-center'>
			{!isLoading && <div className='text-7xl font-semibold'>formatTime{}</div>}
		</div>
	)
}
