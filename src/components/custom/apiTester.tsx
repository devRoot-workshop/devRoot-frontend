"use client";
 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { signInWithGoogle, signOutWithGoogle } from '../../lib/firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../firebase';
import Image from 'next/image';
 
interface RequestComponentProps {
  getUrl: string;
  postUrl: string;
}
 
interface User {
  idToken: string;
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
}
 
const ApiTester: React.FC<RequestComponentProps> = ({ getUrl, postUrl }) => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [postResponse, setPostResponse] = useState<Record<string, any> | null>(null);
  const [user, setUser] = useState<User | null>(null);
 
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
 
      try {
        const response = await axios.get(getUrl, {headers: {'Authorization': `Bearer ${user.idToken}`}});
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, [getUrl, user]);
 
  useEffect(() => {
    const handleAuthChange = async (currentUser: any) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setUser({
          idToken,
          uid: currentUser.uid,
          displayName: currentUser.displayName || "Unknown User",
          photoURL: currentUser.photoURL || "",
          email: currentUser.email || "No Email",
        });
      } else {
        setUser(null);
      }
    };
 
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      handleAuthChange(currentUser);
    });
 
    return () => unsubscribe();
  }, []);
 
  const handlePostRequest = async () => {
    try {
      const response = await axios.post(postUrl, { name: 'budos patkany', type: 0 });
      setPostResponse(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
 
  const handleLogin = async () => {
    try {
      const userData = await signInWithGoogle();
      setUser({
        idToken: await userData!.getIdToken(),
        uid: userData!.uid,
        displayName: userData!.displayName || 'Unknown User',
        photoURL: userData!.photoURL || '',
        email: userData!.email || 'No Email',
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };
 
  const handleLogout = async () => {
    try {
      await signOutWithGoogle();
      setUser(null);
      setData(null);
      setPostResponse(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
 
  return (
    <div>
        <div>
          {user! ? (
            <div>
            <h1>Welcome, {user.displayName}</h1>
            <Image src={user.photoURL} alt="User Profile" width={100} />
            <button onClick={handleLogout}>Logout</button>
          </div>
          ) : 
            <div>
              <h1>nem vagy bejelentkezve lol. tedd meg itt:</h1>
              <button onClick={handleLogin}>loginolj</button>
            </div>
          }
 
 
          <div>
            <h2>GET</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <br />
            <button onClick={handlePostRequest}>Send POST Request</button>
            <h2>POST</h2>
            <pre>{JSON.stringify(postResponse, null, 2)}</pre>
          </div>
        </div>
    </div>
  );
};
 
export default ApiTester;