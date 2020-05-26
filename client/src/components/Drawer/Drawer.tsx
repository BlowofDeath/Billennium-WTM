import React, { FC, useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { styled } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Swipeable } from 'react-swipeable';

interface DrawerProps {
	/** */
	style?: CSSProperties,
	/** */
	className?: string,
	/** */
	visible?: boolean,
	/** */
	onSwipeLeft?: () => void
}

const Drawer: FC<DrawerProps> = ({
	style={},
	className="",
	children,
	visible=true,
	onSwipeLeft,
	...props
}) => {
	const [isVisible, setIsVisible] = useState(visible);
	const drawerRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		setIsVisible(visible);
	}, [visible]);

	return (
		<CSSTransition timeout={200} in={isVisible} classNames="drawer-transition" nodeRef={drawerRef}>
			<div style={style} className={className} {...props} ref={drawerRef}>
				<Swipeable onSwipedLeft={onSwipeLeft} className="Drawer__container">
					{ children }
				</Swipeable>
			</div>
		</CSSTransition>
	)
}

Drawer.defaultProps = {
	onSwipeLeft: function() {}
}

export default styled(Drawer)({
	flexGrow: 1,
	overflow: "hidden",
	display: "block",
	transition: "max-width 200ms ease",
	
	'& > .Drawer__container': {
		height: "100%"
	},

	/** ==== MEDIA < 600PX ==== */
	'@media (max-width: 600px)': {
		position: "fixed",
		left: 0,
		top: 0,
		width: "85vw",
		height: "100vh",
		zIndex: 1200,
		'& > .Drawer__container': {
			width: "85vw"
		},
		'&.drawer-transition-enter-done': {
			maxWidth: "85vw"
		},
		'&.drawer-transition-enter-active': {
			maxWidth: "85vw"
		},
		'&.drawer-transition-enter': {
			maxWidth: "0"
		},
	
	
		'&.drawer-transition-exit-done': {
			maxWidth: "0"
		},
		'&.drawer-transition-exit-active': {
			maxWidth: "0"
		},
		'&.drawer-transition-exit': {
			maxWidth: "85vw"
		}
	},
	/** ==== MEDIA 600PX - 960PX ==== */
	'@media (min-width: 600px) and (max-width: 960px)': {
		width: "30vw",
		'& > .Drawer__container': {
			width: "30vw"
		},
		'&.drawer-transition-enter-done': {
			maxWidth: "30vw"
		},
		'&.drawer-transition-enter-active': {
			maxWidth: "30vw"
		},
		'&.drawer-transition-enter': {
			maxWidth: "0"
		},
	
	
		'&.drawer-transition-exit-done': {
			maxWidth: "0"
		},
		'&.drawer-transition-exit-active': {
			maxWidth: "0"
		},
		'&.drawer-transition-exit': {
			maxWidth: "30vw"
		}
	},
	/** ==== MEDIA 960PX - 1280PX ==== */
	'@media (min-width: 960px) and (max-width: 1280px)': {
		width: "25vw",
		'& > .Drawer__container': {
			width: "25vw"
		},
		'&.drawer-transition-enter-done': {
			maxWidth: "25vw"
		},
		'&.drawer-transition-enter-active': {
			maxWidth: "25vw"
		},
		'&.drawer-transition-enter': {
			maxWidth: "0"
		},
	
	
		'&.drawer-transition-exit-done': {
			maxWidth: "0"
		},
		'&.drawer-transition-exit-active': {
			maxWidth: "0"
		},
		'&.drawer-transition-exit': {
			maxWidth: "25vw"
		},
	},
	/** ==== MEDIA 1280PX - 1920PX ==== */
	'@media (min-width: 1280px) and (max-width: 1920px)': {
		width: "20vw",
		'& > .Drawer__container': {
			width: "20vw"
		},
		'&.drawer-transition-enter-done': {
			maxWidth: "20vw"
		},
		'&.drawer-transition-enter-active': {
			maxWidth: "20vw"
		},
		'&.drawer-transition-enter': {
			maxWidth: "0"
		},
	
	
		'&.drawer-transition-exit-done': {
			maxWidth: "0"
		},
		'&.drawer-transition-exit-active': {
			maxWidth: "0"
		},
		'&.drawer-transition-exit': {
			maxWidth: "20vw"
		},
	}
});