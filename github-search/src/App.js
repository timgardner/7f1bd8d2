import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import throttle from 'lodash.throttle';

import Loader from './Loader';
import Error from './Error';
import User from './User';
import SearchForm from './SearchForm';
import {searchUsers} from './api';


const searchUsersThrottled = throttle(searchUsers, 500);

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
      isLoading: false,
      results: []
    }

    this.onSearchTermChange = this.onSearchTermChange.bind(this);
  }
  onSearchTermChange(searchTerm) {
    this.setState({searchTerm});

    if(searchTerm.length >= 3) {
      this.setState({isLoading: true, results: []});

      searchUsersThrottled(searchTerm)
        .then(users => {
          this.setState({results: users});
        })
        .catch(error => {
          this.setState({error: error.message, results: []});
        })
        .then(() => this.setState({isLoading: false}));
    } else { 
      this.setState({results: []});
    }
  }
  render() {
    return <div className="row">
        <div className="col-md-12">
         <SearchForm searchTerm={this.state.searchTerm} onSearchTermChange={this.onSearchTermChange}/>
         {this.state.isLoading ? <Loader /> : null}
         {this.state.error ? <Error errorMessage={this.state.error} /> : null}
         {chunk(this.state.results, 2).map((row, i) => <ResultsRow key={i} results={row} />)}
        </div>
      </div>
  }
}

const ResultsRow = ({results}) => (
  <div className="row">
  {results.map((result, i) =>  <div key={i} className="col-md-6"><User {...result} /></div>)}
  </div>);


export default App;
