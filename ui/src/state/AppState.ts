import {observable, extendObservable, computed, asMap} from "mobx/lib/mobx";
import {MBean} from "./MBean";
import {Inventory} from "./Inventory";
import {Domain} from "./Domain";
import {Attribute} from "./Attribute";


const re = /([^:]+):(.+)/;

export class AppState {
	@observable inventory: Inventory = new Inventory();
	@observable activeMBeanName: string = null;

	@computed
	get activeMBean(): MBean {
		var activeMBean = this.inventory.mbeans.get(this.activeMBeanName);
        return activeMBean;
	}

	async loadInventory() {
		let domainMap = new Map<string, Domain>();
		let response = await window.fetch('api/inventory');
		let inventory = await response.json();
		this.inventory.hostName = inventory.hostName;
		this.inventory.mainClass = inventory.mainClass;
		this.inventory.userName = inventory.userName;
		inventory.mbeans.forEach((jsonBean) => {
			let mbean = new MBean();
			extendObservable(mbean, jsonBean);
			var match = re.exec(mbean.objectName);
			var domainName = match[1];
			var name = match[2];
			mbean.name = name;
			var namePart = null;
			var typePart = null;
			var scopePart = null;
			var additionalKeys = 0;
			name.split(",").forEach(function(item) {
				var parts = item.split("=");
				var key = parts[0].toLowerCase();
				if (key === "type") {
					typePart = parts[1];
					return;
				}
				if (key === "name") {
					namePart = parts[1];
					return;
				}
				if (key === "scope") {
					scopePart = parts[1];
					return;
				}
				additionalKeys++;
			});
			if (additionalKeys <= 0) {
				if (typePart) {
					name = stripQuotes(typePart)
				}
				if (namePart) {
					if(typePart) {
						name += " - " + stripQuotes(namePart);
					} else {
						name = stripQuotes(namePart);
					}
				}
				if (scopePart) {
					name += " (" + stripQuotes(scopePart) + ")";
				}
				mbean.name = name;
			}
			let domain = domainMap.get(domainName);
			if(!domain) {
				domain = new Domain();
				domain.name = stripQuotes(domainName);
				domainMap.set(domainName, domain);
				this.inventory.domains.push(domain);
			}
			domain.mbeans.push(mbean);
			this.inventory.mbeans.set(mbean.objectName, mbean);
		});
//		this.inventory.mbeans = observable(asMap(this.inventory.mbeans as any)) as any;
	}

	async loadMBean(objectName: string) {
		appState.activeMBeanName = objectName;
		let response = await window.fetch('api/mbeans/' + encodeURIComponent(objectName));
		let {attributes, operations} = await response.json();
		//TODO: wait for inventory to be loaded
		var mbean = appState.inventory.mbeans.get(objectName);
		mbean.attributes.clear();
		attributes.forEach((rawAttribute) => {
			let attribute = new Attribute();
			extendObservable(attribute, rawAttribute);
            mbean.attributes.push(attribute)
		});
		console.log(mbean)
	}
}





export const appState = new AppState();

function stripQuotes(str) {
	if (str.length === 0) {
		return str;
	}
	if (str.charAt(0) === "\"" && str.charAt(str.length - 1)) {
		return str.substring(1, str.length - 1);
	}
	return str;
}


function byName(a, b) {
	if (a.name === b.name) {
		return 0;
	}
	return a.name < b.name ? -1 : 1;
};
