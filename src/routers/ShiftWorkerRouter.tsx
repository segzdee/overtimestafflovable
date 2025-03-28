
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShiftWorkerDashboard from '../components/ShiftWorkerDashboard';
import { mockStaffData } from '../data/mockStaffData';

const ShiftWorkerRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<ShiftWorkerDashboard staff={mockStaffData} />} />
			{/* Add more routes as needed */}
		</Routes>
	);
};

export default ShiftWorkerRouter;
