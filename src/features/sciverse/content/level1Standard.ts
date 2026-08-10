export const LEVEL1_NORMALIZATION_ENABLED = true;

// Keep Level 1 controls simple: one key control, optionally one supporting control.
export const LEVEL1_MAX_VISIBLE_CONTROLS = 2;

export const LEVEL1_FLOW_NODE_IDS = {
    root: 'root',
    misconception: 'misconception',
    correct: 'correct',
    checkpoint: 'checkpoint',
    checkpointWrong: 'checkpoint_wrong',
    checkpointCorrect: 'checkpoint_correct',
    discovery: 'discovery',
    complete: 'complete',
} as const;

export const LEVEL1_LABELS = {
    continue: 'Continue',
    checkpoint: 'Checkpoint',
    discovery: 'Discovery',
    complete: 'Complete',
    retry: 'Try again',
} as const;
