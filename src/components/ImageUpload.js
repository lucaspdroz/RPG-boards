import React, { useState } from 'react';
import PropTypes from 'prop-types'; // good practices, props corretly
import { storage } from '../Firebase';

function ImageUpload({ onUploadImage }) {
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (myImage) => {
    if (myImage != null) {
      const thing = myImage.target.files[0];
      handleUpload(thing);
    } else {
      console.log("vazio");
    }
  }

  const handleUpload = (image) => {
    // Ternary that tests if file image input is filled, return null
    const uploadTask = image && storage.ref(`images/${image.name}`).put(image);
    if (uploadTask) {
      // Aki
      uploadTask.on('state_changed',
        (snapshot) => {
          // progrss function ....
          const theProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(theProgress);
        },
        (error) => {
          // error function ....
          console.log(error);
        },
        () => {
          // complete function ....       
          storage.ref('images').child(image.name).getDownloadURL().then(theUrl => {
            onUploadImage(theUrl);
            setUrl(theUrl);
          })
        });
    }
  }

  const style = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <div style={style}>
      <label htmlFor="file-upload" className="custom-file-upload">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9001 4.03333C12.4333 1.73343 10.4333 0 8 0C6.06673 0 4.40007 1.09993 3.56673 2.7C1.56673 2.9001 0 4.6 0 6.66667C0 8.86653 1.8 10.6667 4 10.6667H12.6667C14.5 10.6667 16 9.16667 16 7.33333C16 5.56673 14.6335 4.13333 12.9001 4.03333ZM9.06667 6V8.53333H6.93333V6H4.66667L8 2.66667L11.3333 6H9.06667Z" fill="black" />
        </svg>&nbsp; Custom Upload
      </label>
      <input id="file-upload" type="file" onChange={handleChange} />
      <img src={url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="100" width="400" value={url} name="image" />
      <progress value={progress} max="100" />
    </div>
  )
}

ImageUpload.propTypes = {
  onUploadImage: PropTypes.func.isRequired,
}

export default ImageUpload;