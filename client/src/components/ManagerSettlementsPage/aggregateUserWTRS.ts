interface Project {
	wtrsPerMonth: Array<{
		from: 	string;
		to: 	string;
	}>
}

interface User {
	id: 		string;
	first_name: string;
	last_name: 	string;
	role: 		'Pracownik' | 'Kierownik' | 'Admin';
	projects: 	Project[];
}

export const aggregateUserWTRS = (users: Array<User>) => {
	const data: any = users.filter((user: User) => user.role === 'Pracownik')
	.map((user: User) => {
		let wtrs: any = [];
		user.projects.forEach((project: Project) => {
			wtrs.push(...project.wtrsPerMonth);
		})
		return { ...user, workTimeRecords: wtrs };
	});
	
	return data;
}