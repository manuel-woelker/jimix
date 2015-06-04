import Application from "./application/Application.js";
import React from "react";
import Router from "react-router";
import routes from "./application/routes.js";

require("bootstrap/dist/css/bootstrap.css");
require("./style/style.css");


window.onload = function() {
	Router.run(routes, Router.HashLocation, (Root) => {
		React.render(<Root/>, document.getElementById('application'));
	});
	/*
  React.render(
    <Application />,
    document.getElementById('application')
  );
  */
};

