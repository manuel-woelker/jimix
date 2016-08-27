import {observable, computed} from "mobx/lib/mobx";


export class Attribute {
	@observable name: string;
	@observable description: string;
	@observable type: string;
	@observable value: any;
	@observable writeable: boolean = false;
	@observable changed: boolean = false;
	@computed get printableValue(): string {
		let value = this.value;
		if(typeof value === "string") {
			return value;
		}
		return JSON.stringify(value);
	};
}


