import {observable} from "mobx/lib/mobx";
import {MBean} from "./MBean";



export class AppState {
	@observable mbeans: MBean[] = [];

	loadInventory() {
		window.fetch('api/inventory')
			.then((response) => {
				return response.json();
			}).then((inventory) => {
			console.log(inventory);
			this.mbeans = inventory.mbeans;
				/*
				let inventory = res.body;
				let domainMap = {};
				inventory.mbeans.forEach((mbean) => {
*/
				});
	}
}
