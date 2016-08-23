import {observable} from "mobx/lib/mobx";


export class MBean {
	@observable objectName: string;
	@observable domainName: string;
	@observable shortName: string;
	@observable name: string;
}
