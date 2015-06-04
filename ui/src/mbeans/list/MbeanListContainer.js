import React from "react";
import request from 'superagent';
import Reflux from 'reflux';
import InventoryStore from '../../inventory/InventoryStore.js';

import {Input, Button, Glyphicon, Panel, Well, ListGroup, ListGroupItem, Table} from "react-bootstrap";
import {Link} from "react-router";

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
				<div style={{maxHeight: "30em", overflowY:"scroll"}}>
				{inventory.domains.map(domain => {
					return <Panel key={domain.name} style={{overflow: "hidden"}}
								  header={<bold style={{fontWeight: "bold"}}>{domain.name}</bold>}>
						<Table striped condensed hover fill>
							<tbody>
							{domain.mbeans.map(mbean => {
								return <tr key={mbean.objectName}><td><Link style={{display:"inline-block", width: "100%"}} to="mbean" params={{objectName: mbean.objectName}}>{mbean.name}</Link></td></tr>;
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
