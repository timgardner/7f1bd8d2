import React, { Component } from 'react';

import Loader from './Loader';
import Error from './Error';
import PeopleList from './PeopleList';
import {loadPeople} from './util';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      error: ''
    }
  }
  componentDidMount() {
    loadPeople()
      .then(people => {
        this.setState({people, loading: false});
      })
      .catch(error => {
        this.setState({error: error.message, loading: false});
      })
  }
  render() {
   if(this.state.loading) {
     return <Loader />
   } else if (this.state.error) {
     return <Error errorMessage={this.state.error} />
   } else {
     return <PeopleList people={Object.keys(this.state.people).map(personId => this.state.people[personId])} />
   }
  
  }
}

export default App;
