/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This endpoint returns a list of courses for a specific year, semester, school, and subject.
 * @endpoint: /{year}/{semester}/{school}/{subject}
 * @params: year: number,
 *          semester: enum {"su", "sp", "fa", "ja"},
 *          school: string,
 *          subject: string
 */

// @TODO: Add type definition for course. Currently disabling eslint rule for file
import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import SectionType from './section';
import SubjectType from './subjects';

const CoursesType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Courses',
  description: 'A course at New York University',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (course: any): string => course.name,
      description: 'The name of the school',
    },
    deptCourseId: {
      type: GraphQLString,
      resolve: (course: any): string => course.deptCourseId,
      description: 'ID of course within its department',
    },
    description: {
      type: GraphQLString,
      resolve: (course: any): string => course.description,
      description: 'Description of the course',
    },
    sections: {
      type: new GraphQLList(SectionType),
      resolve: (course: any): Array<any> => course.sections,
      description: 'A list of sections tied to the current course',
    },
    subjectCode: {
      type: SubjectType,
      resolve: (course: any): any => course.subjectCode,
      description: 'The subject and school of the given course',
    },
  }),
});

export default CoursesType;
