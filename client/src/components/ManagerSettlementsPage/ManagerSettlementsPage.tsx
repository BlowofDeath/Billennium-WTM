import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import React, { FC, useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ManagerSettlementsQuery } from '../../graphql/queries';
import { Context } from '../App/Context';
import { Column } from '../Atoms/Column';
import { CustomExpansionPanel } from '../Atoms/CustomExpansionPanel';
import { Row } from '../Atoms/Row';
import { SecondaryText } from '../Atoms/SecondaryText';
import Loader from '../Loader/Loader';
import Page from '../Page/Page';
import SettlementsList from '../SettlementsList/SettlementsList';
import Panel from '../vendor/Panel/Panel';
import { Settlement } from '../../core/Settlements';
import { AcceptButton } from '../Atoms/AcceptButton';
import { DeclineButton } from '../Atoms/DeclineButton';
import { useMonthStatusHandler } from './useMonthStatusHandler';
import { useToasts } from 'react-toast-notifications';
import { mapError } from '../../scripts/errorMap';
import { useApolloErrorHandler } from '../../hoc/useApolloErrorHandler';
import { Button } from '@material-ui/core';
import { generujpdf2 } from '../../scripts/generatorPDFperOsoba';
import { ReportPerPersonQuery } from './ReportPerPersonQuery';
import { User } from '../../core/User';
import { aggregateUserWTRS } from './aggregateUserWTRS';

const ManagerSettlementPage: FC = () => {
	const [fetchReportData, { ...reportResult }] = useLazyQuery(ReportPerPersonQuery);
	const history = useHistory();
	const { search } = useLocation();
	const query = new URLSearchParams(search);
	const now = moment();
	const year = query.get('year') ? parseInt(query.get('year') as string) : now.year();
	const month = query.get('month') ? parseInt(query.get('month') as string) : now.month() + 1;
	const { token } = useContext(Context);
	const { changeMonthStatus } = useMonthStatusHandler();
	const { data, loading, error } = useQuery(ManagerSettlementsQuery, {
		variables: {
			year, month, token
		}
	});
	const { handleError } = useApolloErrorHandler();

	useEffect(() => { handleError(error) }, [error]);
	useEffect(() => {
		const { data } = reportResult;
		if (data) {
			generujpdf2(aggregateUserWTRS(data.users), month, year);
		}
	}, [reportResult])

	if (loading)
		return <Loader loading={true}/>;
	if (error)
		return <span>Error...</span>;

	const awaits = data.monthForAllUsers.filter((month: any) => month?.status === 'AWAITING');
	const closed = data.monthForAllUsers.filter((month: any) => month?.status === 'CLOSED');
	const opened = data.monthForAllUsers.filter((month: any) => month?.status === 'OPEN');

	return (
		<Page>
			<Panel>
				<Row>
					<Column>
						<h2>Rozliczenia</h2>
						<SecondaryText>
							{ moment([year, month - 1]).format("YYYY MMMM") }
						</SecondaryText>
					</Column>
					<Row justifyContent="flex-end">
						<Column>
							<Button
								variant="outlined"
								color="primary"
								onClick={() => { fetchReportData({ variables: { month, year }}) }}>
								Raport
							</Button>
						</Column>
						<Column>
							<h3>Wybierz datę</h3>
							<DatePicker
								value={moment([year, month - 1])}
								autoOk
								views={['year', 'month']}
								openTo="year"
								onChange={(moment) => {
									let year = moment?.year() ?? now.year();
									let month = moment?.month() ?? now.month();
									history.push(`/settlements?year=${year}&month=${month + 1}`);
								}}/>
						</Column>
					</Row>
				</Row>
			</Panel>

			<Panel>
				<Column>
					<h3>Do rozliczenia - { awaits.length }</h3>
					<SecondaryText>Miesiące oczekujące rozliczenia.</SecondaryText>
				</Column>
				<SettlementsList
					settlements={awaits}
					settlementPostpendRender={(settlement: Settlement) => (
						<Row justifyContent="flex-end">
							<AcceptButton
								variant="outlined"
								onClick={() => { changeMonthStatus(settlement.id, 'CLOSED') }}>
									Akceptuj
							</AcceptButton>
							<DeclineButton
								variant="outlined"
								onClick={() => { changeMonthStatus(settlement.id, 'OPEN') }}>
									Odrzuć
							</DeclineButton>
						</Row>
				)}/>
			</Panel>

			<CustomExpansionPanel
				header={(
					<Column>
						<h3>Otwarte - { opened.length }</h3>
						<SecondaryText>Miesiące, które nie zostały zgłoszone do rozliczenia.</SecondaryText>
					</Column>
				)}>
				<SettlementsList settlements={opened}/>
			</CustomExpansionPanel>

			<CustomExpansionPanel
				header={(
					<Column>
						<h3>Rozliczone - { closed.length }</h3>
						<SecondaryText>Miesiące rozliczone.</SecondaryText>
					</Column>
				)}>
				<SettlementsList settlements={closed}/>
			</CustomExpansionPanel>
		</Page>
	)
}

export default ManagerSettlementPage;