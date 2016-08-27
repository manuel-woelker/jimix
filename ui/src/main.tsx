
require("bootstrap/dist/css/bootstrap.css");
require("./style/style.css");

import * as React from "react";
import * as ReactDOM from "react-dom";

import {appState} from "./state/AppState";
import {Application} from "./application/Application";
import {autorun} from "mobx";
import { Router, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })


import {createRoutes} from "./application/routes";

autorun(() => {
	console.log(appState.inventory);
	console.log(appState.activeMBean);
	console.log(appState.activeMBeanName);
});
window.onload = () => {
	appState.loadInventory();
	ReactDOM.render(
		<Router history={appHistory} routes={createRoutes()}>
		</Router>, document.getElementById('application'));
		/*
	ReactDOM.render(
		<Application appState={appState}/>,
		document.getElementById('application')

	);*/
};

