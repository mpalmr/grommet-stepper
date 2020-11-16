import React, { KeyboardEvent } from 'react';
import { Box, Button, TextInput } from 'grommet';
import { DeincrementIcon, IncrementIcon } from './icons';

export interface StepperProps {
	value: number;
	disabled?: boolean;
	min?: number;
	max?: number;
	onChange: (newValue: number | ((prev: number) => number)) => void
}

export const Stepper: React.FC<StepperProps> = ({
	value,
	disabled = false,
	min = 0,
	max,
	onChange,
}) => {
	function shift(step: number): void {
		onChange(value + step);
	}

	function handleInput(event: KeyboardEvent<HTMLInputElement>): void {
		function block(): void {
			event.preventDefault();
			event.stopPropagation();
		}

		const el = event.target as HTMLInputElement;
		const inputValue = el.value.trim();
		if (!Number.isInteger(inputValue)) block();
		else {
			const parsedValue = parseInt(inputValue, 10);
			const isMinInvalid = min != null && parsedValue < min;
			const isMaxInvalid = max != null && parsedValue > max;
			if (isMinInvalid || isMaxInvalid) block();
		}
	}

	return (
		<Box>
			<Button
				a11yTitle="Deincrement"
				disabled={disabled || value < min}
				onClick={() => shift(-1)}
			>
				<DeincrementIcon />
			</Button>
			<TextInput
				value={value}
				disabled={disabled}
				onKeyPress={handleInput}
				onChange={event => {
					console.log(parseInt(event.target.value, 10));
					return onChange(parseInt(event.target.value, 10));
				}}
			/>
			<Button
				a11yTitle="Increment"
				disabled={disabled || (max != null && value > max)}
				onClick={() => shift(1)}
			>
				<IncrementIcon />
			</Button>
		</Box>
	);
};
