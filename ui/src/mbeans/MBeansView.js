
import React from "react";
import MbeanListContainer from "./list/MbeanListContainer.js"
import MbeanDetailsContainer from "./list/MbeanListContainer.js"

import {RouteHandler} from "react-router";

export default React.createClass({
	render() {
		return <div className="container">
			<div className="row">
				<div className="col-md-4">
					<MbeanListContainer />
					<br />
				</div>
				<div className="col-md-8">
					<RouteHandler />
				</div>
			</div>
		</div>;
	}
});
