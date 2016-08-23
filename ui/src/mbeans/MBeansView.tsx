
import {MbeanListContainer} from "./list/MbeanListContainer"

import * as React from "react";
import {observer} from "mobx-react/index";

import {MBean} from "../state/MBean";
import {Inventory} from "../state/Inventory";

@observer
export class MBeansView extends React.Component<{inventory: Inventory}, {}> {

	render() {
		return <div className="container-fluid mbean-view">
			<div className="row" style={{height: "100%"}}>
				<div className="col-xs-4" style={{overflow: "hidden", height: "100%"}}>
					<MbeanListContainer inventory={this.props.inventory} />
				</div>
				<div className="col-xs-8"  style={{height: "100%"}}>
					<h3>Rest</h3>
				</div>
			</div>
		</div>;
	}
}
