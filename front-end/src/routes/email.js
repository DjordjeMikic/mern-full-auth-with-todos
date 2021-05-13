import { useState } from 'react';
import { Form, Input, Button } from 'reactstrap';
import { CustomAlert } from '../components/common';
import axios from '../utils/axiosConf';

const Email = () => {
  const [email, setEmail] = useState('');
  const [e, setE] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChange = (a) => {
    setEmail(a.target.value)
  }

  const onSubmit = async (a) => {
    a.preventDefault();
    try {
      let res = await axios({
        method: 'post',
        url: '/user/get-token',
        data: { email }
      });

      if(res.status === 201) {
        // console.log(res.data);
        setSuccess(res.data);
        setEmail('')
      }
    } catch(e) {
      if(e.response) {
        setE(e.response.data);
        setEmail('')
      }
    }
  }
  return (
    <Form
      onSubmit={onSubmit}
      className="h-75 w-50 d-flex justify-content-center flex-column"
    >
      <h1>Give your email please</h1>

      <CustomAlert info={e} color="danger" toggle={() => setE(null)} />
      <CustomAlert info={success} color="info" toggle={() => setSuccess(null)} />
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
