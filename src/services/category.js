import http from './http';

const category = {
  /**
   * Get all categories
   */
  getAll: () => http.get('/api/categories'),
  /**
   * Save a category
   * @param {any} data - the data of category
   */
  save: data =>
    http({
      method: 'id' in data ? 'put' : 'post',
      url: 'id' in data ? `/api/categories/${data.id}` : '/api/categories/',
      data
    }),
  delete: id => http.delete(`/api/categories/${id}`)
};

export default category;
