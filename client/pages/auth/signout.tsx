import Router from 'next/router';
import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';

const Signout = () => {
  const { doRequest } = useRequest();

  useEffect(() => {
    doRequest({
      url: '/api/users/signout',
      method: 'post',
      body: {},
      onSuccess: () => Router.push('/'),
    });
  }, []);

  return <h1>Signing you out...</h1>;
};

export default Signout;
