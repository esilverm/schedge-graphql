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

  async getCourseData(year, semester, school, subject) {
    // get course data from any year
    return this.get(`${year}/${semester}/${school}/${subject}?full=true`);
  }

  async getCurrentCourseData(semester, school, subject) {
    // get course data from most recent year
    return this.get(`current/${semester}/${school}/${subject}?full=true`);
  }
}

module.exports = SchedgeAPI;