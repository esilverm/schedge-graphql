/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This endpoint returns a section for a specific year, semester, and registration number.
 * @endpoint: /{year}/{semester}/{registrationNumber}
 * @params: year: number,
 *          semester: enum {"su", "sp", "fa", "ja"},
 *          registrationNumber: number,
 */

// @TODO: Add type definition for section. Currently disabling eslint rule for file
import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { Recitation, RecitationType } from './recitation';
import { Meeting, MeetingsType } from './meetings';

export interface Section {
  name: string;
  registrationNumber: number;
  code: string;
  campus: string;
  grading: string;
  instructionMode: string;
  instructors: Array<string>;
  location: string;
  maxUnits: number;
  minUnits: number;
  prerequisites: string;
  status: string;
  type: string;
  notes: string | null;
  recitations: Array<Recitation> | null;
  meetings: Array<Meeting>;
}

export const SectionType = new GraphQLObjectType({
  name: 'Section',
  description: 'A section in a specific course',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the section',
    },
    registrationNumber: {
      type: GraphQLInt,
      resolve: (section: Section): number => section.registrationNumber,
      description: "The section's registration number",
    },
    code: {
      type: GraphQLString,
      resolve: (section: Section): string => section.code,
      description: 'Section code',
    },
    campus: {
      type: GraphQLString,
      resolve: (section: Section): string => section.campus,
      description: 'Campus the course section is taught at',
    },
    grading: {
      type: GraphQLString,
      resolve: (section: Section): string => section.grading,
      description: 'Grading style of the course section',
    },
    instructionMode: {
      type: GraphQLString,
      resolve: (section: Section): string => section.instructionMode,
      description: 'How the course section will be taught',
    },
    instructors: {
      type: new GraphQLList(GraphQLString),
      resolve: (section: Section): Array<string> => section.instructors,
      description: 'List of course section instructors',
    },
    location: {
      type: GraphQLString,
      resolve: (section: Section): string => section.location,
      description: 'Specific course location on campus',
    },
    maxUnits: {
      type: GraphQLInt,
      resolve: (section: Section): number => section.maxUnits,
      description: 'Maximum Units section can be taken for',
    },
    minUnits: {
      type: GraphQLInt,
      resolve: (section: Section): number => section.minUnits,
      description: 'Minimum Units section can be taken for',
    },
    prerequisites: {
      type: GraphQLString,
      resolve: (section: Section): string => section.prerequisites,
      description: 'Prerequisites to take the section',
    },
    status: {
      type: GraphQLString,
      resolve: (section: Section): string => section.status,
      description: 'Current status of the section',
    },
    type: {
      type: GraphQLString,
      resolve: (section: Section): string => section.type,
      description: 'Type of section',
    },
    notes: {
      type: GraphQLString,
      resolve: (section: Section): string | null => (section.notes ? section.notes : null),
      description: 'Section notes',
    },
    recitations: {
      type: new GraphQLList(RecitationType),
      resolve: (section: Section): Array<Recitation> | null => (section.recitations ? section.recitations : null),
      description: 'List of recitations',
    },
    meetings: {
      type: new GraphQLList(MeetingsType),
      resolve: (section: Section): Array<Meeting> => section.meetings,
      description: 'List of meetings for a section',
    },
  }),
});
