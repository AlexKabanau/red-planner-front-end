import { IBase } from './root.type'

export enum EnumTaskPriority {
	low = 'low',
	medium = 'medium',
	high = 'high'
}

export interface ITaskResponse extends IBase {
	name: string
	priority?: EnumTaskPriority // low, medium, high
	isCompleted: boolean
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>
