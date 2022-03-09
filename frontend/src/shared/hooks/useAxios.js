import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { BASE_URL } from '../../config/API';
import AuthContext from '../context/authContext';

axios.defaults.baseURL = BASE_URL;

const useAxios = ({ url, method = 'get', headers = null }) => {
  const location = useLocation();
  const { token } = useContext(AuthContext);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetState = () => {
    setResponse(null);
    setLoading(false);
    setError(null);
  };

  const fetchData = async (body = null) => {
    try {
      setError(false);
      setLoading(true);
      let { data } = await axios[method](url, body);
      setResponse(data);
    } catch (error) {
      setError(error);
    } finally {
      //Resetting response after post request
      if (method === 'post') setResponse(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    if (method === 'get') fetchData();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, headers, method, location.state?.rerender]);
  // Returns fetchData when we want to send a Request conditionally (ON BUTTON CLICK FOR EXEMPLE)
  return method === 'get'
    ? { response, loading, error }
    : { response, loading, error, fetchData, resetState };
};

export default useAxios;
