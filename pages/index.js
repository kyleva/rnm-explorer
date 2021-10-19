import { useEffect } from 'react';

import { getCommentsByResidentId } from './api/comments';

const Home = () => {
  useEffect(() => {
    getCommentsByResidentId(1).then((data) => console.log(data));
  });

  return <div>This is just a pageroo.</div>;
};

export default Home;
