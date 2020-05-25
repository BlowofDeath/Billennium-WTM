import React, { FC } from 'react';
import { StyledUserBadge, StyledUserInfo } from './Atoms';
import { IUser } from '../App/Context';

interface IProps {
	user: IUser
}

const UserBadge: FC<IProps> = ({ user }) => {
	return (
		<StyledUserBadge>
			<img
				alt="user icon"
				src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
				style={{ width: "80px", height: "80px", borderRadius: "50%" }}/>
			<StyledUserInfo>
				<span>{ user.email }</span>
				<span>{ user.role }</span>
				<span>{ user.first_name } { user.last_name }</span>
			</StyledUserInfo>
		</StyledUserBadge>
	)
}

export default UserBadge;