import React from 'react';
import { Form, Input, Button } from 'reactstrap';

const Email = () => {
  let [email, setEmail] = React.useState('');
  const onChange = (a) => {
    setEmail(a.target.value)
  }
  const onSubmit = (a) => {
    a.preventDefault();
    console.log(email);
  }
  return (
    <Form
      onSubmit={onSubmit}
      className="h-75 w-50 d-flex justify-content-center flex-column">
      <h1>Give your email please</h1>
      <Input
        type="email"
        placeholder="Your Email"
        name="email"
        value={email}
        onChange={onChange}
        required
      />
      <Button className="mt-4" type="submit" color="primary">Submit</Button>
    </Form>
  )
}

export default Email;
