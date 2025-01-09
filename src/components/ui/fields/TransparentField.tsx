import cn from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'

type TransparentFieldType = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<
	HTMLInputElement,
	TransparentFieldType
>(({ className, ...rest }, ref) => {
	return (
		<input
			className={cn(
				'bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full',
				className
			)}
			ref={ref}
			{...rest}
		/>
	)
})

TransparentField.displayName = 'TransparentField'
