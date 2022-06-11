export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Filter by Language:{' '}
      <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
    </span>
  );
};
export default GlobalFilter;
