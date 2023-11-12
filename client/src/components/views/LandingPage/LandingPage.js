import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage() {
  useEffect(() => {
    async function fetchdata() {
      const { data } = await axios.get('/api/hello');
      console.log(data);
    }
    fetchdata();
  }, []);

  return (
    <div>
      LandingPage
    </div>
  );
}

export default LandingPage;
