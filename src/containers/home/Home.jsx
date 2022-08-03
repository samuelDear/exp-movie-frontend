import { useState } from 'react';
import { Header, Layout } from 'components';

const Home = () => {
  // state
  const [loading, setLoading] = useState(false);

  return (
    <Layout isLoading={loading}>
      <Header /> <p>hidude</p>
    </Layout>
  );
};

export default Home;
