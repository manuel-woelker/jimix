import React from "react";

import {Input, Button, Glyphicon, Panel} from "react-bootstrap";

export default React.createClass({
  render: function () {
    return (
      <div>
        <form>
          <Input type='text' addonAfter={<Glyphicon glyph='remove' />}/>
        </form>
        <Panel header={<h4>Header</h4>}>
          Panel content
        </Panel>

      </div>
    );
  }
});