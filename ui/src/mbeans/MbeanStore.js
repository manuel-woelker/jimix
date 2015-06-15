import request from 'superagent';
import Reflux from 'reflux';

import actions from "../actions/actions.js";

export default Reflux.createStore({
	listenables: actions,
	// Initial setup
	init: function () {
		this.previousValues = {};
	},

	onLoadMbean(objectName, autoRefresh) {
		this.cancelAutoRefreshTimer();
		this.previousValues = {};
		this.currentObjectName = objectName;
		this.loadMbean();
		this.onSetAutoRefresh(autoRefresh);
	},


	loadMbean() {
		request
			.get('/jimix/api/mbeans/' + this.currentObjectName).end((err, res) => {
				let mbean = this.mbean = JSON.parse(res.text);
				// Compute deltas
				let previousValues = this.previousValues;
				let values = {};
				mbean.attributes.forEach(attribute => {
					let value = attribute.value;
					values[attribute.name] = value;
					let previousValue = previousValues[attribute.name];
					if (Number.isFinite(value)) {
						if (previousValue !== undefined) {
							attribute.delta = attribute.value - previousValue;
						}
					} else {
						if(typeof previousValue !== "undefined" && previousValue !== attribute.value) {
							attribute.changed = true;
						}
					}
				});
				this.previousValues = values;
				this.trigger(mbean);
			});
	},

	onExecuteOperation(invocation) {
		let operation = invocation.operation;
		operation.invoking = true;
		operation.result = null;
		this.trigger(this.mbean);
		request
			.post('/jimix/api/mbeans/' + invocation.objectName + "/" + operation.name)
			.query(invocation.parameters.map((parameter) => "argument=" + encodeURIComponent(parameter)).join("&"))
			.end((err, res) => {
				operation.invoking = false;
				if (err) {
					operation.success = false;
					operation.result = "Unknown Error";
					try {
						operation.result = err.response.statusText;
					} finally {
					}
					try {
						let response = JSON.parse(res.text);
						if (response && response.message) {
							operation.result = response.message;
						}
					} finally {
					}
					this.trigger(this.mbean);
					return;
				}
				operation.success = true;
				let response = JSON.parse(res.text);
				operation.result = response.result || "OK";
				this.trigger(this.mbean);
			});
	},

	onSetAttributeValue(parameters) {
		let attribute = parameters.attribute;
		request
			.put('/jimix/api/mbeans/' + parameters.objectName + "/" + attribute.name)
			.query("value=" + encodeURIComponent(parameters.value))
			.end((err, res) => {
				if (err) {
					console.log(err);
					return;
				}
				attribute.value = parameters.value;
				this.trigger(this.mbean);
			});
	},

	cancelAutoRefreshTimer() {
		if (this.TimerId) {
			clearInterval(this.TimerId);
			this.TimerId = null;
		}
	},

	onSetAutoRefresh(autoRefresh) {
		this.autoRefresh = autoRefresh;
		this.cancelAutoRefreshTimer();
		if (autoRefresh) {
			this.TimerId = setInterval(() => this.loadMbean(), autoRefresh * 1000);
		}
	}


});
