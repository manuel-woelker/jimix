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
			<div>
				<NavigationBar />
				<h1>&nbsp;</h1>
				<MBeansView mbeans={this.props.appState.mbeans}/>
				{devToolsComponent}
			</div>
		);
	}
};
