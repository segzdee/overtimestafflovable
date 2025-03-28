export interface Staff {
	id: string;
	name: string;
	role: string;
}

export interface Shift {
	id: string;
	date: string;
	staffId: string;
}
