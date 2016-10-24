// Sidebar

import React from 'react';
import style from './sidebar.css';

// Returns the User's Avatar Image
// function Avatar(props){
// 	return(
// 		<img className={style.avatar}
// 			src={props.user.avatarUrl}
// 			alt={props.user.name}
// 		/>
// 	);
// }

// function UserInfo(props) {
// 	return (
// 		<div className={style.userInfo}>
// 			<Avatar user={props.user} />
// 			<div className={style.userInfo-name}>
// 				{props.user.name}
// 			</div>
// 		</div>
// 	)
// }

const Sidebar = (props) => {
	return(
		<div className={style.Sidebar}>
			<h2>Sidebar is active!</h2>
			<ul>
				<li><a href="">Profile</a></li>
				<li><a href="">Settings</a></li>
				<li><a href="">Filters</a></li>
				<li><a href="">Profile</a></li>
			</ul>
		</div>
	);
}


export default Sidebar;