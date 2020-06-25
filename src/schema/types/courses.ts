/**
 * This endpoint returns a list of courses for a specific year, semester, school, and subject.
 * @endpoint: /{year}/{semester}/{school}/{subject}
 * @params: year: number,
 *          semester: enum {"su", "sp", "fa", "ja"},
 *          school: string,
 *          subject: string
 */

import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { Subject, SubjectType } from './subjects';
import { Section, SectionType } from './section';

export interface Course {
  name: string;
  deptCourseId: string;
  description: string;
  sections: Array<Section>;
  subjectCode: Subject;
}

export const CoursesType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Courses',
  description: 'A course at New York University',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (course: Course): string => course.name,
      description: 'The name of the school',
    },
    deptCourseId: {
      type: GraphQLString,
      resolve: (course: Course): string => course.deptCourseId,
      description: 'ID of course within its department',
    },
    description: {
      type: GraphQLString,
      resolve: (course: Course): string => course.description,
      description: 'Description of the course',
    },
    sections: {
      type: new GraphQLList(SectionType),
      resolve: (course: Course): Array<Section> => course.sections,
      description: 'A list of sections tied to the current course',
    },
    subjectCode: {
      type: SubjectType,
      resolve: (course: Course): Subject => course.subjectCode,
      description: 'The subject and school of the given course',
    },
  }),
});
