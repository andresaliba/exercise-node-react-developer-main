import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const Repository = () => {
  // get repository name from url param
  const { id } = useParams();

  const [repoAPI, setRepoAPI] = useState([]);
  const [commitDate, setCommitDate] = useState('');
  const [commitAuthor, setCommitAuthor] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [commitREADME, setCommitREADME] = useState(null);

  // access token for API calls limit to 60 requests per hour
  //   const access_token = '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';

  // fetch the data from the API using Axios
  const fetchData = async () => {
    try {
      await axios(
        `https://api.github.com/repos/silverorange/${id}/branches/master`
      )
        .then((res) => {
          // no data in response
          if (res.data.length === 0) {
            console.log('no data from Axios fetch');
          }
          // Set the data to the repoAPI state
          setRepoAPI(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error('Try/Catch error fetching API data: ', error);
    }
  };

  const getREADME = async () => {
    try {
      await axios(
        `https://raw.githubusercontent.com/silverorange/${id}/master/README.md`
      ).then((res) => {
        setCommitREADME(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // fetch data on component mount
  useEffect(() => {
    fetchData();
    getREADME();
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
        <div>
          <hr />
          <h1>Read Me 🔽</h1>
          {commitREADME ? (
            <ReactMarkdown children={commitREADME} remarkPlugins={[gfm]} />
          ) : (
            <p>This repository has no README file</p>
          )}
        </div>
      </div>
    </>
  );
};
export default Repository;
