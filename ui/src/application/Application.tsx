import * as React from "react";
import {observer} from "mobx-react/index";
import {AppState} from "../state/AppState";
import {NavigationBar} from "./NavigationBar";
import DevTools from 'mobx-react-devtools';

import {MBeansView} from "../mbeans/MBeansView";

declare var process: any;
const devToolsComponent = process.env.NODE_ENV !== 'production'? <DevTools /> : null;

@observer
export class Application extends React.Component<{appState: AppState}, {}> {
	displayName: 'HeyHey'
	render() {
		return (
			<div style={{height: "100%"}}>
				<NavigationBar inventory={this.props.appState.inventory} />
				<div style={{height: "100%", paddingTop: 60, paddingBottom: 20}}>
				<MBeansView inventory={this.props.appState.inventory}/>
					</div>
				{devToolsComponent}
			</div>
		);
	}
};
