import React from "react";
import Styles from "./searchBox.css";
import fetchResults from "../services";

// Component Imports.
import Results from "../Results";

// Utils import.
import debounce from "../utils";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    [
      "handleChange",
      "successCallback",
      "errorCallback",
      "handleKeyDown",
      "changeActiveResult"
    ].forEach(method => {
      this[method] = this[method].bind(this);
    });
    this.effiecientFetch = debounce(fetchResults, 500);
    this.refs = React.createRef();

    this.state = {
      searchText: "",
      error: "",
      results: [],
      cursor: undefined
    };
  }

  successCallback(response) {
    const { primary, secondary } = response;

    this.setState({
      results: [...primary, ...secondary]
    });
  }

  errorCallback(err) {
    console.error("[Error while fetching the data]", err);
    this.setState({
      error: true
    });
  }

  handleKeyDown(event) {
    const { cursor, results } = this.state;

    if (event.keyCode === 38 && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    } else if (event.keyCode === 40 && cursor < results.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    } else if (event.keyCode === 40 && cursor === undefined) {
      this.setState({
        cursor: 0
      });
    }

    // Ref logic to be fixed.
    console.log("REFSSSSS", this.refs, this.state.cursor);
    // this.refs[cursor].scrollIntoView({
    //   block: "end",
    //   behavior: "smooth"
    // });
  }

  changeActiveResult(index) {
    this.setState({
      cursor: index
    });
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState(
      {
        searchText: event.target.value
      },
      () => {
        this.effiecientFetch(value, this.successCallback, this.errorCallback);
      }
    );
  }

  render() {
    const { searchText, error, results } = this.state;

    return (
      <div className={Styles.executive} onKeyDown={this.handleKeyDown}>
        <input
          id="searchText"
          value={searchText}
          onChange={this.handleChange}
          placeholder="Search by ID, address, name"
        />
        {error && <div className={Styles.error}> {error}</div>}
        {searchText.length > 0 && (
          <Results
            data={this.state.data}
            results={results}
            ref={this.refs}
            active={this.state.cursor}
            changeActiveResult={this.changeActiveResult}
          />
        )}
      </div>
    );
  }
}

export default SearchBox;
