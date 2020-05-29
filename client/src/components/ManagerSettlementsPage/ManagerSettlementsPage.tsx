import React, { FC, useContext } from 'react'
import Page from '../Page/Page';
import { useQuery } from '@apollo/react-hooks';
import { ManagerSettlementsQuery } from '../../graphql/queries';
import moment from 'moment';
import { Context } from '../App/Context';
import SettlementsList from '../SettlementsList/SettlementsList';
import Loader from '../Loader/Loader';
import Panel from '../vendor/Panel/Panel';
import { useLocation } from 'react-router-dom';
import { Row } from '../Atoms/Row';

const ManagerSettlementPage: FC = ({}) => {
	const { search } = useLocation();
	const query = new URLSearchParams(search);
	const now = moment();
	const year = query.get('year') ? parseInt(query.get('year') as string) : now.year();
	const month = query.get('month') ? parseInt(query.get('month') as string) : now.month() + 1;

	const { token } = useContext(Context);
	const { data, loading, error } = useQuery(ManagerSettlementsQuery, {
		variables: {
			year, month, token
		}
	});

	console.log({ data });
	
	if (loading)
		return <Loader loading={true}/>;
	if (error)
		return <span>Error...</span>;
	if (data?.monthForAllUsers.length === 0)
		return <span>No result case</span>;

	return (
		<Page>
			<h2>Rozliczenia</h2>
			<Panel>
				<Row>
					<h3>Miesiąc - {month}</h3>
					<span>{ data?.monthForAllUsers.isClosed ? "ZAMKNIĘTY" : "OTWARTY" }</span>
				</Row>
			</Panel>
			<Panel>
				<h3>Oczekujące</h3>
				<SettlementsList settlements={data.monthForAllUsers}/>
			</Panel>
			<Panel>
				<h3>Zaległe</h3>
			</Panel>
		</Page>
	)
}

export default ManagerSettlementPage;