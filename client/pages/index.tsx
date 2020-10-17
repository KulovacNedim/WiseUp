import { NextPageContext } from 'next';
import buildClient from '../api/build-client';

const Index = ({ currentUser }: any) => {
  return <h1>You are {currentUser ? null : 'NOT '}signed in</h1>;
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/users/currentuser');
  const { currentUser } = data;
  return {
    props: {
      currentUser,
    },
  };
};

export default Index;
