import React from "react";
import {Input, Button, Glyphicon, Table} from "react-bootstrap";

import actions from "../../actions/actions.js";

import Sparkline from "../../components/Sparkline.js";

function formatNumber(number) {
	let result = number;
	if(number % 1 !== 0) {
		result = Number(number).toFixed(3);
	}
	return result;
}


export default React.createClass({
	getInitialState() {
		return {
			editValue: null,
			editing: false
		}
	},

	startEditing() {
		setTimeout(() => {
			let inputNode = React.findDOMNode(this.refs.input);
			inputNode.focus();
		});
		this.setState({editing: true, editValue: this.props.attribute.value});
	},

	endEditing(event) {
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
		let deltaElement = null;
		let inputStyle={
			display: "none"
		};
		if (this.state.editing) {
			inputStyle.display = "inline-block";
			glyphElement = <Glyphicon key="startediting" className="button-icon" glyph="check" onClick={this.endEditing}/>
			valueElement = "";
		} else {
			valueElement = attribute.value;
			let delta = attribute.delta;
			if(delta !== undefined) {
				delta = formatNumber(delta);
				if(delta > 0) {
					deltaElement = <span style={{color: "green"}}>(+{delta})</span>;
				} else if(delta < 0) {
					deltaElement = <span style={{color: "red"}}>({delta})</span>;
				} else {
					deltaElement = <span style={{color: "grey"}}>(=)</span>;
				}
				valueElement = <span>{deltaElement} {formatNumber(valueElement)}</span>;
			}
			if(typeof(attribute.value) === "boolean"){
				valueElement = attribute.value ? "true" : "false";
			}
			if (attribute.writable) {
				glyphElement = <Glyphicon key="endediting" className="button-icon" glyph="edit" onClick={this.startEditing}/>
			}
		}

		return <div style={{display: "flex", flexDirection: "row"}}>
			{attribute.historicValues?<Sparkline values={attribute.historicValues}/>:null}
			<div style={{flex: "1 1 auto", textAlign: "right"}}>
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
