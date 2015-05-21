import React from "react";
import {Navbar} from "react-bootstrap";

export default React.createClass({
  render() {
    return <Navbar fixedTop={true} fluid={true} brand={<a href="#">jimix</a>}>
    </Navbar>;
  }
})