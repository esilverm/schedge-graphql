/* eslint-disable @typescript-eslint/no-explicit-any */

// @TODO: Add type definition for recitation. Currently disabling eslint rule for file
import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import MeetingType from './meetings';

const RecitationType = new GraphQLObjectType({
  name: 'Recitation',
  description: 'A recitation for a specific recitation',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the recitation',
    },
    registrationNumber: {
      type: GraphQLInt,
      resolve: (recitation: any): number => recitation.registrationNumber,
      description: "The recitation's registration number",
    },
    code: {
      type: GraphQLString,
      resolve: (recitation: any): string => recitation.code,
      description: 'recitation code',
    },
    campus: {
      type: GraphQLString,
      resolve: (recitation: any): string => recitation.campus,
      description: 'Campus the course recitation is taught at',
    },
    grading: {
      type: GraphQLString,
      resolve: (recitation: any): string => recitation.grading,
      description: 'Grading style of the course recitation',
    },
    instructionMode: {
      type: GraphQLString,
      resolve: (recitation: any): string => recitation.instructionMode,
      description: 'How the course recitation will be taught',
    },
    instructors: {
      type: new GraphQLList(GraphQLString),
      resolve: (recitation: any): Array<string> => recitation.instructors,
      description: 'List of course recitation instructors',
    },
    location: {
      type: GraphQLString,
      resolve: (recitation: any): string => recitation.location,
      description: 'Specific course location on campus',
    },
    maxUnits: {
      type: GraphQLInt,
      resolve: (recitation: any): number => recitation.maxUnits,
      description: 'Maximum Units recitation can be taken for',
    },
    minUnits: {
      type: GraphQLInt,
      resolve: (recitation: any): number => recitation.minUnits,
      description: 'Minimum Units recitation can be taken for',
    },
    prerequisites: {
      type: GraphQLString,
      resolve: (recitation: any): string => recitation.prerequisites,
      description: 'Prerequisites to take the recitation',
    },
    status: {
      type: GraphQLString,
      resolve: (recitation: any): string => recitation.status,
      description: 'Current status of the recitation',
    },
    type: {
      type: GraphQLString,
      resolve: (recitation: any): string => recitation.type,
      description: 'Type of recitation',
    },
    notes: {
      type: GraphQLString,
      resolve: (recitation: any): string => (recitation.notes ? recitation.notes : ''),
      description: 'Notes about a recitation',
    },
    meetings: {
      type: new GraphQLList(MeetingType),
      resolve: (recitation: any): Array<any> => recitation.meetings,
      description: 'List of meetings for a recitation',
    },
  }),
});

export default RecitationType;
