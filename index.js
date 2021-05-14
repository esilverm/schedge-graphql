const { ApolloServer } = require('apollo-server');
const { GraphQLDateTime } = require('graphql-custom-types')
const fs = require("fs");

const SchedgeAPI = require("./schedge-api");

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    totalSubjects: async (_, __, { dataSources }) => {
      const subjects = await dataSources.schedgeAPI.getSubjects();

      return Object.keys(subjects).reduce((acc, school) => {
        return acc + Object.keys(subjects[school]).length;
      }, 0);
    },
    allSubjects: async (_, __, { dataSources }) => {
      const subjects = await dataSources.schedgeAPI.getSubjects();

      return Object.keys(subjects).reduce((acc, school) => {
        return [...acc, ...Object.keys(subjects[school]).reduce((a, code) => {
          return [...a, {
            name: subjects[school][code].name,
            code: code,
          }]
        }, [])]
      }, []);
    },
    Subject: async(_, { school, subject }, { dataSources }) => {
      const subjects = await dataSources.schedgeAPI.getSubjects();
      
      return {
        code: subject,
        name: subjects[school][subject].name,
      }
    },
    totalSchools: async (_, __, { dataSources }) => {
      // Use subjects key since some schools dont exist in the school query
      return Object.keys(await dataSources.schedgeAPI.getSubjects()).length;
    },
    allSchools: async (_, __, { dataSources }) => {
      const subjects = await dataSources.schedgeAPI.getSubjects();
      const schools = await dataSources.schedgeAPI.getSchools();

      return Object.keys(subjects).reduce((acc, school) => {
        return [...acc, {
          code: school,
          name: schools[school]?.name === "" ? null : schools[school]?.name ?? null
        }]
      }, []);
    },
  },
  Subject: {
    school: async (parent, _, { dataSources }) => {
      const schools = await dataSources.schedgeAPI.getSchools();
      const subjects = await dataSources.schedgeAPI.getSubjects();

      // find school that contains code
      const schoolCode = Object.keys(subjects).find((school) => parent.code in subjects[school])
      
      return {
        code: schoolCode,
        name: schools[schoolCode]?.name === "" ? null : schools[schoolCode]?.name ?? null
      }
    },
    courses: async (parent, { year, semester }, { dataSources }) => {
      const subjects = await dataSources.schedgeAPI.getSubjects();
      const schoolCode = Object.keys(subjects).find((school) => parent.code in subjects[school])

      const subjectCourses = await (year || year === 0 ? 
        dataSources.schedgeAPI.getCourseData(year, semester, schoolCode, parent.code) : 
        dataSources.schedgeAPI.getCurrentCourseData(semester, schoolCode, parent.code));

      return subjectCourses.map(({ subjectCode, sections, ...courses }) => ({

        sections: sections.map(({ instructors, status, recitations, ...section }) => ({
          instructors: instructors.map((instructor) => ({
            name: instructor,
          })),
          status: status.toUpperCase(),
          recitations: recitations?.map(({ instructors, status, ...recitation }) => ({
            instructors: instructors.map((instructor) => ({
              name: instructor,
            })),
            status: status.toUpperCase(),
            ...recitation
          })),
          ...section,
        })),
        subject: {
          code: subjectCode.code,
          name: subjects[schoolCode][subjectCode.code].name,
        },
        ...courses
      }))
    },
  },
  School: {
    subjects: async (parent, _, { dataSources }) => {
      const subjects = await dataSources.schedgeAPI.getSubjects();
      return Object.keys(subjects[parent.code]).reduce((acc, subject) => [...acc, {
        code: subject,
        name: subjects[parent.code][subject].name,
      }], [])
    }
  }
};

// Create a new instance of the server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    schedgeAPI: new SchedgeAPI(),
  }),
});

// Launch the server
server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));