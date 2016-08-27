import * as React from "react";
import {observer} from "mobx-react/index";
import {AppState} from "../state/AppState";
import {NavigationBar} from "./NavigationBar";
import DevTools from 'mobx-react-devtools';

import {MBeansView} from "../mbeans/MBeansView";
import {appState} from "../state/AppState";
declare var process: any;
const devToolsComponent = process.env.NODE_ENV !== 'production' ? <DevTools /> : null;


@observer
export class Application extends React.Component<{children: any}, {}> {
	displayName: 'HeyHey';

	render() {
		return (
			<div style={{height: "100%"}}>
				<NavigationBar inventory={appState.inventory}/>
				<div style={{height: "100%", paddingTop: 60, paddingBottom: 20}}>
					{this.props.children}
				</div>
				{devToolsComponent}
			</div>
		);
	}
}
