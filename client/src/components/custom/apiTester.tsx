"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';

interface RequestComponentProps {
    getUrl: string;
    postUrl: string;
  }
  
const ApiTester: React.FC<RequestComponentProps> = ({ getUrl, postUrl }) => {
  const [data, setData] = useState(null);
  const [postResponse, setPostResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getUrl);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [getUrl]);

  const handlePostRequest = async () => {
    try {
      const response = await axios.post(postUrl, { key: 'patkanyny' });
      setPostResponse(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
        <h2>GET</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <br/>

        <Button onClick={handlePostRequest} variant="default">post req send</Button>
        <h2>POST</h2>
        <pre>{JSON.stringify(postResponse, null, 2)}</pre>
    </div>
  );
};

export default ApiTester;
