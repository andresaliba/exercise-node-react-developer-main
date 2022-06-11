import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import _ from 'lodash';

const Repository = () => {
  // get repository name from url param
  const { id } = useParams();

  const [repoAPI, setRepoAPI] = useState([]);
  const [commitDate, setCommitDate] = useState('');
  const [commitAuthor, setCommitAuthor] = useState('');
  const [commitMessage, setCommitMessage] = useState('');

  // access token for API calls limit to 60 requests per hour
  const access_token = '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';

  // fetch the data from the API using Axios
  const fetchData = async () => {
    try {
      await axios(
        `https://api.github.com/repos/silverorange/${id}/branches/master`,
        {
          headers: {
            Authorization: `token ${access_token}`,
          },
        }
      )
        .then((res) => {
          // Set the data to the repoAPI state
          setRepoAPI(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          // TODO: handle middleware error
          // is this working?
          if (
            err.response.status === 403 ||
            err.response.status === 404 ||
            err.response.status === 400
          ) {
            return (
              <div>
                <h1>Error</h1>
                <p>No Repositories Found</p>
              </div>
            );
          }
          console.error('Axios - Error fetching repository data: ', err);
          console.error('Status:', err.response.status);
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

  // using lodash to access deep nested object properties from the API
  const getDate = () => {
    const date = _.get(
      repoAPI,
      'commit.commit.author.date',
      'Commit has no date (can it even?)'
    );
    return setCommitDate(date);
  };

  const getAuthor = () => {
    const author = _.get(
      repoAPI,
      'commit.commit.author.name',
      'No author name'
    );
    return setCommitAuthor(author);
  };

  const getMessage = () => {
    const message = _.get(
      repoAPI,
      'commit.commit.message',
      'No commit Message'
    );
    return setCommitMessage(message);
  };

  // get information from lodash when repoAPI state is updated
  useEffect(() => {
    getDate();
    getAuthor();
    getMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repoAPI]);

  return (
    <>
      <div className="repository">
        <div>
          <h1>Repository</h1>
          <Link to="/"> ⬅ Go Back </Link>
          <h2>{id}</h2>
        </div>
        <div>
          <h3>Commit Author</h3>
          {commitAuthor}
        </div>
        <div>
          <h3>Commit Date</h3>
          {commitDate}
        </div>
        <div>
          <h3>Commit Message</h3>
          {commitMessage}
        </div>
      </div>
    </>
  );
};
export default Repository;
