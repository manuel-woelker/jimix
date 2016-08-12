import {observable} from "mobx/lib/mobx";
import {MBean} from "./MBean";
import {Inventory} from "./Inventory";


export class AppState {
	@observable inventory: Inventory = new Inventory();

	async loadInventory() {
		let response = await window.fetch('api/inventory');
		let inventory = await response.json();
		this.inventory = inventory;
	}
}
