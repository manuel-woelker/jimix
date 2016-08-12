import {AppState} from "./state/AppState";
require("bootstrap/dist/css/bootstrap.css");
require("./style/style.css");

import * as React from "react";
import * as ReactDOM from "react-dom";

import {Application} from "./application/Application";
import {autorun} from "mobx";

const appState = new AppState();

autorun(() => {
	console.log(appState.inventory);
});
window.onload = () => {
	appState.loadInventory();
	ReactDOM.render(
		<Application appState={appState}/>,
		document.getElementById('application')
	);
};

