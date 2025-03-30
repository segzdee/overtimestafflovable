export interface Staff {
	id: string | number;
	name: string;
	role?: string;
	location?: string;
	country?: string;
	region?: string;
	verified?: boolean;
	positions?: string[];
	ratings?: {
		clientRating: number;
		reliability: number;
		cancellations: number;
		lateArrivals: number;
		swaps: number;
		avgHourlyRate: number;
	};
}

export interface Shift {
	id: string;
	date: string;
	staffId: string;
}

export interface User {
	id: string;
	username: string;
	email: string;
}
