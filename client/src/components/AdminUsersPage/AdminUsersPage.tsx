import React, { FC, Fragment, useState } from 'react';
import ControlledTable from '../vendor/ControlledTable/ControlledTable';
import { AdminUsersQuery } from '../../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import Panel from '../Panel/Panel';
import { Button, Backdrop } from '@material-ui/core';
import UserCreateForm, { FormData } from '../UserCreateForm/UserCreateForm';
import { ApolloError } from 'apollo-boost';

const AdminUsersPage: FC = () => {
	const [selectedUser, setSelectedUser] = useState<FormData | undefined>(undefined);
	const { data } = useQuery(AdminUsersQuery);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const _handleCreateOrUpdate = (data: FormData, error: ApolloError, loading: boolean, called: boolean) => {
		if (!loading && (data || error)) {
			setIsModalVisible(false);
			setSelectedUser(undefined);
		}
	}

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
					onCreateUser={_handleCreateOrUpdate}
					onUpdateUser={_handleCreateOrUpdate}/>
			</Backdrop>
			<Panel>
				{ data && <ControlledTable
							data={data.users}
							onSelect={(user: FormData) => {
								setSelectedUser({ ...user, password: "" })
								setIsModalVisible(true);
							}}
							onCreate={(e) => { setIsModalVisible(true) }}
							createButton={ <Button variant="outlined" color="primary">Nowy użytkownik</Button> }
							map={{
								first_name: "Imię",
								last_name: "Nazwisko",
								__typename: "Typ",
								role: "Rola",
								email: "Email",
								isActive: "Aktywny"
							}}
							booleans={{
								true: "Tak",
								false: "Nie"
							}}/> }
			</Panel>
		</Fragment>
	)
}

export default AdminUsersPage;