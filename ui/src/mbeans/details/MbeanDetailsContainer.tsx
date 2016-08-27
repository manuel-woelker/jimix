import {observer} from "mobx-react/index";

import * as React from "react";
import {Table} from "react-bootstrap";
import {MBean} from "../../state/MBean";
import {appState} from "../../state/AppState";

@observer
export class MBeanDetailsContainer extends React.Component<{params: any}, {}> {

	componentDidMount () {
		this.loadMBean();
	}

	componentDidUpdate (prevProps) {
		// respond to parameter change in scenario 3
		let oldId = prevProps.params.objectName;
		let newId = this.props.params.objectName;
		if (newId !== oldId) {
			this.loadMBean();
		}
	}

	render() {
		if(!appState.activeMBean) {
			return <div>Loading...</div>;
		}
		let attributes = appState.activeMBean.attributes;
		return <div style={{height: "calc(100% - 50px)"}}>
			<h3>{appState.activeMBean.name}</h3>
			<div style={{display: "flex", flexFlow: "column", height: "100%"}}>
				<div style={{flex: "0 0 auto"}}>
					<h3 style={{marginTop: 0}}>Attributes</h3>
				</div>
				<div style={{flex: "1 1 50%", overflowY:"scroll"}}>
					<Table striped bordered condensed hover>
						<colgroup>
							<col span={1} style={{width: "20%"}}/>
							<col span={1} style={{width: "100%"}}/>
						</colgroup>
						<tbody>
						{attributes/*.filter(filterByName(this.state.searchText))*/.map((attribute) => <tr key={attribute.name} className={attribute.changed?"changed":null}>
								<td style={{verticalAlign: "top"}}>{attribute.name}</td>
								<td>{attribute.printableValue}</td>
							</tr>
						)}
						</tbody>
					</Table>
				</div>
			</div>
		</div>;
	}

	private loadMBean() {
		appState.loadMBean(this.props.params.objectName);
	}
	
}


// <td><AttributeValue objectName={this.props.params.objectName} attribute={attribute}/></td>

