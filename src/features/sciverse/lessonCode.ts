import { Discipline, LessonMeta } from './types';

const LETTER: Record<Discipline, string> = { physics: 'P', chemistry: 'C', biology: 'B' };

/**
 * The label a learner sees for a lesson: L1P1, L2C3, L3B15.
 *
 * Derived from the lesson's own level, discipline and Big Idea rather than from
 * its id, so the label can never drift from the data. For Levels 2 and 3 it
 * comes out identical to the id; for Level 1 it adds the L1 prefix the ids leave
 * out, so all three levels read the same way.
 *
 * The ids themselves are deliberately untouched: they appear in every lesson
 * URL, every crossLinks entry, the script map and the lab mapping, so renaming
 * them would break existing links for a cosmetic gain.
 */
export const lessonCode = (lesson: Pick<LessonMeta, 'discipline' | 'bigIdea' | 'level'>): string =>
    `L${lesson.level ?? 1}${LETTER[lesson.discipline]}${lesson.bigIdea}`;
