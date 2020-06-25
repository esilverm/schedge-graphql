/* eslint-disable @typescript-eslint/no-explicit-any */

// @TODO: Add type definition for meeting. Currently disabling eslint rule for file

import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

const MeetingsType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Meetings',
  description: 'A meeting for a section or recitation',
  fields: () => ({
    beginDate: {
      type: GraphQLString,
      resolve: (meeting: any): string => meeting.beginDate,
      description: 'First day of a meeting. Usually determines the day of the week the course is given',
    },
    endDate: {
      type: GraphQLString,
      resolve: (meeting: any): string => meeting.endDate,
      description: 'Final day of classes. Marks the end of all meetings for a particular section or recitation',
    },
    minutesDuration: {
      type: GraphQLInt,
      resolve: (meeting: any): number => meeting.minutesDuration,
      description: 'Duration of the meeting in minutes',
    },
  }),
});

export default MeetingsType;
