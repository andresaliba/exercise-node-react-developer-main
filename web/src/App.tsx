import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { RepoTable } from './components/repoTable.jsx';

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
      <Routes>
        <Route path="/" element={<RepoTable repoAPI={API} />} />
      </Routes>
    </div>
  );
}
