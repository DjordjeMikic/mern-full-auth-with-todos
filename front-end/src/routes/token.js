import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'reactstrap';
import { CustomAlert } from '../components/common';
import axios from '../utils/axiosConf';

const Token = () => {
  const [info, setInfo] = useState({
    '0': '',
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': ''
  });
  const [e, setE] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const onChange = (a) => {
    if(isNaN(parseInt(a.target.value))) {
      return;
    }

    let index = a.target.parentElement.children;
    let index4 = [...index].indexOf(a.target);
    setInfo({ ...info, [index4.toString()]: a.target.value });

    if(index4 < 5) {
      a.target.nextElementSibling.focus();
    }
  }

  const onSubmit = async (a) => {
    a.preventDefault();
    let path = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
    let token = Object.values(info).join('');
    try {
      let res = await axios({
        method: 'post',
        url: `/user/confirm-token/${path}`,
        data: { token }
      });

      if(res.status === 201 && res.data?.success) {
        // console.log(res.data);
        history.push(`/new-password/${path}`);
      }
    } catch(e) {
      if(e.response) {
        setE(e.response.data);
      }
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="flex column w-25">
      <h1>Token</h1>

      {e ? (
        <CustomAlert info={e} color="danger" toggle={() => setE(null)} />
      ) : ''}

      <div className="flex w-75">
        {Object.keys(info).map((a, b) => (
          <Input
            className="text-center"
            key={a + b}
            maxLength="1"
            onChange={onChange}
            value={info[a]}
            required
          />
        ))}
      </div>

      <Button className="mt-4" type="submit" color="primary">Submit</Button>
    </Form>
  )
}

export default Token;
