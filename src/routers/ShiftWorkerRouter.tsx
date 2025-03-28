import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShiftWorkerDashboard from '../components/ShiftWorkerDashboard';

const ShiftWorkerRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<ShiftWorkerDashboard />} />
			{/* Add more routes as needed */}
		</Routes>
	);
};

export default ShiftWorkerRouter;
