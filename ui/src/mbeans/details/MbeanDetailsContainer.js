import React from "react";
import Router from "react-router";
import Reflux from "reflux";
import {Input, Button, ButtonGroup, Glyphicon, Table} from "react-bootstrap";

import MbeanStore from "../MbeanStore.js";
import actions from "../../actions/actions.js";

import AttributeValue from "./AttributeValue.js";

var requestData = function (objectName, autoRefresh) {
	actions.loadMbean(objectName, autoRefresh);
};

function filterByName(searchText) {
	return (item) => item.name.toLowerCase().indexOf(searchText) > -1;
}

export default React.createClass({
	mixins: [Reflux.connect(MbeanStore, "mbean"), Router.Navigation, Router.State],

	getInitialState() {
		this.inputComponents = {};
		return {
			searchText: ""
		}
	},

	onChangeSearchText() {
		this.setState({searchText: this.refs.searchText.getValue()})
	},

	onClearSearchText() {
		this.setState({searchText: ""})
	},


	componentWillMount() {
		requestData(this.props.params.objectName, Number(this.props.query.autoRefresh));
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.objectName !== this.props.params.objectName || nextProps.query !== this.props.query) {
			requestData(nextProps.params.objectName, Number(nextProps.query.autoRefresh));
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

	setAutoRefresh(autoRefresh) {
		let routes = this.getRoutes();
		let route = routes[routes.length -1];
		let query = this.getQuery();
		query.autoRefresh = autoRefresh;
		this.transitionTo(route.name, this.props.params, query);
		actions.setAutoRefresh(autoRefresh);
	},


	render: function () {
		function renderValue(attribute) {
			return <span>{attribute.value}</span>;
		}

		if (!this.state.mbean) {
			return null;
		}
		let attributes = this.state.mbean.attributes;
		let operations = this.state.mbean.operations;
		let autoRefresh = this.props.query.autoRefresh;
		return (
			<div style={{display: "flex", flexFlow: "column", height: "100%"}}>
				<div style={{flex: "0 0 auto", display: "flex", flexFlow: "row", textAlign: "baseline"}}>
					<form style={{flex: "1 1 auto"}}>
						<Input ref="searchText" type='text' addonAfter={<Glyphicon style={{cursor: "pointer"}} onClick={this.onClearSearchText} glyph='remove' />} onChange={this.onChangeSearchText} value={this.state.searchText} placeholder="Search..."/>
					</form>
					<div style={{flex: "0 0 auto", marginLeft: 20}}>
						<ButtonGroup>
							<Button bsStyle='primary'>AutoRefresh</Button>
							<Button bsStyle='primary' className={autoRefresh?"":"active"} onClick={this.setAutoRefresh.bind(this, undefined)}>Off</Button>
							<Button bsStyle='primary' className={autoRefresh === "1"?"active":""} onClick={this.setAutoRefresh.bind(this, 1)}>1s</Button>
							<Button bsStyle='primary' className={autoRefresh === "10"?"active":""} onClick={this.setAutoRefresh.bind(this, 10)}>10s</Button>
							<Button bsStyle='primary' className={autoRefresh === "60"?"active":""} onClick={this.setAutoRefresh.bind(this, 60)}>1min</Button>
						</ButtonGroup>
					</div>
				</div>

				<div style={{flex: "0 0 auto"}}>
					<h3 style={{marginTop: 0}}>Attributes</h3>
				</div>
				<div style={{flex: "1 1 50%", overflowY:"scroll"}}>
					<Table striped bordered condensed hover>
						<colgroup>
							<col span="1" style={{width: "20%"}}/>
							<col span="1" style={{width: "100%"}}/>
						</colgroup>
						<tbody>
						{attributes.filter(filterByName(this.state.searchText)).map((attribute) => <tr key={attribute.name}>
								<td style={{verticalAlign: "top"}}>{attribute.name}</td>
								<td style={{backgroundColor: attribute.changed?"#FFD":null}}><AttributeValue objectName={this.props.params.objectName} attribute={attribute}/></td>
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
						{operations.filter(filterByName(this.state.searchText)).map((operation) => {
								let inputComponents = this.inputComponents[operation.name] = this.inputComponents[operation.name] || [];
								return <tr key={operation.name}>
									<td style={{verticalAlign: "text-top"}}>
										<Button bsSize="small" disabled={operation.invoking}
												onClick={this.onExecuteOperation.bind(this, operation)}>{operation.name}</Button>
									</td>
									<td>
										{operation.signature.length < 1 ? null : <div>
											<table>
												<tbody>
												{operation.signature.map((parameter, i) => <tr key={i}>
													<td style={{width: "320px"}}>
														<input ref={(component) => {inputComponents[i] = component}}
															   type="text" className="form-control input-sm"></input>
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
								</tr>
							}
						)}
						</tbody>
					</Table>
				</div>
			</div>

		);
	}
});
