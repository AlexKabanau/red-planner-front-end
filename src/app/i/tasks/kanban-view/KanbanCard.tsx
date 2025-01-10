import cn from 'clsx'
import { GripVertical, Loader, Trash } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Checkbox from '@/components/ui/checkbox'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { DatePicker } from '@/components/ui/task-edit/date-piacker/DatePicker'

import { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

import { useDeleteTask } from '../hooks/useDeleteTask'
import { useTaskDebounce } from '../hooks/useTaskDebounce'

// import styles from 'react-day-picker/style.css'
import styles from './KanbanView.module.scss'

// import { cn } from 'tailwind-variants'

type Props = {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanCard({ item, setItems }: Props) {
	const { watch, register, control } = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			priority: item.priority,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt
		}
	})
	useTaskDebounce({ watch, itemId: item.id })

	const { deleteTask, isDeletePending } = useDeleteTask()
	return (
		<div
			className={cn(
				styles.card,
				{
					[styles.completed]: watch('isCompleted')
				},
				'animation-opacity'
			)}
		>
			<div className={styles.cardHeader}>
				<button aria-describedby='todo-item'>
					<GripVertical className={styles.grip} />
				</button>
				<Controller
					control={control}
					name='isCompleted'
					render={({ field: { value, onChange } }) => (
						<Checkbox
							onChange={onChange}
							checked={value}
						/>
					)}
				/>
				<TransparentField {...register('name')} />
			</div>
			<div className={styles.cardBody}>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<Checkbox
							onChange={onChange}
							checked={value || ''}
							position='left'
						/>
					)}
				/>
			</div>
		</div>
	)
}
