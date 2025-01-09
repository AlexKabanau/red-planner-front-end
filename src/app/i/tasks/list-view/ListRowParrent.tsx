import { Draggable, Droppable } from '@hello-pangea/dnd'
import React, { Dispatch, SetStateAction } from 'react'

import { ITaskResponse } from '@/types/task.types'

import { FILTERS } from '../columns.data'
import { filterTasks } from '../filter-tasks'

import { ListAddRowInput } from './ListAddRowInput'
import { ListRow } from './ListRow'
import styles from './ListView.module.scss'

interface IListRowParrent {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListRowParrent({
	items,
	label,
	value,
	setItems
}: IListRowParrent) {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.colHeading}>
						<div className='w-full'>{label}</div>
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
									className=' relative'
								>
									<ListRow
										item={item}
										setItems={setItems}
										key={item.id}
									/>
								</div>
							)}
						</Draggable>
					))}

					{provided.placeholder}
					{value !== 'today' && !items?.some(item => !item.id) && (
						<ListAddRowInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
				</div>
			)}
		</Droppable>
	)
}
