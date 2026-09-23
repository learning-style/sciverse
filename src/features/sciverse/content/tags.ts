/**
 * Cross-cutting threads.
 *
 * The three subject slots stay exactly as they are -- physics, chemistry,
 * biology -- because they line up with the textbooks a learner already has.
 * Tags are a second, independent axis: a thread of curiosity that runs across
 * all three, so a child who wants to follow "water" can go from river erosion
 * to dissolved ions to habitat webs without caring which subject each belongs
 * to.
 *
 * Tags attach to the **Big Idea**, not to the lesson. A thread is about a
 * phenomenon, and a Big Idea *is* a phenomenon -- its three lessons are the
 * same thing seen three ways, so they share its threads. That keeps the whole
 * vocabulary to 50 authored rows instead of 233, and it is why no registry
 * entry needs a tag field. `LessonMeta.tags` exists only as an override for
 * the rare lesson that belongs to a thread its Big Idea does not.
 *
 * Every tag here spans at least two of the three subjects. A tag that lives
 * inside one subject is just a sub-field with a hash in front of it, and earns
 * nothing.
 */

/** Closed union, like `Accent`: a tag outside this list is a type error. */
export type Tag =
    | 'water'
    | 'energy'
    | 'climate'
    | 'ecology'
    | 'body'
    | 'health'
    | 'materials'
    | 'motion'
    | 'light-sound'
    | 'earth-space'
    | 'food-farming'
    | 'information'
    | 'measurement'
    | 'balance';

/** Display name for a thread's own page. Cards show the slug with a #. */
export const TAG_LABELS: Record<Tag, string> = {
    water: 'Water',
    energy: 'Energy',
    climate: 'Climate',
    ecology: 'Ecology',
    body: 'The Body',
    health: 'Health',
    materials: 'Materials',
    motion: 'Motion & Forces',
    'light-sound': 'Light & Sound',
    'earth-space': 'Earth & Space',
    'food-farming': 'Food & Farming',
    information: 'Information',
    measurement: 'Measurement',
    balance: 'Balance',
};

/** One line a thread's page can open with, so the page is not just a list. */
export const TAG_BLURBS: Record<Tag, string> = {
    water: 'Where it goes, what it carries, and who lives in it.',
    energy: 'Where it comes from, where it goes, and what is lost on the way.',
    climate: 'The air, the carbon in it, and the weather it makes.',
    ecology: 'Who eats whom, who lives where, and what happens when that changes.',
    body: 'The machine you live in, and the rules it runs on.',
    health: 'Staying well, getting ill, and what medicine actually does.',
    materials: 'Why stuff behaves the way it does, and how we choose it.',
    motion: 'What makes things move, stop, turn and swing.',
    'light-sound': 'Waves you can see and waves you can hear.',
    'earth-space': 'The ground under you and the sky over it.',
    'food-farming': 'Sunlight into sugar, soil into dinner.',
    information: 'Codes, signals, and how a message survives the trip.',
    measurement: 'How we know a number is worth trusting.',
    balance: 'Systems that hold steady by never standing still.',
};

/** Ordered for display: the threads with the most Big Ideas first. */
export const ALL_TAGS: Tag[] = [
    'body', 'materials', 'ecology', 'health', 'water', 'energy',
    'information', 'measurement', 'motion', 'earth-space',
    'climate', 'food-farming', 'light-sound', 'balance',
];

/**
 * Authored by hand from each Big Idea's question and its three lessons, two or
 * three threads each. Keyword matching was tried first and rejected: it tagged
 * Gravity & Orbits as water and Inside Your Ear as climate.
 */
