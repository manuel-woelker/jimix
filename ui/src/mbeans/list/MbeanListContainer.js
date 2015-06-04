import React from "react";
import request from 'superagent';
import Reflux from 'reflux';
import InventoryStore from '../../inventory/InventoryStore.js';

import {Input, Button, Glyphicon, Panel, Well, ListGroup, ListGroupItem, Table} from "react-bootstrap";

export default React.createClass({
	mixins: [Reflux.connect(InventoryStore, "inventory")],

	render: function () {
		let inventory = this.state.inventory;
		if (!inventory) {
			return null;
		}
		return (
			<div>
				<form>
					<Input type='text' addonAfter={<Glyphicon glyph='remove' />}/>
				</form>
				{inventory.domains.map(domain => {
					return <Panel key={domain.name} style={{overflow: "hidden"}}
								  header={<bold style={{fontWeight: "bold"}}>{domain.name}</bold>}>
						<Table striped condensed hover fill>
							<tbody>
							{domain.mbeans.map(mbean => {
								return <tr key={mbean.objectName}><td>{mbean.name}</td></tr>;
							})}
							</tbody>
						</Table>
						{/*
						<ListGroup fill>
							<ListGroupItem>Item 1</ListGroupItem>
							<ListGroupItem>Item 2</ListGroupItem>
							<ListGroupItem>&hellip;</ListGroupItem>
						</ListGroup>
						{domain.mbeans.map(mbean => {
							return <div className="mbean" key={mbean.objectName}>{mbean.objectName}</div>;
						})}
						 */}
						{/*JSON.stringify(this.state.mbeans)*/}
					</Panel>;
				})}

			</div>
		);
	}
});
