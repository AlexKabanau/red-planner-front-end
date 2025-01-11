import { Draggable, Droppable } from '@hello-pangea/dnd'
import React, { Dispatch, SetStateAction } from 'react'

import { ITaskResponse } from '@/types/task.types'

import { FILTERS } from '../columns.data'
import { filterTasks } from '../filter-tasks'

import { KanbanAddCardInput } from './KanbanAddCardInput'
import { KanbanCard } from './KanbanCard'
import styles from './KanbanView.module.scss'

interface IKanbanColumn {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanColumn({ items, label, value, setItems }: IKanbanColumn) {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.column}>
						<div className={styles.columnHeading}>{label}</div>
					</div>

					{filterTasks(items, value)?.map((item, index) => (
						<Draggable
							key={item.id}
							draggableId={item.id.toString()}
							index={index}
						>
							{provided => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									// className=' relative'
								>
									<KanbanCard
										item={item}
										setItems={setItems}
										key={item.id}
									/>
								</div>
							)}
						</Draggable>
					))}

					{provided.placeholder}
					{value !== 'completed' && !items?.some(item => !item.id) && (
						<KanbanAddCardInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
				</div>
			)}
		</Droppable>
	)
}
