import axios from 'axios';
import {
  USER_PAGE_PENDING,
  USER_PAGE_SUCCESS,
  USER_PAGE_ERROR
} from '../action-types';

export const usersPage =
  ({ requestPage }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: USER_PAGE_PENDING });

      const response = await axios.get(
        `https://api.gosrock.band/v1/users/all?order=ASC&page=${requestPage}&take=10`
      );

      console.log('포토 조회액션1', response);

      const data = {
        total: response.data.data.meta.itemCount,
        currentPage: requestPage,
        userList: response.data.data.data
      };

      dispatch({ type: USER_PAGE_SUCCESS, payload: data });

      // 자동으로 피쳐로 넘어가게끔
      // callback();
    } catch (e) {
      //400 ~
      dispatch({ type: USER_PAGE_ERROR, payload: '조회 실패' });
    }
  };
