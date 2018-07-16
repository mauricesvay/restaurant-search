import React, {Component} from 'react';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import FacetCuisine from './components/FacetCuisine';
import './App.css';
import algoliaLogo from './algolia-logo.svg';

const APPLICATION_ID = 'GSSRJE9CVZ';
const API_KEY = '615e7854eb8c66e0ead01ae02add074f';
const INDEX_NAME = 'dev_restaurant_search';
var client = algoliasearch(APPLICATION_ID, API_KEY);
var helper = algoliasearchHelper(client, INDEX_NAME, {
  facets: ['food_type', 'rounded_stars_count'],
  aroundLatLngViaIP: true,
  hitsPerPage: 4 * 3 * 2,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      results: [],
      facetFoodType: [],
      facetStarsCount: [],
      page: 0,
      nbPages: 0,
      hasMorePages: false,
    };

    helper.on('result', (content) => {
      console.log(content);
      const hasMorePages = content.page < content.nbPages - 1;
      const currentPage = helper.getPage();
      const results =
        currentPage === 0
          ? content.hits
          : this.state.results.concat(content.hits);
      this.setState({
        results: results,
        facetFoodType: content.getFacetValues('food_type'),
        facetStarsCount: content.getFacetValues('rounded_stars_count'),
        page: content.page,
        nbPages: content.nbPages,
        hasMorePages: hasMorePages,
      });
    });
  }

  componentDidMount() {
    helper.setQuery(this.state.q).search();
  }

  handleChange = (event) => {
    this.setState({q: event.target.value}, () => {
      helper.setQuery(this.state.q).search();
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleLoadMoreClicked = (event) => {
    helper.setPage(helper.getPage() + 1).search();
  };

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <form onSubmit={this.handleSubmit}>
            <SearchBar onKeyUp={this.handleChange} />
          </form>
        </header>
        <div className="App_results">
          <div className="App_facets">
            <FacetCuisine
              cuisines={this.state.facetFoodType}
              onClick={(name) => {
                helper.toggleFacetRefinement('food_type', name).search();
              }}
            />

            {/* <div className="facet">
              <h2 className="facet__title">Rating</h2>
              {this.state.facetStarsCount.map((starCount) => {
                return (
                  <div key={starCount.name}>
                    {starCount.name} ({starCount.count})
                  </div>
                );
              })}
            </div> */}

            <div className="App__credits">
              <a href="https://www.algolia.com/">
                <img src={algoliaLogo} alt="Algolia" width="14" height="14" />{' '}
                Search by Algolia
              </a>
            </div>
          </div>
          <SearchResults
            q={this.state.q}
            results={this.state.results}
            hasMorePages={this.state.hasMorePages}
            currentPage={this.state.page}
            onLoadMoreClicked={this.handleLoadMoreClicked}
          />
        </div>
      </div>
    );
  }
}

export default App;
