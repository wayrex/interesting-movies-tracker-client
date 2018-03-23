import React from 'react';
import axios from 'axios';

import NewCardForm from '../../components/NewCardForm';
import CardList from '../../components/CardList';

var restInstance = axios.create({
  baseURL: 'http://localhost:3003'
});

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }
  componentDidMount() {
    let vm = this;
    console.log(vm);
    restInstance.get('/movies')
      .then((response) => {
        vm.setState({
          movies: response.data.movies
        });
      });
  }
  addMovie(movieUrl) {
    let vm = this;
    return restInstance.post('/movies', {
      url: movieUrl
    })
    .then((response) => {
      vm.setState({
        movies: [response.data, ...vm.state.movies]
      })
    });
  }
  render() {
    return (
      <div>
        <NewCardForm addMovie={this.addMovie.bind(this)}/>
        <header><h1>Top Movies</h1></header>
        <CardList movies={this.state.movies}/>
      </div>
    );
  }
}

export default Movies;