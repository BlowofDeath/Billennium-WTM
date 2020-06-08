import React, { FC, Fragment, ReactNode } from 'react'
import moment from 'moment';
import { StyledListItem } from '../Atoms/StyledListItem';
import { Column } from '../Atoms/Column';
import { SecondaryText } from '../Atoms/SecondaryText';
import { aggregateWTRs } from '../../scripts/aggregateWTRs';
import { Settlement } from '../../core/Settlements';
import { Row } from '../Atoms/Row';

export interface SettlementsListProps {
	/** */
	settlements: Array<Settlement>;
	/** */
	settlementPostpendRender?: (settlement: Settlement) => ReactNode
}

const SettlementsList: FC<SettlementsListProps> = ({ settlements=[], settlementPostpendRender }) => {
	
	if (settlements.length === 0 || !settlements)
		return <span>Brak wyników</span>;
	
	return (
		<Column style={{ width: "100%" }}>
			{
				settlements.map((settlement: Settlement, index: number) => {
					const date = moment([settlement.year, settlement.month-1]);
					/** time in minutes */
					const time = aggregateWTRs(settlement.workTimeRecords);

					return (
						<StyledListItem key={index}>
							<Column>
								<h4>{ settlement.user.first_name } {settlement.user.last_name}</h4>
								<SecondaryText>
									{ date.format('YYYY-MM') }
								</SecondaryText>
							</Column>
							<Row justifyContent="flex-end">
								<Column>
									<span>Łączny czas pracy</span>
									<SecondaryText>
										{ Math.floor(time / 60) }h { time % 60 }min
									</SecondaryText>
								</Column>
								{ settlementPostpendRender && <Fragment>
									{ settlementPostpendRender(settlement) }
								</Fragment> }
							</Row>
						</StyledListItem>
					)
				})
			}
		</Column>
	)
}

export default SettlementsList;
