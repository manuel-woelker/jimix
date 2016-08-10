import * as React from "react";
import {observer} from "mobx-react/index";

import {Navbar} from "react-bootstrap";

@observer
export class NavigationBar extends React.Component<{}, {}> {

	render() {
		let info = null;
/*		let inventory = this.state.inventory;
		if (inventory) {
			info = <span> - {inventory.mainClass} <span className="text-muted">({inventory.userName}@{inventory.hostName})</span></span>;
		}*/
		return <Navbar fixedTop={true} fluid={true} >
			<Navbar.Header>
				<Navbar.Brand>
					<a href="#">jimix</a>
				</Navbar.Brand>
			</Navbar.Header>
			{info}
		</Navbar>;
	}
}
