import React from 'react';
import { render, screen } from '@testing-library/react';
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
	expect(screen.getByDisplayValue('0')).not.toBeDisabled();

	rerender((
		<Grommet>
			<Stepper {...baseProps} disabled />
		</Grommet>
	));
	expect(screen.getByDisplayValue('0')).toBeDisabled();
});
