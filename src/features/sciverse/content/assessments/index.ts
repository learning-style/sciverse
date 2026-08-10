import { AssessmentData } from '../../types';
import { bigIdea1Assessment } from './bigIdea1';
import { bigIdea2Assessment } from './bigIdea2';
import { bigIdea3Assessment } from './bigIdea3';
import { bigIdea4Assessment } from './bigIdea4';
import { bigIdea5Assessment } from './bigIdea5';
import { bigIdea6Assessment } from './bigIdea6';
import { bigIdea7Assessment } from './bigIdea7';
import { bigIdea8Assessment } from './bigIdea8';
import { bigIdea9Assessment } from './bigIdea9';
import { bigIdea10Assessment } from './bigIdea10';
import { bigIdea11Assessment } from './bigIdea11';
import { bigIdea12Assessment } from './bigIdea12';
import { bigIdea13Assessment } from './bigIdea13';
import { bigIdea14Assessment } from './bigIdea14';
import { bigIdea15Assessment } from './bigIdea15';
import { bigIdea16Assessment } from './bigIdea16';
import { bigIdea17Assessment } from './bigIdea17';
import { bigIdea18Assessment } from './bigIdea18';
import { bigIdea19Assessment } from './bigIdea19';
import { bigIdea20Assessment } from './bigIdea20';
import { bigIdea21Assessment } from './bigIdea21';
import { bigIdea22Assessment } from './bigIdea22';
import { bigIdea23Assessment } from './bigIdea23';
import { bigIdea24Assessment } from './bigIdea24';
import { bigIdea25Assessment } from './bigIdea25';

export const ASSESSMENTS: Record<number, AssessmentData> = {
    1: bigIdea1Assessment,
    2: bigIdea2Assessment,
    3: bigIdea3Assessment,
    4: bigIdea4Assessment,
    5: bigIdea5Assessment,
    6: bigIdea6Assessment,
    7: bigIdea7Assessment,
    8: bigIdea8Assessment,
    9: bigIdea9Assessment,
    10: bigIdea10Assessment,
    11: bigIdea11Assessment,
    12: bigIdea12Assessment,
    13: bigIdea13Assessment,
    14: bigIdea14Assessment,
    15: bigIdea15Assessment,
    16: bigIdea16Assessment,
    17: bigIdea17Assessment,
    18: bigIdea18Assessment,
    19: bigIdea19Assessment,
    20: bigIdea20Assessment,
    21: bigIdea21Assessment,
    22: bigIdea22Assessment,
    23: bigIdea23Assessment,
    24: bigIdea24Assessment,
    25: bigIdea25Assessment,
};

export const getAssessment = (bigIdea: number): AssessmentData | undefined =>
    ASSESSMENTS[bigIdea];
