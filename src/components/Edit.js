import React, { useState, useEffect } from 'react';
import firebase from '../Firebase';
// import { Link } from 'react-router-dom';
// import arrow from '../assets/Arrow.svg';

function Edit(props) {
  const [inputItems, setResponseItems] = useState({
    key: '',
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
  });

  const onChange = (e) => {
    switch (e.target.name) {
      case 'title':
        setResponseItems({
          ...inputItems,
          title: e.target.value
        });
        break;

      case 'description':
        setResponseItems({
          ...inputItems,
          description: e.target.value
        });
        break;

      case 'st':
        setResponseItems({
          ...inputItems,
          st: e.target.value
        });
        break;

      case 'dx':
        setResponseItems({
          ...inputItems,
          dx: e.target.value
        });
        break;

      case 'iq':
        setResponseItems({
          ...inputItems,
          iq: e.target.value
        });
        break;

      case 'ht':
        setResponseItems({
          ...inputItems,
          ht: e.target.value
        });
        break;


      case 'hp':
        setResponseItems({
          ...inputItems,
          hp: e.target.value
        });
        break;


      case 'will':
        setResponseItems({
          ...inputItems,
          will: e.target.value
        });
        break;


      case 'per':
        setResponseItems({
          ...inputItems,
          per: e.target.value
        });
        break;
      case 'fp':
        setResponseItems({
          ...inputItems,
          fp: e.target.value
        });
        break;
      default:
        console.error(`campo: ${e.target.name}, inexistente`);
        break;
    }
  }

  const onSubmit = (e) => {
    const updadeRef = firebase.firestore().collection('boards').doc(inputItems.key);
    e.preventDefault();
    const { title, description, author, url, st, dx, iq, ht, hp, will, per, fp } = inputItems;
    updadeRef.set({
      title,
      description,
      author,
      url,
      st,
      dx,
      iq,
      ht,
      hp,
      will,
      per,
      fp
    }).then((docRef) => {
      setResponseItems({
        key: '',
        title: '',
        description: '',
        author: '',
        url,
        st: '',
        dx: '',
        iq: '',
        ht: '',
        hp: '',
        will,
        per,
        fp
      });
      props.history.push("/show/" + props.match.params.id)
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  useEffect(() => {
    const fetch = async () => {
      const dbConnection = firebase.firestore().collection('boards').doc(props.match.params.id);
      try {
        const doc = await dbConnection.get();
        if (doc.exists) {
          const board = doc.data();
          setResponseItems({
            key: doc.id,
            title: board.title,
            description: board.description,
            author: board.author,
            url: board.url,
            st: board.st,
            dx: board.dx,
            iq: board.iq,
            ht: board.ht,
            hp: board.hp,
            will: board.will,
            per: board.per,
            fp: board.fp
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetch();
  }, [props.match.params.id]);

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          {/* <h4><Link to="/" className="btn btn-primary"><img src={arrow} alt="back to previews page"></img></Link></h4> */}
          <h3 className="panel-title">
            EDIT POST
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" className="form-control" name="title" value={inputItems.title} onChange={onChange} placeholder="Title" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input type="text" className="form-control" name="description" value={inputItems.description} onChange={onChange} placeholder="Description" />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input type="text" className="form-control" name="author" value={inputItems.author} onChange={onChange} placeholder="Author" />
            </div>
            <div className="points">
              <div className="form-group">
                <label htmlFor="st">ST:</label>
                <input type="number" className="form-control" name="st" value={inputItems.st} onChange={onChange} placeholder="st" />
              </div>
              <div className="form-group">
                <label htmlFor="dx">DX:</label>
                <input type="number" className="form-control" name="dx" value={inputItems.dx} onChange={onChange} placeholder="st" />
              </div>
              <div className="form-group">
                <label htmlFor="iq">IQ:</label>
                <input type="number" className="form-control" name="iq" value={inputItems.iq} onChange={onChange} placeholder="st" />
              </div>
              <div className="form-group">
                <label htmlFor="ht">ST:</label>
                <input type="number" className="form-control" name="ht" value={inputItems.ht} onChange={onChange} placeholder="st" />
              </div>
              <div className="form-group">
                <label htmlFor="hp">HP:</label>
                <input type="number" className="form-control" name="hp" value={inputItems.hp} onChange={onChange} placeholder="st" />
              </div>
              <div className="form-group">
                <label htmlFor="will">Will:</label>
                <input type="number" className="form-control" name="will" value={inputItems.will} onChange={onChange} placeholder="st" />
              </div>
              <div className="form-group">
                <label htmlFor="per">PER:</label>
                <input type="number" className="form-control" name="per" value={inputItems.per} onChange={onChange} placeholder="st" />
              </div>
              <div className="form-group">
                <label htmlFor="fp">FP:</label>
                <input type="number" className="form-control" name="fp" value={inputItems.fp} onChange={onChange} placeholder="fp" />
              </div>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}



export default Edit;