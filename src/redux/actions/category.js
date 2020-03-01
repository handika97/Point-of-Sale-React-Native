import axios from 'axios';

export const getCategory = y => {
  console.log('hello');
  return {
    type: 'GET_CATEGORY', // string yang mendiskripsikan perintah
    payload: axios.get('http://192.168.1.250:4002/api/v1/category/'),
  };
};

export const postCategory = data => {
  console.log('ini data category', data);
  return {
    type: 'POST_CATEGORY',
    payload: axios.post(`http://localhost:4002/api/v1/category`, {
      name_category: data,
    }),
  };
};
export const deleteCategory = id => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios.delete(`http://localhost:4002/api/v1/category/${id}`),
  };
};
export const updateCategory = (fd, id) => {
  console.log('ini data category', fd, id);
  return {
    type: 'UPDATE_CATEGORY',
    payload: axios.patch(`http://localhost:4002/api/v1/category/${id}`, {
      name_category: fd,
    }),
  };
};
