import React from "react";
import Router from "react-router";

import request from 'superagent';
import Reflux from 'reflux';
import InventoryStore from '../../inventory/InventoryStore.js';

import {Input, Button, Glyphicon, Panel, Well, ListGroup, ListGroupItem, Table} from "react-bootstrap";
import {Link} from "react-router";

export default React.createClass({
	mixins: [Reflux.connect(InventoryStore, "inventory"), Router.State],

	getInitialState(){
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

	render: function () {
		let inventory = this.state.inventory;
		if (!inventory) {
			return null;
		}
		let query = this.getQuery();
		return (
			<div style={{display: "flex", flexFlow: "column", maxHeight: "100%"}}>
				<div style={{flex: "0 0 auto"}}>
					<form>
						<Input ref="searchText" type='text' addonAfter={<Glyphicon style={{cursor: "pointer"}} onClick={this.onClearSearchText} glyph='remove' />} onChange={this.onChangeSearchText} value={this.state.searchText} placeholder="Search..."/>
					</form>
				</div>
				<div style={{flex: "1 1 auto", overflowY:"scroll"}}>
					{inventory.domains.map(domain => {
						return <Panel key={domain.name} style={{overflow: "hidden"}}
									  header={<bold style={{fontWeight: "bold"}}>{domain.name}</bold>}>
							<Table striped condensed hover fill>
								<tbody>
								{domain.mbeans.filter(mbean => mbean.name.toLowerCase().indexOf(this.state.searchText) > -1).map(mbean => {
									return <tr key={mbean.objectName}>
										<td><Link style={{display:"inline-block", width: "100%"}} to="mbean"
												  params={{objectName: encodeURIComponent(mbean.objectName)}} query={query}>{mbean.name}</Link></td>
									</tr>;
								})}
								</tbody>
							</Table>
						</Panel>;
					})}
				</div>

			</div>
		);
	}
});
