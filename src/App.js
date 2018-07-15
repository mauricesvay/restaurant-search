import React, {Component} from 'react';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import './App.css';

const APPLICATION_ID = 'GSSRJE9CVZ';
const API_KEY = '615e7854eb8c66e0ead01ae02add074f';
const INDEX_NAME = 'dev_restaurant_search';
var client = algoliasearch(APPLICATION_ID, API_KEY);
var helper = algoliasearchHelper(client, INDEX_NAME, {
  facets: ['food_type', 'rounded_stars_count'],
  aroundLatLngViaIP: true,
  getRankingInfo: true,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      results: [],
    };

    helper.on('result', (content) => {
      console.log(content);
      this.setState({
        results: content.hits,
      });
    });
  }

  handleChange = (event) => {
    this.setState({q: event.target.value}, () => {
      helper.setQuery(this.state.q).search();
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="Search__q">Search</label>
          <input
            autoFocus
            placeholder="e.g: pizza, burger, sushi, café"
            type="search"
            name="q"
            id="Search_q"
            onKeyUp={this.handleChange}
            autoComplete="off"
          />
        </form>
        <div className="result">
          {this.state.results.map((result) => {
            return (
              <div key={result.objectID}>
                {result.name}
                ({result._rankingInfo.geoDistance / 1000}km)
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
