import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dice from '../components/Dice';
import '../App.css';
import firebase from '../Firebase';


class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author, url, st, dx, iq, ht, hp, will, per, fp } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
        url,
        st, dx, iq, ht, hp, will, per, fp
      });
    });
    this.setState({
      boards
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading" />
          <div className="panel-body">
            <h4><Link to="/create" className="add-post"></Link></h4>
            <ul className="table">
              {this.state.boards.map((board, i) =>
                <li key={`nav-${this.state.key}-${i}`} className="wrapper, card">
                  <Link to={`/show/${board.key}`} >
                    <img className="card-bg" src={board.url} alt="background post"></img>
                    <div className="card-content">
                      <div className="title">{board.title}</div>
                      <h4>{board.author}</h4>
                      <div className="show-status">
                        <div className="points">ST: <div>{board.st}</div></div>
                        <div className="points">DX: <div>{board.dx}</div></div>
                        <div className="points">IQ: <div>{board.iq}</div></div>
                        <div className="points">HT: <div>{board.ht}</div></div>
                        <div className="points">HP: <div>{board.hp}</div></div>
                        <div className="points">WILL<div>{board.will}</div></div>
                        <div className="points">PER:<div>{board.per}</div></div>
                        <div className="points">FP: <div>{board.fp}</div></div>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="side-menu">
          <Dice></Dice>
        </div>
      </div>
    );
  }
}

export default App;