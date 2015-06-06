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

	getInitialState() {
		this.inputComponents = {};
		return {};
	},

	componentWillMount() {
		requestData(this.props.params.objectName);
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.objectName !== this.props.params.objectName) {
			requestData(nextProps.params.objectName);
		}
	},

	onExecuteOperation(operation) {
		let parameters = this.inputComponents[operation.name].map((inputComponent) => {
			return React.findDOMNode(inputComponent).value;
		});
		actions.executeOperation({
			objectName: this.props.params.objectName,
			operation,
			parameters
		})
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
						<colgroup>
							<col span="1" style={{width: "20%"}}/>
							<col span="1" style={{width: "100%"}}/>
						</colgroup>
						<tbody>
						{attributes.map((attribute) => <tr key={attribute.name}>
								<td style={{verticalAlign: "top"}}>{attribute.name}</td>
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
						<colgroup>
							<col span="1" style={{width: "20%"}}/>
							<col span="1" style={{width: "80%"}}/>
						</colgroup>
						<tbody>
						{operations.map((operation) => {
						let inputComponents = this.inputComponents[operation.name] = this.inputComponents[operation.name] || [];
						return <tr key={operation.name}>
							<td style={{verticalAlign: "text-top"}}>
								<Button bsSize="small" disabled={operation.invoking}
										onClick={this.onExecuteOperation.bind(this, operation)}>{operation.name}</Button>
							</td>
							<td>
								{operation.signature.length < 1?null:<div>
									<table>
										<tbody>
										{operation.signature.map((parameter, i) => <tr key={i}>
											<td style={{width: "320px"}}>
												<input ref={(component) => {inputComponents[i] = component}} type="text" className="form-control input-sm"></input>
											</td>
											<td className="text-muted">&nbsp;&nbsp;({parameter.type})</td>
										</tr>)}
										</tbody>
									</table>
									<br />
									</div>}
									<span
										className={operation.success?"operation-success":"operation-error"}>{operation.result}</span>{operation.invoking ? "Invoking..." : null}
								</td>
							</tr>}
							)}
						</tbody>
					</Table>
				</div>
			</div>

		);
	}
});
