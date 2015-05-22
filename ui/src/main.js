import Application from "./application/Application.js";
import React from "react";

require("bootstrap/dist/css/bootstrap.css");
require("./style/style.css");


window.onload = function() {
  React.render(
    <Application />,
    document.getElementById('application')
  );
};