export const BIG_IDEA_TAGS: Record<number, Tag[]> = {
    1: ['motion', 'body', 'energy'],                    // Why Do Things Move?
    2: ['materials', 'body'],                           // What Is Everything Made Of?
    3: ['energy', 'food-farming', 'ecology'],           // Where Does Energy Come From?
    4: ['light-sound', 'body', 'information'],          // How Do We Sense the World?
    5: ['motion', 'body', 'balance'],                   // How Can a Small Force Do a Big Job?
    6: ['water', 'materials', 'body'],                  // Why Do Things Float or Sink?
    7: ['energy', 'body', 'information'],               // How Does Electricity Work?
    8: ['climate', 'water', 'ecology'],                 // Why Does Weather Change?
    9: ['measurement', 'body', 'food-farming'],         // How Do Things Grow?
    10: ['climate', 'energy', 'ecology'],               // How Do We Protect Our Planet?
    11: ['body', 'health'],                             // How Do We Stay Healthy?
    12: ['earth-space', 'materials', 'ecology'],        // How Do Hidden Rules Shape Big Patterns?
    13: ['motion', 'materials', 'food-farming'],        // How Does Structure Shape Function?
    14: ['information', 'materials', 'body'],           // How Is Information Coded and Transmitted?
    15: ['balance', 'ecology', 'motion'],               // How Do Systems Find Balance?
    16: ['materials', 'earth-space', 'ecology'],        // Magnets, navigation and machines
    17: ['materials', 'motion', 'body'],                // How Do Structures Stay Standing?
    18: ['water', 'earth-space', 'ecology'],            // How Do Rivers Shape the Land?
    19: ['food-farming', 'ecology', 'water'],           // How Does Soil Support Life?
    20: ['light-sound', 'materials', 'body'],           // How Do Lenses Change What We See?
    21: ['balance', 'climate', 'earth-space'],          // How Do Cycles Keep Systems Alive?
    22: ['light-sound', 'earth-space', 'measurement'],  // How Do Waves Help Us See the Invisible?
    23: ['materials', 'body', 'health'],                // How Do Materials Break and Recover?
    24: ['water', 'body', 'information'],               // How Do Networks Deliver What Matters?
    25: ['motion', 'information', 'ecology'],           // How Can Tiny Changes Cause Big Effects?
    26: ['climate', 'water', 'ecology'],                // How Do We Predict Weather?
    27: ['body', 'food-farming', 'energy'],             // How Does Food Become Usable Energy?
    28: ['body', 'health', 'balance'],                  // How Do Body Systems Work Together?
    29: ['health', 'body', 'measurement'],              // How Do Diseases Spread and Stop?
    30: ['health', 'body', 'materials'],                // How Do Medicines Reach the Right Place?
    31: ['water', 'health', 'motion'],                  // How Do Cities Move Water and Waste?
    32: ['climate', 'health', 'body'],                  // How Does Air Quality Affect Breathing?
    33: ['ecology', 'energy', 'climate'],               // How Do Ecosystems Support Human Life?
    34: ['food-farming', 'water', 'ecology'],           // How Do Farms Feed a Growing World?
    35: ['materials', 'ecology', 'energy'],             // How Can We Turn Waste Into Resources?
    36: ['water', 'health', 'measurement'],             // How Do We Make Water Safe to Drink?
    37: ['energy', 'water', 'body'],                    // How Do We Store Energy for Later?
    38: ['information', 'balance', 'materials'],        // How Do Robots Sense and Act?
    39: ['information', 'materials', 'body'],           // How Do Computers Use Logic?
    40: ['measurement', 'information'],                 // How Do We Use Data to Know What Is True?
    41: ['measurement', 'information', 'energy'],       // How Do Patterns and Probability Guide Decisions?
    42: ['body', 'motion', 'health'],                   // How Does Sports Science Improve Performance?
    43: ['motion', 'materials', 'health'],              // How Do We Design for Safety and Accessibility?
    44: ['materials', 'measurement'],                   // How Do Everyday Materials Get Their Properties?
    45: ['light-sound', 'health', 'materials'],         // How Do We Manage Noise and Protect Hearing?
    46: ['light-sound', 'body', 'materials'],           // How Do Colour and Perception Work in Design?
    47: ['ecology', 'body', 'measurement'],             // How Do Species Share Habitats?
    48: ['ecology', 'measurement', 'information'],      // How Do We Keep Track of Wildlife?
    49: ['earth-space', 'materials', 'energy'],         // How Do We Use Earth Resources Responsibly?
    50: ['earth-space', 'measurement', 'ecology'],      // How Do Satellites Help Life on Earth?
};

/** The threads a lesson sits on: its own, if it overrides, else its Big Idea's. */
export const tagsFor = (lesson: { bigIdea: number; tags?: Tag[] }): Tag[] =>
    lesson.tags ?? BIG_IDEA_TAGS[lesson.bigIdea] ?? [];

/** Every Big Idea on a thread, in order. */
export const bigIdeasWithTag = (tag: Tag): number[] =>
    Object.keys(BIG_IDEA_TAGS)
        .map(Number)
        .filter(n => (BIG_IDEA_TAGS[n] ?? []).includes(tag))
        .sort((a, b) => a - b);
