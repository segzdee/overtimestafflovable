import React from 'react';
import { Staff } from '../types';

interface Props {
	staff: Staff[];
}

const ShiftWorkerDashboard: React.FC<Props> = ({ staff }) => {
	return (
		<div>
			<h1>Shift Worker Dashboard</h1>
			<ul>
				{staff.map((worker) => (
					<li key={worker.id}>{worker.name}</li>
				))}
			</ul>
		</div>
	);
};

export default ShiftWorkerDashboard;
