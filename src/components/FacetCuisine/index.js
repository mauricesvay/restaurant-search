import React, {Component} from 'react';
import './FacetCuisine.css';

const MAX_VISIBLE_CUISINES = 15;

class FacetCuisine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  handleClick = (event) => {
    const target = event.currentTarget;
    if (this.props.onClick) {
      this.props.onClick(target.getAttribute('data-name'));
    }
  };

  renderSecondaryCuisines(cuisines) {
    if (!cuisines.length) {
      return null;
    }

    if (!this.state.isExpanded) {
      return (
        <div className="facet__more">
          <button
            onClick={() => {
              this.setState({
                isExpanded: true,
              });
            }}
          >
            See all
          </button>
        </div>
      );
    }

    const list = cuisines.map(this.renderCuisine);
    return <ul>{list}</ul>;
  }

  renderCuisine = (cuisine) => {
    return (
      <li
        key={cuisine.name}
        data-name={cuisine.name}
        onClick={this.handleClick}
      >
        <span className="facet__name" title={cuisine.name}>
          {cuisine.name}
        </span>
        <span className="facet__count">
          {this.props.isRefined ? '✕' : cuisine.count}
        </span>
      </li>
    );
  };

  renderCuisines() {
    const mainCuisines = this.props.cuisines.slice(0, MAX_VISIBLE_CUISINES);
    const secondaryCuisines = this.props.cuisines.slice(MAX_VISIBLE_CUISINES);
    return (
      <div>
        <ul>{mainCuisines.map(this.renderCuisine)}</ul>
        {this.renderSecondaryCuisines(secondaryCuisines)}
      </div>
    );
  }

  render() {
    return (
      <div className="FacetCuisine facet">
        <h2 className="facet__title">Cuisine</h2>
        {this.renderCuisines()}
      </div>
    );
  }
}

export default FacetCuisine;
