import React from 'react';
import { render } from '@testing-library/react';
import { Grommet } from 'grommet';
import { DeincrementIcon, IncrementIcon } from '../icons';

test('<DeincrementIcon /> renders', () => {
	const { container } = render((
		<Grommet>
			<DeincrementIcon />
		</Grommet>
	));
	expect(container).toMatchSnapshot();
});

test('<IncrementIcon /> renders', () => {
	const { container } = render((
		<Grommet>
			<IncrementIcon />
		</Grommet>
	));
	expect(container).toMatchSnapshot();
});
