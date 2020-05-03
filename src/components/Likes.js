import React from 'react';
class Likes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      likes: 15,
      updated: false
    }
    this.updateLikes = this.updateLikes.bind(this);
  }


  updateLikes() {
    if (!this.state.updated) {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes + 1,
          updated: true
        };
      });
    } else {

      this.setState((prevState, props) => {
        return {
          likes: prevState.likes - 1,
          updated: false
        };
      });
    }
  }

  render() {
    return (
      <div>
        <button className="btn btn-like" onClick={this.updateLikes}>{this.state.likes} Likes</button>
      </div>
    );
  }
}

export default Likes;