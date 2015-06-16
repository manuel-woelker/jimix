import React from "react";


function isaNumber(maybeNumber) {
	return isFinite(maybeNumber);
}

export default React.createClass({
	getDefaultProps() {
		return {
			height: 20,
			width: 100
		}
	},

	componentDidMount() {
		this.redraw();
	},

	componentDidUpdate() {
		this.redraw();
	},

	redraw() {
//		let values = [1, 2, 4, 8, 16];
//		let values = [1, 22, 34, 8, 26, 99, 3, 77, 7];
//		let values = [101, 102, 104, 108, 116];
//		let values = [1000, 2000, 4000, 8000, 16000, undefined, undefined];
		let values = this.props.values;
		let canvas = React.findDOMNode(this.refs.canvas);
		let context = canvas.getContext("2d", {
			antialias: true,
			alpha: true
		});
		context.resetTransform();
		context.imageSmoothingEnabled = true;
		let width = canvas.width;
		let height = canvas.height;
		context.clearRect(0, 0, width, height);
		context.translate(width, height-2);
		context.scale(-1, -1);

		let actualValues = values.filter(isFinite);
		let minValue = Math.min.apply(0, actualValues);
		let maxValue = Math.max.apply(0, actualValues);
		let scale = Math.max(0.0000001, maxValue - minValue) / (height-4);
		let stepSize = width / (values.length - 1);
		context.lineWidth = 1;
		context.beginPath();
		context.moveTo(0, (values[0] - minValue) / scale);
		for (var i = 1; i < values.length; i++) {
			if(!values[i]) {
				break;
			}
			context.lineTo(stepSize * i, (values[i] - minValue) / scale);
		}
		context.stroke();

	},


	render() {
		return <div style={{display: "inline-block"}}>
			<canvas ref="canvas" width={this.props.width} height={this.props.height}/>
		</div>;
	}
});
