import {observable} from "mobx";
import {MBean} from "./MBean";


export class Inventory {
	@observable mbeans: MBean[] = [];
	@observable mainClass: String = "";
	@observable hostName: String = "";
	@observable userName: String = "";
}
