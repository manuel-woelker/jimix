import React from "react";
import NavigationBar from "./NavigationBar.js";
import MbeanListContainer from "../mbeans/list/MbeanListContainer.js";
import MbeanDetailsContainer from "../mbeans/details/MbeanDetailsContainer.js";

import {Input, Button, Glyphicon} from "react-bootstrap";

import {RouteHandler} from "react-router";

export default React.createClass({
	render: function () {
		return (
			<div>
				<NavigationBar />
				<br />
				<br />
				<br />

				<RouteHandler/>
			</div>

		);
	}
});
