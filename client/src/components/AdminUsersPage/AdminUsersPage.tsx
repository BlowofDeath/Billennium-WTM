import React, { FC, Fragment, useState } from 'react';
import ControlledTable from '../vendor/ControlledTable/ControlledTable';
import { AdminUsersQuery } from '../../queries';
import { useQuery } from '@apollo/react-hooks';
import Panel from '../Panel/Panel';
import { Button, Backdrop } from '@material-ui/core';
import UserCreateForm from '../UserCreateForm/UserCreateForm';

const AdminUsersPage: FC = () => {
	const { data, loading, error } = useQuery(AdminUsersQuery);
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<Fragment>
			<Backdrop open={isModalVisible} onClick={() => { setIsModalVisible(false) }} style={{ zIndex: 100 }}>
				<UserCreateForm />
			</Backdrop>
			<Panel>
				{ data && <ControlledTable
							data={data.users}
							onSelect={console.log}
							onDelete={console.log}
							onCreate={() => { setIsModalVisible(true) }}
							createButton={ <Button variant="outlined" color="primary">Nowy użytkownik</Button> }/> }
			</Panel>
		</Fragment>
	)
}

export default AdminUsersPage;