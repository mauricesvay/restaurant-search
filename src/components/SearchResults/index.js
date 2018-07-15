import React, {Component} from 'react';
import RestaurantCard from '../RestaurantCard';
import './SearchResults.css';

class SearchResults extends Component {
  render() {
    const results = this.props.results;
    return (
      <div className="SearchResults">
        <ul className="SearchResults__list">
          {results.map((restaurant) => {
            return (
              <li className="SearchResults__result" key={restaurant.objectID}>
                <RestaurantCard restaurant={restaurant} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SearchResults;
