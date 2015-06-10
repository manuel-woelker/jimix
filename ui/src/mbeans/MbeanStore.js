import request from 'superagent';
import Reflux from 'reflux';

import actions from "../actions/actions.js";

export default Reflux.createStore({
	listenables: actions,
	// Initial setup
	init: function () {
	},

	onLoadMbean(objectName) {
		request
			.get('/jimix/api/mbeans/' + objectName).end((err, res) => {
				let mbean = this.mbean = JSON.parse(res.text);
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
	}



});
