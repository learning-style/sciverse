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
import { bigIdea26Assessment } from './bigIdea26';
import { bigIdea27Assessment } from './bigIdea27';
import { bigIdea28Assessment } from './bigIdea28';
import { bigIdea29Assessment } from './bigIdea29';
import { bigIdea30Assessment } from './bigIdea30';
import { bigIdea31Assessment } from './bigIdea31';
import { bigIdea32Assessment } from './bigIdea32';
import { bigIdea33Assessment } from './bigIdea33';
import { bigIdea34Assessment } from './bigIdea34';
import { bigIdea35Assessment } from './bigIdea35';
import { bigIdea36Assessment } from './bigIdea36';
import { bigIdea37Assessment } from './bigIdea37';
import { bigIdea38Assessment } from './bigIdea38';
import { bigIdea39Assessment } from './bigIdea39';
import { bigIdea40Assessment } from './bigIdea40';
import { bigIdea41Assessment } from './bigIdea41';
import { bigIdea42Assessment } from './bigIdea42';
import { bigIdea43Assessment } from './bigIdea43';
import { bigIdea44Assessment } from './bigIdea44';
import { bigIdea45Assessment } from './bigIdea45';

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
    26: bigIdea26Assessment,
    27: bigIdea27Assessment,
    28: bigIdea28Assessment,
    29: bigIdea29Assessment,
    30: bigIdea30Assessment,
    31: bigIdea31Assessment,
    32: bigIdea32Assessment,
    33: bigIdea33Assessment,
    34: bigIdea34Assessment,
    35: bigIdea35Assessment,
    36: bigIdea36Assessment,
    37: bigIdea37Assessment,
    38: bigIdea38Assessment,
    39: bigIdea39Assessment,
    40: bigIdea40Assessment,
    41: bigIdea41Assessment,
    42: bigIdea42Assessment,
    43: bigIdea43Assessment,
    44: bigIdea44Assessment,
    45: bigIdea45Assessment,
};

export const getAssessment = (bigIdea: number): AssessmentData | undefined =>
    ASSESSMENTS[bigIdea];
