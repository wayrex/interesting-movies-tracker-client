import React from 'react';
import Card from './Card';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: props.movies
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({movies: newProps.movies});
  }

  // componentDidMount() {
  //   var vm = this;
  //   this.serverRequest = restInstance.get('/movies')
  //     .then((result) => {
  //       vm.setState({
  //         movies: result.data.movies
  //       });
  //     });
  // }
  showMovies() {
    if(!this.state.movies || !this.state.movies.length) {
      return <div>No movies have been added yet</div>
    } else {
      return this.state.movies.map(function(movie) {
        return <Card key={movie.dateAdded} data={movie}/>;
      })
    }
  }

  render() {
    return (
      <div className="game">
        {this.showMovies()}
      </div>
    );
  }
}

export default CardList;