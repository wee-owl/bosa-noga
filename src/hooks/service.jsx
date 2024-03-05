import { useEffect, useState } from 'react';


const service = (url) => {
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let boo = false;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!boo) {
          setData(data);
          setLoading(false);
        } 
      })
      .catch(e => {
        if (!boo) {
          setError(e.message);
          setLoading(false);
        }
      })
    return () => {
      boo = true;
    };
  }, [url]);
  return { data, isLoading, error };
};

export default service;
