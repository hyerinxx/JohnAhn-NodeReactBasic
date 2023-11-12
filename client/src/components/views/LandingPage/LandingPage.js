import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchdata() {
      const { data } = await axios.get('/api/hello');
      console.log(data);
    }
    fetchdata();
  }, []);

  const onClickHandler = function() {
    axios.get('/api/users/logout')
    .then(response => {
      if(response.data.success) {
        navigate("/login");
      } else {
        alert("Logout Error");
      }
    });
  };

  return (
    <div
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}
    >
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>
        Logout
      </button>
    </div>
  );
}

export default LandingPage;
