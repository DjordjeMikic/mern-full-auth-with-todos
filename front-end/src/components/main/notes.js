import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotes, removeNote } from '../../store/user/actions';
import formatDate from '../../utils/formatDate';

const Notes = () => {
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes(user.userInfo._id));
  }, [dispatch, user.userInfo._id]);

  return (
    <div className="flex column w-50 justify-content-start px-4">
      <h4 className="display-4">Notes</h4>

      {user.notes && user.notes.length ? user.notes.map((a, b) => {
        let d = formatDate(a.date);
        return (
          <div
            className="flex align-items-center justify-content-between w-100 p-2 border rounded position-relative"
            id={a._id} key={a + b}>
            <h4>{a.title}</h4>
            <p className="mb-1">{a.text}</p>
            <h6>{d.hours} : {d.minutes} (Date) {d.date} / {d.month} / {d.year}</h6>
            <span
              className="notification text-center bg-danger text-light"
              onClick={() => {
                dispatch(removeNote(user.userInfo._id, a._id));
                setTimeout(() => dispatch(getNotes(user.userInfo._id)), 2000);
              }}
            >&times;</span>
          </div>
        )
      }) : <p>There is no any note</p>}
    </div>
  )
}

export default Notes;
