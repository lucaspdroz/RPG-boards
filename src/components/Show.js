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
                <div className="show-status">
                  <div className="points">ST: <div>{this.state.board.st}</div></div>
                  <div className="points">DX: <div>{this.state.board.dx}</div></div>
                  <div className="points">IQ: <div>{this.state.board.iq}</div></div>
                  <div className="points">HT: <div>{this.state.board.ht}</div></div>
                  <div className="points">HP: <div>{this.state.board.hp}</div></div>
                  <div className="points">WILL<div>{this.state.board.will}</div></div>
                  <div className="points">PER:<div>{this.state.board.per}</div></div>
                  <div className="points">FP: <div>{this.state.board.fp}</div></div>
                </div>
                <p className="description">{this.state.board.description}</p>

              </li>
            </ul>
          </div>
          <div className='side-menu'>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            {/* <button onClick={this.delete.bind(this, this.state.key)} className="btn">Delete</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Show;