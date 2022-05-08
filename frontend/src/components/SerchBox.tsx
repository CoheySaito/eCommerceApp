import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

const SerchBox: React.VFC = () => {
  const history = useHistory();

  const [keyword, setKeyword] = useState<string>('');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/serch/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Serch Products..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-success" className="p-2">
        Serch
      </Button>
    </Form>
  );
};
export default SerchBox;
