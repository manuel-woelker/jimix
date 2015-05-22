import React from "react";
import NavigationBar from "./NavigationBar.js";
import MbeanListContainer from "../mbeans/list/MbeanListContainer.js";
import MbeanDetailsContainer from "../mbeans/details/MbeanDetailsContainer.js";

import {Input, Button, Glyphicon} from "react-bootstrap";

export default React.createClass({
  render: function () {
    return (
      <div>
        <NavigationBar />
        <br />
        <br />
        <br />

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <MbeanListContainer />
              <br />
            </div>
            <div className="col-md-8">
              <MbeanDetailsContainer />
            </div>
          </div>
        </div>
      </div>

    );
  }
});