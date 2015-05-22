import React from "react";
import request from 'superagent';

import {Input, Button, Glyphicon, Panel, Well} from "react-bootstrap";

export default React.createClass({
  getInitialState() {
    request
      .get('/jimix/api/inventory')
      .end((err, res) => {
        this.setState(res.body);
      });
    return {
      mbeans: []
    };
  },

  render: function () {
    return (
      <div>
        <form>
          <Input type='text' addonAfter={<Glyphicon glyph='remove' />}/>
        </form>
        <Well bsSize='small' style={{overflow: "hidden"}}>
          <bold style={{fontWeight: "bold"}}>Header</bold>
          {this.state.mbeans.map(mbean => {
            return <div key={mbean.objectName}>{mbean.objectName}</div>;
          })}
          {/*JSON.stringify(this.state.mbeans)*/}
        </Well>

      </div>
    );
  }
});