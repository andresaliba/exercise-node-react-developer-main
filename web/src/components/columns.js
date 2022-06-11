import { Link } from 'react-router-dom';
export const COLUMNS = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: (e) => <Link to={e.value}> {e.value} </Link>,
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Language',
    accessor: 'language',
  },
  {
    Header: 'Fork Count',
    accessor: 'forks_count',
  },
];
