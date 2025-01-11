import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { IPomodoroRoundResponse } from '@/types/pomodoro.types'

import { ITimerState } from '../timer.types'

import { useLoadSettings } from './useLoadSettings'
import { pomodoroService } from '@/services/pomodoro.service'

export function useTodaySession({
	setActiveRound,
	setSecondsLeft
}: ITimerState) {
	const { workInterval } = useLoadSettings()
	const {
		data: sessiosResponse,
		isLoading,
		refetch,
		isSuccess
	} = useQuery({
		queryKey: ['get today session'],
		queryFn: () => pomodoroService.getTodaySession()
	})

	const rounds = sessiosResponse?.data.rounds

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted)

			setActiveRound(activeRound)

			if (activeRound && activeRound?.totalSeconds !== 0) {
				setSecondsLeft(workInterval - activeRound.totalSeconds)
			}
		}
	}, [isSuccess, rounds])

	return { sessiosResponse, isLoading, refetch, isSuccess }
}
