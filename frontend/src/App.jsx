import { useEffect } from 'react';
import api from './api';

function App() {
  useEffect(() => {
    api.get('/api/test') // Adjust path to your backend endpoint
      .then(response => console.log(response.data))
      .catch(error => console.error('API error:', error));
  }, []);

  return <div>Hello from React!</div>;
}

export default App;