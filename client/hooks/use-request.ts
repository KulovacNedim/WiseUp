const axios = require('axios').default;
import { Method } from 'axios';
import { useState } from 'react';

interface DoRequestArgs {
  url: string;
  method: Method;
  body: { [string: string]: string };
  onSuccess: (data: any) => {};
}

const UseRequest = () => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const doRequest = async ({ url, method, body, onSuccess }: DoRequestArgs) => {
    try {
      setLoading(true);
      setErrors(null);
      const response = await axios[method](url, body);
      setLoading(false);

      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (error) {
      setErrors(error.response.data.errors);
    }
    setLoading(false);
  };

  return { doRequest, loading, errors };
};

export default UseRequest;
