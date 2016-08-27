import {observer} from "mobx-react/index";

import * as React from "react";
import {MBean} from "../../state/MBean";
import {Inventory} from "../../state/Inventory";


@observer
export class MBeanDetailsContainer extends React.Component<{params: any}, {}> {
	render() {
		return <div style={{height: "calc(100% - 50px)"}}>
			<h3>{this.props.params.objectName}</h3>
			<div style={{overflowY: "scroll", height: "100%"}}>
				{JSON.stringify(this.props.params)}
			</div>
		</div>;
	}

	/*
	 getInitialState(){
	 return {
	 searchText: ""
	 }
	 }

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
	 */
}


