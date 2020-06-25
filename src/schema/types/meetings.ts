import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export interface Meeting {
  beginDate: string;
  endDate: string;
  minutesDuration: number;
}

export const MeetingsType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Meetings',
  description: 'A meeting for a section or recitation',
  fields: () => ({
    beginDate: {
      type: GraphQLString,
      resolve: (meeting: Meeting): string => meeting.beginDate,
      description: 'First day of a meeting. Usually determines the day of the week the course is given',
    },
    endDate: {
      type: GraphQLString,
      resolve: (meeting: Meeting): string => meeting.endDate,
      description: 'Final day of classes. Marks the end of all meetings for a particular section or recitation',
    },
    minutesDuration: {
      type: GraphQLInt,
      resolve: (meeting: Meeting): number => meeting.minutesDuration,
      description: 'Duration of the meeting in minutes',
    },
  }),
});
