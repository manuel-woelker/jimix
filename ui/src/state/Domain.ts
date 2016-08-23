import {observable} from "mobx";
import {MBean} from "./MBean";


export class Domain {
	@observable name: string;
	@observable mbeans: MBean[] = [];
}
