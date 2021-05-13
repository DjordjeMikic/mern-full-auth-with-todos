import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Col, Input, Button } from 'reactstrap';

import {
  addNote,
  getNotes,
  setError,
  setSuccess
} from '../../store/user/actions';

import { CustomAlert } from '../common';

const AddNote = () => {
  const [info, setInfo] = useState({
    title: '',
    text: ''
  });
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  const onChange = (a) => {
    setInfo({
      ...info,
      [a.target.name]: a.target.value
    })
  }

  const onSubmit = (a) => {
    a.preventDefault();
    if(!info.title || !info.text) {
      return;
    }
    dispatch(addNote(user.userInfo._id, info));
    setInfo({
      title: '',
      text: ''
    });
    setTimeout(() => dispatch(getNotes(user.userInfo._id)), 2000);
  }

  return (
    <Form onSubmit={onSubmit} className="w-50 px-4">
      <h4 className="display-4">Add Note</h4>
      <CustomAlert
        info={user.error}
        color="danger"
        toggle={() => dispatch(setError(null))}
      />
      <CustomAlert
        info={user.success}
        color="primary"
        toggle={() => dispatch(setSuccess(null))}
      />

      <Input
        type="text"
        placeholder="Title"
        name="title"
        onChange={onChange}
        value={info.title}
      />
      <Col className="mt-2" sm={12}>
        <Input
          type="textarea"
          name="text"
          placeholder="Your note"
          onChange={onChange}
          value={info.text}
        />
      </Col>

      <Button className="mt-2" type="submit" color="primary">Submit</Button>
    </Form>
  )
}

export default AddNote;
