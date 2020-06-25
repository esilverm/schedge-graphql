/**
 * This endpoint returns an object whose keys are schools, and whose values are objects with subject codes as keys and subject names as values.
 * @endpoint: /subjects
 */
import { GraphQLObjectType, GraphQLString } from 'graphql';

import SchoolType from './schools';

const SubjectType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Subject',
  description: 'A subject at New York University',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the subject',
    },
    code: {
      type: GraphQLString,
      description: "The subject's abbreviation",
    },
    school: {
      type: SchoolType,
      description: 'The school that provides the given subject',
    },
  }),
});

export default SubjectType;
