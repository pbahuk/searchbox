import React from "react";
import { render } from "react-dom";

// React component Imports.
import SearchBox from "./components/SearchBox";

import data from "./data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.setState({
      data
    });
  }

  render() {
    const { data = [] } = this.state;

    return (
      <div>
        <SearchBox />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
