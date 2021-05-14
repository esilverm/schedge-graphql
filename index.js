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
      const schools = await dataSources.schedgeAPI.getSchools();

      return Object.keys(subjects).reduce((acc, school) => {
        return [...acc, ...Object.keys(subjects[school]).reduce((a, code) => {
          return [...a, {
            name: subjects[school][code].name,
            code: code,
            school: {
              code: school,
              name: schools[school]?.name === "" ? null : schools[school]?.name ?? null
            }
          }]
        }, [])]
      }, []);
    },
    Subject: async(_, { year, semester, school, subject }, { dataSources }) => {
      const subjectCourses = await (year || year === 0 ? 
        dataSources.schedgeAPI.getCourseData(year, semester, school, subject) : 
        dataSources.schedgeAPI.getCurrentCourseData(semester, school, subject));
      const subjects = await dataSources.schedgeAPI.getSubjects();
      const schools = await dataSources.schedgeAPI.getSchools();
      
      return {
        code: subject,
        name: subjects[school][subject].name,
        school: {
          code: school,
          name: schools[school]?.name === "" ? null : schools[school]?.name ?? null
        },
        courses: subjectCourses.map(({ deptCourseId, name, description, subjectCode, sections }) => ({
          deptCourseId,
          name,
          description,
          subject: {
            code: subjectCode.code,
            name: subjects[school][subjectCode.code].name,
            school: {
              code: school,
              name: schools[school]?.name === "" ? null : schools[school]?.name ?? null
            }
          },
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
          }))

        }))
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
          name: schools[school]?.name === "" ? null : schools[school]?.name ?? null,
          subjects: Object.keys(subjects[school]).reduce((a, code) => {
            return [...a, {
              name: subjects[school][code].name,
              code: code,
              school: {
                code: school,
                name: schools[school]?.name === "" ? null : schools[school]?.name ?? null
              }
            }]
          }, [])
        }]
      }, []);
    },

  },

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