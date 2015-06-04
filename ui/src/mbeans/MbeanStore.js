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
				let mbean = JSON.parse(res.text);
				this.trigger(mbean);
			});

	}


});
