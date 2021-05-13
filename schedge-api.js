const { RESTDataSource } = require('apollo-datasource-rest');

class SchedgeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://schedge.a1liu.com/';
  }

  async getSubjects() {
    return this.get(`subjects`);
  }

  async getSchools() {
    return this.get(`schools`);
  }
}

module.exports = SchedgeAPI;