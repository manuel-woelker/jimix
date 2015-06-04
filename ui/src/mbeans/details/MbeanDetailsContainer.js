import React from "react";
import Reflux from "reflux";
import {Input, Button, Glyphicon, Table} from "react-bootstrap";

import MbeanStore from "../MbeanStore.js"
import actions from "../../actions/actions.js"

var requestData = function (objectName) {
	actions.loadMbean(objectName);
};

export default React.createClass({
	mixins: [Reflux.connect(MbeanStore, "mbean")],

	componentWillMount() {
		requestData(this.props.params.objectName);
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.objectName !== this.props.params.objectName) {
			requestData(nextProps.params.objectName);
		}
	},

	render: function () {
		if (!this.state.mbean) {
			return null;
		}
		let attributes = this.state.mbean.attributes;
		return (
			<div>
				<form>
					<Input type='text' addonAfter={<Glyphicon glyph='remove' />}/>
				</form>
				<div style={{maxHeight: "30em", overflowY: "scroll"}}>
					<Table striped bordered condensed hover>
						<tbody>
						{attributes.map((attribute) => <tr key={attribute.name}>
								<td>{attribute.name}</td>
								<td>{attribute.value}</td>
							</tr>
						)}
						</tbody>
					</Table>
				</div>
			</div>

		);
	}
});
