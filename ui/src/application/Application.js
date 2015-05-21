import React from "react";
import NavigationBar from "./NavigationBar.js";

import {Input, Button, Glyphicon} from "react-bootstrap";

export default React.createClass({
  render: function() {
    return (
      <div>
        <NavigationBar />
        <br />
        <br />
        <br />
        <form>
          <Input type='text' addonAfter={<Glyphicon glyph='remove' />} />
        </form>
      </div>
    );
  }
});