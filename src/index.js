import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

var restInstance = axios.create({
  baseURL: 'http://localhost:3003'
});
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Card extends React.Component {
  render() {
    const cardStyle = {
      height: 380,
      width: 650,
      margin: 40,
      backgroundColor: '#FFF',
      textAlign: 'center'
    };
    return (
      <div style={cardStyle}>
        {this.props.data.name.first}
      </div>
    );
  }
};

class NewCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'lalal'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    console.log('!!!')
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    restInstance.post('/movie', {
      url: this.state.value
    })
    .then((response) => {
      
    })
    .catch((error) => {
      console.log('Holly molly', error);
    })
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="newCardInput">New Movie:
          <input name="newCardInput" type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    var vm = this;
    this.serverRequest = restInstance.get('https://api.randomuser.me/?results=5')
      .then((result) => {
        vm.setState({
          movies: result.data.results
        });
      });
  }

  render() {
    return (
      <div className="game">
        <NewCardForm/>
        {this.state.movies.map(function(movie) {
            return <Card key={movie.email} data={movie}/>;
        })}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<CardList />, document.getElementById("root"));