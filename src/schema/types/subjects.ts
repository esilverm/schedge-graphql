/**
 * This endpoint returns an object whose keys are schools, and whose values are objects with subject codes as keys and subject names as values.
 * @endpoint: /subjects
 */
import { GraphQLObjectType, GraphQLString } from 'graphql';

import { Schools, SchoolsType } from './schools';

export interface Subject {
  name: string;
  code: string;
  school: Schools;
}

export const SubjectType: GraphQLObjectType = new GraphQLObjectType({
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
      type: SchoolsType,
      description: 'The school that provides the given subject',
    },
  }),
});
