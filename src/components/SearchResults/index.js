import React, {Component} from 'react';
import RestaurantCard from '../RestaurantCard';
import './SearchResults.css';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadMoreClicked: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.setState({
        isLoadMoreClicked: false,
      });
    }
  }

  handleLoadMoreClicked = (event) => {
    this.setState({
      isLoadMoreClicked: true,
    });
    if (this.props.onLoadMoreClicked) {
      this.props.onLoadMoreClicked(event);
    }
  };

  renderPagination() {
    if (this.props.hasMorePages === true) {
      return (
        <div className="SearchResults__pagination">
          <button
            className="button --large"
            onClick={this.handleLoadMoreClicked}
            disabled={this.state.isLoadMoreClicked}
          >
            Load more {this.state.isLoadMoreClicked}
          </button>
        </div>
      );
    }
  }

  renderResults() {
    const results = this.props.results.map((restaurant) => {
      return (
        <li className="SearchResults__result" key={restaurant.objectID}>
          <RestaurantCard restaurant={restaurant} />
        </li>
      );
    });

    return <ul className="SearchResults__list">{results}</ul>;
  }

  render() {
    let results;
    if (this.props.results.length) {
      results = this.renderResults();
    } else {
      if (this.props.q !== '') {
        results = (
          <div className="SearchResults__empty">
            No results.<br/>
            <em>Tip: You can search restaurants by name, or by cuisine.</em>
          </div>
        );
      }
    }

    return (
      <div className="SearchResults">
        {results}
        {this.renderPagination()}
      </div>
    );
  }
}

export default SearchResults;
