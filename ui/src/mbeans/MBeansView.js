
import React from "react";
import MbeanListContainer from "./list/MbeanListContainer.js"
import MbeanDetailsContainer from "./list/MbeanListContainer.js"

import {RouteHandler, State} from "react-router";

export default React.createClass({
	mixins: [State],

	render() {
		var key = this.getPath();
		return <div className="container mbean-view">
			<div className="row" style={{height: "100%"}}>
				<div className="col-md-4" style={{height: "100%"}}>
					<MbeanListContainer />
				</div>
				<div className="col-md-8"  style={{height: "100%"}}>
					<RouteHandler/>
				</div>
			</div>
		</div>;
	}
});
