import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  // Use useState to manage 'a' state
  const [a, setA] = useState("Loading...");

  // Function to fetch data
  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user'); // Await the axios request
      setA(response.data); // Update state with fetched data
      console.log(response.data); // Log the actual response data
    } catch (error) {
      console.error("Error fetching data: ", error);
      setA("Error fetching data");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      Home: {a}
    </div>
  );
};

export default Home;
