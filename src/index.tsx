import React, { KeyboardEvent, ChangeEvent } from 'react';
import { Box, Button, TextInput } from 'grommet';

interface Props {
	value?: number;
	disabled?: boolean;
	min?: number;
	max?: number;
	onChange: (newValue: number | ((prev: number) => number)) => void
}

export const Stepper: React.FC<Props> = ({
	value,
	disabled = false,
	min = 0,
	max,
	onChange,
}) => {
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

	function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
		onChange(parseInt(event.target.value, 10));
	}

	return (
		<Box>
			<Button>-</Button>
			<TextInput
				value={value}
				disabled={disabled}
				onKeyPress={handleInput}
				onChange={handleInputChange}
			/>
			<Button>+</Button>
		</Box>
	);
};
