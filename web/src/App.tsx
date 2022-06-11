import { useEffect, useState } from 'react';
import './App.css';

export function App() {
  const [API, setAPI] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/repos')
      .then((res) => res.json())
      .then((data) => setAPI(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>Repos</h1>
      <h2>{API}</h2>
    </div>
  );
}
