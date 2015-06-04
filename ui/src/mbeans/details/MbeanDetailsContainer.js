import React from "react";
import Router from "react-router";
import {Input, Button, Glyphicon, Table} from "react-bootstrap";


export default React.createClass({
	mixins: [Router.State],
	render: function () {
		return (
			<div>
				{this.getParams().objectName}
				<form>
					<Input type='text' addonAfter={<Glyphicon glyph='remove' />}/>
				</form>
				<Table striped bordered condensed hover>
					<tbody>
					<tr>
						<td>Key</td>
						<td>Value</td>
					</tr>
					<tr>
						<td>Key</td>
						<td>Value</td>
					</tr>
					</tbody>
				</Table>
			</div>

		);
	}
});
