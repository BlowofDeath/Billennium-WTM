import React, { FC, Fragment, useState } from 'react';
import ControlledTable from '../vendor/ControlledTable/ControlledTable';
import { AdminUsersQuery } from '../../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import Panel from '../Panel/Panel';
import { Button, Backdrop } from '@material-ui/core';
import UserCreateForm, { FormData } from '../UserCreateForm/UserCreateForm';

const AdminUsersPage: FC = () => {
	const [selectedUser, setSelectedUser] = useState<FormData | undefined>(undefined);
	const { data, refetch } = useQuery(AdminUsersQuery);
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<Fragment>
			<Backdrop open={isModalVisible} onClick={() => { setIsModalVisible(false); setSelectedUser(undefined); }} style={{ zIndex: 100 }}>
				<UserCreateForm
					userData={selectedUser}
					label={{
						edit: "Edytuj użytkownika",
						create: "Dodawanie użytkownika"
					}}
					buttonText={{
						edit: "Aktualizuj",
						create: "Dodaj"
					}}
					onCreateUser={(data: FormData, error: any) => { refetch() }}/>
			</Backdrop>
			<Panel>
				{ data && <ControlledTable
							data={data.users}
							onSelect={(user: FormData) => {
								setSelectedUser({ ...user, password: "" })
								setIsModalVisible(true);
							}}
							onCreate={() => { setIsModalVisible(true) }}
							createButton={ <Button variant="outlined" color="primary">Nowy użytkownik</Button> }/> }
			</Panel>
		</Fragment>
	)
}

export default AdminUsersPage;