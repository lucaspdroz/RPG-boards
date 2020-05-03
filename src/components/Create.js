import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import arrow from '../assets/Arrow.svg';
import ImageUpload from './ImageUpload';

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      title: '',
      description: '',
      author: '',
      url: '',
      st: 10,
      dx: 10,
      iq: 10,
      ht: 10,
      hp: 10,
      will: 10,
      per: 10,
      fp: 10
    };
  }

  onChange = (e) => {
    const state = { ...this.state };
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onUploadImage = (imgUrl) => {
    this.setState({ url: imgUrl });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, author, url, st, dx, iq, ht, hp, will, per, fp } = this.state;
    this.ref.add({
      title,
      description,
      author,
      url,
      st, dx, iq, ht, hp, will, per, fp
    }).then(() => {
      this.setState({
        title: '',
        description: '',
        author: '',
        url: '',
        st: '',
        dx: '',
        iq: '',
        ht: '',
        hp: '',
        will: '',
        per: '',
        fp: ''
      });
      this.props.history.push("/")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { title, description, author, st, dx, iq, ht, hp, will, per, fp } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4><Link to="/" className="btn btn-primary"><img src={arrow} alt="back to previews page"></img></Link></h4>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <h3 className="panel-title">
                Criar personagem
            </h3>
              <div className="form-group">
                <label htmlFor="title">personagem:</label>
                <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Nome do personagem" required />
              </div>
              <label htmlFor="author">Player:</label>
                <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Player" />
              <div className="points">
                <div className="form-group">
                  <label htmlFor="title">ST:</label>
                  <input type="number" className="form-control" name="st" value={st} onChange={this.onChange} placeholder="Title" required />
                </div>
                <div className="form-group">
                  <label htmlFor="dx">DX:</label>
                  <input type="number" className="form-control" name="dx" value={dx} onChange={this.onChange} placeholder="Title" required />
                </div>
                <div className="form-group">
                  <label htmlFor="iq">IQ:</label>
                  <input type="number" className="form-control" name="iq" value={iq} onChange={this.onChange} placeholder="Title" required />
                </div>
                <div className="form-group">
                  <label htmlFor="ht">HT:</label>
                  <input type="number" className="form-control" name="ht" value={ht} onChange={this.onChange} placeholder="Title" required />
                </div>
                <div className="form-group">
                  <label htmlFor="hp">HP:</label>
                  <input type="number" className="form-control" name="hp" value={hp} onChange={this.onChange} placeholder="Title" required />
                </div>
                <div className="form-group">
                  <label htmlFor="will">WILL:</label>
                  <input type="number" className="form-control" name="will" value={will} onChange={this.onChange} placeholder="Title" required />
                </div>
                <div className="form-group">
                  <label htmlFor="per">PER:</label>
                  <input type="number" className="form-control" name="per" value={per} onChange={this.onChange} placeholder="Title" required />
                </div>
                <div className="form-group">
                  <label htmlFor="fp"> FP:</label>
                  <input type="number" className="form-control" name="fp" value={fp} onChange={this.onChange} placeholder="Title" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label><br></br>
                <textarea className="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3" value={description}></textarea>
              </div>
              <div className="form-group">
             
                <ImageUpload onUploadImage={this.onUploadImage} />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;