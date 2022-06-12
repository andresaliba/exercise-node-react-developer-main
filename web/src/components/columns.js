import { Link } from 'react-router-dom';
// column definitions to use on react-table
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
