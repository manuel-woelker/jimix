import {observable, IObservableArray, fastArray, asFlat} from "mobx/lib/mobx";
import {Attribute} from "./Attribute";


export class MBean {
	@observable objectName: string;
	@observable domainName: string;
	@observable shortName: string;
	@observable name: string;
	@observable attributes: IObservableArray<Attribute> = observable(asFlat([]));
}
