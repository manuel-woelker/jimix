import React from "react";
import {Input, Button, Glyphicon, Table} from "react-bootstrap";

import actions from "../../actions/actions.js";


export default React.createClass({
	getInitialState() {
		return {
			editValue: null,
			editing: false
		}
	},

	startEditing() {
		console.log("startediting");
		console.log(event.type);
		setTimeout(() => {
			let inputNode = React.findDOMNode(this.refs.input);
			inputNode.focus();
		});
		this.setState({editing: true, editValue: this.props.attribute.value});
	},

	endEditing(event) {
		console.log("endediting");
		console.log(event.type);
		if(!this.state.editing) {
			// editing was cancelled
			return;
		}
		actions.setAttributeValue({objectName: this.props.objectName, attribute: this.props.attribute, value: this.state.editValue});
		this.setState({editing: false});
	},

	onChangeInput() {
		let inputNode = React.findDOMNode(this.refs.input);
		this.setState({editValue: inputNode.value});
	},

	onInputKeyPress(event) {
		if(event.keyCode === 13) {
			this.endEditing();
		} else if(event.keyCode === 27) {
			this.setState({editing: false});
		}

	},

	render() {
		let attribute = this.props.attribute;
		let glyphElement = null;
		let valueElement;
		let inputStyle={
			display: "none"
		};
		if (this.state.editing) {
			inputStyle.display = "inline-block";
			glyphElement = <Glyphicon key="startediting" className="button-icon" glyph="check" onClick={this.endEditing}/>
			valueElement = "";
		} else {
			valueElement = attribute.value;
			if (attribute.writable) {
				glyphElement = <Glyphicon key="endediting" className="button-icon" glyph="edit" onClick={this.startEditing}/>
			}
		}

		return <div style={{display: "flex", flexDirection: "row"}}>
			<div style={{flex: "1 1 auto"}}>
				{valueElement}
				<input ref="input" value={this.state.editValue} type="text" className="form-control input-sm"
									 style={inputStyle} onChange={this.onChangeInput} onBlur={this.endEditing} onKeyDown={this.onInputKeyPress}/>
			</div>
			<div style={{paddingLeft: 10, width: 30}}>
				{glyphElement}
			</div>
		</div>;
	}
});
