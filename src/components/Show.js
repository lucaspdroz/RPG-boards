import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import arrow from '../assets/Arrow.svg';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id) {
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>
              <Link to="/" className="btn btn-primary">
                <img src={arrow} alt="back to previews page"></img>
              </Link>
            </h4>
          </div>
          <div className="panel-body">
            <ul>
              <li key={this.state.key} >
                <img className="show-image" src={this.state.board.url} alt={this.state.board.url}></img>
                <h3 className="panel-title">
                  {this.state.board.title}
                </h3>
                <div className="panel-author">{this.state.board.author}</div>
                <p className="description">{this.state.board.description}</p>
                <p className="points">ST:   &nbsp;&nbsp;&nbsp;{this.state.board.st}</p>
                <p className="points">DX:   &nbsp;&nbsp;&nbsp;{this.state.board.dx}</p>
                <p className="points">IQ:   &nbsp;&nbsp;&nbsp;{this.state.board.iq}</p>
                <p className="points">HT:   &nbsp;&nbsp;&nbsp;{this.state.board.ht}</p>
                <p className="points">HP:   &nbsp;&nbsp;&nbsp;{this.state.board.hp}</p>
                <p className="points">WILL: &nbsp;&nbsp;&nbsp;{this.state.board.will}</p>
                <p className="points">PER:  &nbsp;&nbsp;&nbsp;{this.state.board.per}</p>
                <p className="points">FP:   &nbsp;&nbsp;&nbsp;{this.state.board.fp}</p>
              </li>
            </ul>
          </div>
          <div className='side-menu'>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} className="btn">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;