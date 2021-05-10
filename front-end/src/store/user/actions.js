import axios from '../../utils/axiosConf';

export const login = (a) => async (dispatch) => {
  let res = await axios({
    method: 'post',
    url: '/user/login',
    data: a
  });
  if(res.status === 201) {
    console.log(res.data);
  }
}
