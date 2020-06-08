import React, { FC } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

const Loader: FC<{ loading: boolean }> = ({ loading }) => {
	return (
		<Backdrop open={loading} style={{ zIndex: 1000, background: "#00000055", position: "absolute", left: "0", top: "0" }}>
			<CircularProgress variant="indeterminate"/>
		</Backdrop>
	)
}

export default Loader;