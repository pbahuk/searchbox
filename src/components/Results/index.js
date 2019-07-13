import React from "react";
import Styles from "./results.css";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursor: 0
    };
    this.refs = React.createRef();

    ["renderResults", "handleFocus"].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  handleFocus(event) {
    const target = event.target;
    const index = Number(target.dataset.index);

    this.props.changeActiveResult(index);
  }

  renderResults(results) {
    return results.map(result => {
      return (
        <div className={Styles.result} key={result.id}>
          <div className={Styles.name}>{result.name}</div>
          <div>{result.address}</div>
          <div>{result.pincode}</div>
          <div>{result.id}</div>
        </div>
      );
    });
  }

  render() {
    const { active, results } = this.props;

    if (results.length) {
      return (
        <div className={Styles.results}>
          {results.map((result, index) => {
            return (
              <div
                className={`${Styles.result} ${
                  active === index ? Styles.active : ""
                }`}
                ref={index}
                key={result.id}
                data-index={index}
                onMouseEnter={this.handleFocus}
              >
                <div className={Styles.name}>{result.name}</div>
                <div>{result.address}</div>
                <div>{result.pincode}</div>
                <div>{result.id}</div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div className={Styles.noresults}>No User found</div>;
    }
  }
}

// export default Results;
export default React.forwardRef((props, ref) => (
  <Results innerRef={ref} {...props} />
));
