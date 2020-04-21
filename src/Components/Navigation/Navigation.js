import React from 'react';
import './Navigation.css';

export default class Navigation extends React.Component {
	render() {
		return (
			<div id="navbar" className="bg-white shadow-5">
				<div>
					<link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"/>
					<p id="logo-head">File System</p>
				</div>
				<div className="flex items-center">
				{
					this.props.items.map((data,index) => {
						return(
							<p className="mr3 ml3 underline-hover dim pointer b"
								onClick={() => this.props.onrouteChange(data)} key={index}>
								{data}
							</p>
						);
					})
				}
				</div>
			</div>
		)
	}
}