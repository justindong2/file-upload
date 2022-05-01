import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const url = 'http://localhost:5000';
const url = '/api';

const Home = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const uploadFile = (event) => {
    setFile(event.target.files[0]);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (!file) {
      console.log('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      // const response = await fetch(`${url}/file`, {
      //   method: 'POST',
      //   body: formData,
      // });
      const response = await axios.post(`${url}/file`, formData);
      // return response;
    } catch (err) {
      console.log(err);
    }
    navigate('/files');
  };

  return (
    <div>
      <form
        // action={`${url}/file`}
        encType="multipart/form-data"
        // method="post"
      >
        <input type="file" name="file" onChange={uploadFile}></input>
        {/* <input type="submit" value="Upload"></input> */}
        <button type="button" onClick={submitForm}>Upload</button>
      </form>
    </div>
  );
};

export default Home;
