import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Grommet } from 'grommet';
import { Stepper } from '..';

const onChange = jest.fn();

const baseProps = {
	value: 0,
	onChange,
};

afterEach(() => {
	onChange.mockClear();
});

test('Disabled state', () => {
	const { rerender } = render((
		<Grommet>
			<Stepper {...baseProps} />
		</Grommet>
	));

	const input = screen.getByDisplayValue('0');
	const buttons = screen.getAllByRole('button');

	expect(input).not.toBeDisabled();
	buttons.forEach(button => {
		expect(button).not.toBeDisabled();
	});

	rerender((
		<Grommet>
			<Stepper {...baseProps} disabled />
		</Grommet>
	));

	expect(input).toBeDisabled();
	buttons.forEach(button => {
		expect(button).toBeDisabled();
	});
});

test('Value prop is displayed in input', () => {
	render((
		<Grommet>
			<Stepper {...baseProps} value={6} />
		</Grommet>
	));

	expect(screen.getByDisplayValue('6')).toBeInTheDocument();
});

test('Deincrement button', () => {
	render((
		<Grommet>
			<Stepper {...baseProps} value={4} />
		</Grommet>
	));

	expect(onChange).not.toHaveBeenCalled();
	fireEvent.click(screen.getAllByRole('button')[0]);
	expect(onChange).toHaveBeenCalledWith(3);
});

test('Increment button', () => {
	render((
		<Grommet>
			<Stepper {...baseProps} value={4} />
		</Grommet>
	));

	expect(onChange).not.toHaveBeenCalled();
	fireEvent.click(screen.getAllByRole('button')[1]);
	expect(onChange).toHaveBeenCalledWith(5);
});

test('Minimum value', () => {
	const { rerender } = render((
		<Grommet>
			<Stepper {...baseProps} min={3} value={3} />
		</Grommet>
	));

	const textInput = screen.getByDisplayValue('3');
	const buttons = screen.getAllByRole('button');

	expect(textInput).not.toBeDisabled();
	buttons.forEach(button => {
		expect(button).not.toBeDisabled();
	});

	rerender((
		<Grommet>
			<Stepper {...baseProps} min={4} value={3} />
		</Grommet>
	));

	expect(textInput).not.toBeDisabled();
	expect(buttons[0]).toBeDisabled();
	expect(buttons[1]).not.toBeDisabled();
});

test('Maximum value', () => {
	const { rerender } = render((
		<Grommet>
			<Stepper {...baseProps} max={3} value={3} />
		</Grommet>
	));

	const textInput = screen.getByDisplayValue('3');
	const buttons = screen.getAllByRole('button');

	expect(textInput).not.toBeDisabled();
	buttons.forEach(button => {
		expect(button).not.toBeDisabled();
	});

	rerender((
		<Grommet>
			<Stepper {...baseProps} max={2} value={3} />
		</Grommet>
	));

	expect(textInput).not.toBeDisabled();
	expect(buttons[0]).not.toBeDisabled();
	expect(buttons[1]).toBeDisabled();
});

describe.skip('KeyPress events on <TextInput />', () => {
	test('Does not register non-integer values', () => {
		const { container } = render((
			<Grommet>
				<Stepper {...baseProps} value={5} />
			</Grommet>
		));

		const textInput = container.querySelector('input') as HTMLInputElement;
		expect(onChange).not.toHaveBeenCalled();
		userEvent.type(textInput, '{space}');
		expect(onChange).not.toHaveBeenCalled();
		userEvent.type(textInput, '.');
		expect(onChange).not.toHaveBeenCalled();
		userEvent.type(textInput, '3');
		expect(onChange).toHaveBeenCalledWith(53);
	});
});
