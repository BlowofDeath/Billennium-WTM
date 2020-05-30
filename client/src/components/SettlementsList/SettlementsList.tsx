import React, { FC, Fragment } from 'react'
import moment from 'moment';
import { StyledListItem } from '../Atoms/StyledListItem';
import { Column } from '../Atoms/Column';
import { SecondaryText } from '../Atoms/SecondaryText';
import { aggregateWTRs } from '../../scripts/aggregateWTRs';
import { Settlement } from '../../core/Settlements';

export interface SettlementsListProps {
	settlements: Array<Settlement>
}

const SettlementsList: FC<SettlementsListProps> = ({ settlements=[] }) => {
	
	if (settlements.length === 0 || !settlements)
		return <span>No result case</span>;
	
	return (
		<Fragment>
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
							<Column>
								<span>Łączny czas pracy</span>
								<SecondaryText>
									{ Math.floor(time / 60) }h { time % 60 }min
								</SecondaryText>
							</Column>
						</StyledListItem>
					)
				})
			}
		</Fragment>
	)
}

export default SettlementsList;
