import * as React from "react";

import {Route, IndexRoute} from 'react-router'

import {Application}from "../application/Application"

import {MBeansView} from "../mbeans/MBeansView"

import {MBeanDetailsContainer} from "../mbeans/details/MbeanDetailsContainer"
import {AppState} from "../state/AppState";

// declare our routes and their hierarchy
export function createRoutes() {
	return (
		<Route path="/" component={Application} >
			<Route path="" component={MBeansView}>
				<Route path="mbean/:objectName" component={MBeanDetailsContainer}/>
			</Route>
		</Route>
	);
}

