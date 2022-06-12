import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RepoTable from './components/repoTable.jsx';
import Repository from './components/repository.jsx';

export function App() {
  const [API, setAPI] = useState<any[]>([]);

  // TODO: Erorr handling middleware
  // Doesn't work?
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  useEffect(() => {
    fetch('http://localhost:4000/repos')
      .then(handleError)
      .then((res) => res.json())
      .then((data) => setAPI(data))
      .catch((error) => {
        console.error('There was an error fetching from localhost repo', error);
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RepoTable repoAPI={API} />} />
        <Route path="/:id" element={<Repository />} />
      </Routes>
    </div>
  );
}
