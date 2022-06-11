import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Repository = () => {
  // get repository name from url param
  const { id } = useParams();

  const [repoAPI, setRepoAPI] = useState([]);

  // fetch the data from the API using Axios
  const fetchData = async () => {
    try {
      await axios(
        `https://api.github.com/repos/silverorange/${id}/branches/master`
      )
        .then((res) => {
          // Set the data to the repoAPI state
          setRepoAPI(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error('Axios - Error fetching repository data: ', err);
        });
    } catch (error) {
      console.error('Try/Catch error fetching API data: ', error);
    }
  };

  // fetch data on component mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div className="repository">
        <Link to="/"> Go Back </Link>
        <h1>Repository: {id} </h1>
      </div>
    </>
  );
};
export default Repository;
