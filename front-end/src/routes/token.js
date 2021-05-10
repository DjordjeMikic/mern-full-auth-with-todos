import React from 'react';
import { Form, Input, Button } from 'reactstrap';

const Token = () => {
  let [info, setInfo] = React.useState({
    '0': '',
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': ''
  });

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

  const onSubmit = (a) => {
    a.preventDefault();
    console.log(Object.values(info).join(''));
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="flex column w-25">
      <h1>Token</h1>
      <div className="flex w-75" style={{ justifyContent: 'space-around' }}>
        <Input
          className="text-center"
          maxLength="1"
          onChange={onChange}
          value={info[0]}
        />
        <Input
          className="text-center"
          maxLength="1"
          onChange={onChange}
          value={info[1]}
        />
        <Input
          className="text-center"
          maxLength="1"
          onChange={onChange}
          value={info[2]}
        />
        <Input
          className="text-center"
          maxLength="1"
          onChange={onChange}
          value={info[3]}
        />
        <Input
          className="text-center"
          maxLength="1"
          onChange={onChange}
          value={info[4]}
        />
        <Input
          className="text-center"
          maxLength="1"
          onChange={onChange}
          value={info[5]}
        />
      </div>
      <Button className="mt-4" type="submit" color="primary">Submit</Button>
    </Form>
  )
}
export default Token;
