'use client'

import { Loader, Pause, Play, RefreshCcw } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/buttons/Button'

import { formatTime } from './format-time'
import { useCreateSession } from './hooks/useCreateSession'
import { useDeleteSession } from './hooks/useDeleteSession'
import { useTimer } from './hooks/useTimer'
import { useTimerActions } from './hooks/useTimerActions'
import { useTodaySession } from './hooks/useTodaySession'
import PomodoroRounds from './rounds/PomodoroRounds'

export default function Pomodoro() {
	const timerState = useTimer()
	const { isLoading, isSuccess, refetch, sessiosResponse, workInterval } =
		useTodaySession(timerState)
	const rounds = sessiosResponse?.data.rounds
	const actions = useTimerActions({ ...timerState, rounds })
	const { deleteSession, isDeletePending } = useDeleteSession(() =>
		timerState.setSecondsLeft(workInterval * 60)
	)
	const { mutate, isPending } = useCreateSession()
	return (
		<div className='relative w-80 text-center'>
			{!isLoading && (
				<div className='text-7xl font-semibold'>
					{formatTime(timerState.secondsLeft)}
				</div>
			)}
			{isLoading ? (
				<Loader />
			) : sessiosResponse?.data ? (
				<>
					<PomodoroRounds
						activeRound={timerState.activeRound}
						nextRoundHandler={actions.nextRoundHandler}
						prevRoundHandler={actions.prevRoundHandler}
						rounds={rounds}
					/>
					<button
						className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
						onClick={
							timerState.isRunning ? actions.pauseHandler : actions.playHandler
						}
						disabled={actions.isUpdateRoundPending}
					>
						{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button>
					<button
						onClick={() => {
							timerState.setIsRunning(false)
							deleteSession(sessiosResponse.data.id)
						}}
						className='absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity'
						disabled={isDeletePending}
					>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button
					onClick={() => mutate()}
					className='mt-1'
					disabled={isPending}
				>
					Create session
				</Button>
			)}
		</div>
	)
}