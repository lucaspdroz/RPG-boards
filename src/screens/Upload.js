import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      const { title, description, author, url } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
        url
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
                      <div>{board.author}</div>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;