import React from "react";
import request from 'superagent';
import Reflux from 'reflux';
import InventoryStore from '../../inventory/InventoryStore.js';

import {Input, Button, Glyphicon, Panel, Well} from "react-bootstrap";

export default React.createClass({
  mixins: [Reflux.connect(InventoryStore,"inventory")],

  render: function () {
    let inventory = this.state.inventory;
    if(!inventory) {
      return null;
    }
    return (
      <div>
        <form>
          <Input type='text' addonAfter={<Glyphicon glyph='remove' />}/>
        </form>
        {inventory.domains.map(domain => {
          return <Well className="domain" key={domain.name} bsSize='small' style={{overflow: "hidden"}}>
          <bold style={{fontWeight: "bold"}}>{domain.name}</bold>
          {domain.mbeans.map(mbean => {
            return <div className="mbean" key={mbean.objectName}>{mbean.objectName}</div>;
          })}
          {/*JSON.stringify(this.state.mbeans)*/}
        </Well>;
        })}

      </div>
    );
  }
});