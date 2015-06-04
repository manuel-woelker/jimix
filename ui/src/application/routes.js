var Router = require('react-router');
let {Route, DefaultRoute} = Router;
import React from "react";

import Application from "../application/Application.js"

import MBeansView from "../mbeans/MBeansView.js"

import MBeanDetailsContainer from "../mbeans/details/MbeanDetailsContainer.js"

// declare our routes and their hierarchy
var routes = (
	<Route path="/" handler={Application}>
		<Route path="" handler={MBeansView}>
			<Route path="mbean/:objectName" name="mbean" handler={MBeanDetailsContainer}/>
		</Route>
	</Route>
);

export default routes;
