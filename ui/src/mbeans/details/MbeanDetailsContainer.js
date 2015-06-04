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
		let operations = this.state.mbean.operations;
		return (
			<div style={{display: "flex", flexFlow: "column", height: "100%"}}>
				<div style={{flex: "0 0 auto"}}>
					<form>
						<Input type='text' addonAfter={<Glyphicon glyph='remove' />}/>
					</form>
				</div>

				<div style={{flex: "0 0 auto"}}>
					<h3>Attributes</h3>
				</div>
				<div style={{flex: "1 1 50%", overflowY:"scroll"}}>
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

				<div style={{flex: "0 0 auto"}}>
					<h3>Operations</h3>
				</div>
				<div style={{flex: "1 1 50%", overflowY:"scroll"}}>
					<Table striped bordered condensed hover>
						<tbody>
						{operations.map((operation) => <tr key={operation.name}>
								<td>{operation.name}</td>
							</tr>
						)}
						</tbody>
					</Table>
				</div>
			</div>

		);
	}
});
