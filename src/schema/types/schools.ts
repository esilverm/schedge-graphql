/**
 * This endpoint returns an object where keys are school codes, and values are their full names.
 * @endpoint: /schools
 */

import { GraphQLObjectType, GraphQLString } from 'graphql';

const SchoolsType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Schools',
  description: 'A school at New York University',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the school',
    },
    code: {
      type: GraphQLString,
      description: "The school's code",
    },
  }),
});

export default SchoolsType;
