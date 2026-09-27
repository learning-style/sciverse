#!/usr/bin/env python3
"""Find hard words a Level 1 lesson never defines.

Big Ideas 17-26 read more like a textbook than the rest of Level 1: 6.8% of their
words are ten letters or longer against 4.0% in 27-50, and 4.1% are latinate
against 2.0%. But word length alone is the wrong test -- 'mutation' and
'corrosion' are the subject, and a lesson is entitled to teach them. CLAUDE.md
already states the real rule: no jargon the lesson does not define.

So this asks, for every long or latinate word a lesson uses, whether that lesson
defines it: bolds it, or follows it with a defining verb. Words the curriculum
uses everywhere are exempt, and so are ordinary long words.

Usage:  python3 scripts/check-plainness.py [lessonId ...]
"""
import os
import re
import sys

L = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                 'src/features/sciverse/content/lessons')

LATIN = re.compile(r'\w+(?:tion|sion|ance|ence|ency|ity|ism|ivity|ology|ular|'
                   r'ization|isation|ational)$', re.I)
CONTENT = re.compile(r'content:\s*(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'
                     r'\'(?:[^\'\\]|\\.)*\')', re.S)

# Long words that are ordinary English, or that the whole curriculum leans on.
EXEMPT = set("""everything everywhere everyone something different differences
temperature experiment experiments understand understanding remember important
interesting information themselves ourselves themselves conditions difference
measurement measurements instructions completely carefully immediately
electricity underneath throughout underground surrounding surrounded
comfortable dangerous beautiful especially particular particularly
approximately unfortunately probably suddenly slowly quickly
Chemistry Biology Physics Discovery Complete Checkpoint Level
balance direction distance position pressure sentence
""".split())

DEFINING = (' is ', ' are ', ' means ', ' called ', ' happens when ', ' describes ',
            ' measures ', ' tells you', ' is when ', ' is how ', ' is what ',
            ' the name for', ' we call ', ' scientists call ')


def prose(path):
    s = open(path).read()
    out = []
    for m in CONTENT.finditer(s):
        t = m.group(1)[1:-1]
        t = t.replace('\\n', '\n').replace('\\"', '"').replace("\\'", "'")
        out.append(t)
    return '\n'.join(out)



# Everyday English, whatever its length or ending. A word here is one a nine-year-
# old already uses, so a lesson owes no definition for it. Science terms are NOT
# listed, however familiar they look: 'evaporation' and 'diffusion' have to be
# explained where they are used. Matched through inflections by ordinary().
ORDINARY_STEMS = set("""
question answer science scientist constant dramatic incredible amazing control
eventual electric individual activity compare comparison enormous version
identify independent destroy function automatic efficient eliminate ingredient
attention connect consider differ evaluate city motion evidence structure
boundary increase regular predict discover satellite comfortable advantage
consequence environment combine separate reflect protect prevent artificial
capacity downstream advance physical measure isolate determine form
continuous repeat preserve stable produce select diverse frequent clear severe
sensitive outstanding investigate impure threshold simulation property
direction distance position pressure balance sentence dependable depend
different difference everything everywhere everyone something themselves
ourselves condition instruct complete careful immediate probable sudden slow
quick understand remember important interest information temperature experiment
underneath throughout underground surround dangerous beautiful especial
particular approximate unfortunate electricity examine example special
collect develop contain container millimetre centimetre kilometre metre
microscope telescope vegetable butterfly dragonfly chance option enthusiasm
government dance location instance regardless alternative component weakness
generator technology management establish extension productive solution
percentage horizontal vertical influence interpret illustrate integrate
cooperate coordinate communicate community generation adapt available
effective mathematic multiply divide fraction arrange experience engineer
interact fundamental limit monitor detect highlight agriculture confidence
construct connectivity disconnect distribute constrain maintain penetrate
determine deflect contribute alternative outperform migrate concentrate
misunderstand misconception explain impossible recognise recognize represent
animate substance disappear simultaneous chemical overshoot approach
essential intense duration identity correct contract develop age relate
finger absorb aerate agitate disturb accumulate transfer unbalance timescale
locate prevent manage measurable establish infiltrate greenhouse coastline
option entrance power save light catch dance danced spread

question answer grandmother grandparent campfire wheelbarrow flashlight
mosquito thunderstorm rainforest skyscraper footballer grasshopper painting
photograph photographer passenger lightweight afterwards absolute definite
surprise struggle difficult emergency vocabulary strategy quantity explosion
friction sequence section nation quality action expansion bright vibrate
snorkel riverbank streamside grassland partnership nutrient nutrition
sustain supplement strength strengthen navigate orient process processor
system situation indicate instrument instruments performance perform
principle principal potential permanent permanently mind-blowing rebuild
generate depend explanation recognition multiplication observation
observations destruct destruction deliberate distinguish available
smartphone projector project projection upside-down accident conductor
mistake adjust adjustment compress consumption dissolve fight recover
synchronize thermostat starvation vegetation fertilizer fertiliser
industry exercise overreact overwhelm broadcast catastrophe definitely
overload undersize transmit walkthrough oppositely complex flexible
diversify demonstrate reception hummingbird facility recycle landscape
trustworthy decompose razor-thin practise practice conscious pitch-black
afterward resupply thousandth diverge random support cardiologist
specific temporary amplify capable confident architecture straighten
frustrate clever wheelbarrows professional cannonball refresh convenience
disgusting collision forecast collisions technique wafer-thin
purple-tinged slow-growing quantify minimize minimisation minimization
genetic reproduce handwash pollute involuntary proximity vaccinate
vaccinated corrupt clean cleanliness equivalent intervene intervention
sleepy sleepiness self-regulate insufficient significant real-world
diminish resilience vulnerable composite constrain performing
specialize specialized formulate formulation painkiller masterpiece
inseparable brilliance manufacture custom-shaped explosive
groundwater electronics digestion organism biological biologically
outcompete unaffected activate activating complementary

paintbrush downstairs sunflower conversation station dandelion stretch
sprinkler magnify whatsoever punish miscount head-first in-between
hours-long back-and-forth large-scale suppose spectacular impossibly
sufficient unavailable uninhabitable reduce reduction re-exposure
population-level bottom-right foundation relationship transform depend
availability tolerate tolerance retain retention deform deployment
indicator contaminate reproduce advantageous best-studied stabilize
sustainably saturate flexible carbon-based double-layered corrective
eye-tracking plugged-in sausage-shaped uncoordinated crop-eating
bone-building bone-removing deep-rooted low-oxygen Salt-stressed
light-bending fiber-optic single-cue solar-storm systems-level
nutrient-extraction physics-driven pressure-driven length-dependent
disturbed-field large-scale strong-field oxygen-sensitive oxygen-supported
germ-killing thin-walled ground-level inner-bend outer-bend nitrogen-deficient
lithium-ion single-use non-magnetic non-flammable super-powered
confident-looking sense-and-act sense-compare-correct spike-and-crash
particle-to-particle energy-hungry lower-quality timed-release
controlled-release fight-or-flight myelin-wrapped ferromagnetic-capable
cooperate electronic constrain constraint vulnerable difficulty mistaken
neuroscience measurably disturb disturbance convert conversion cloudiness
pronounce mislead hypothetical irrigate irrigation wear wearability
capable capability rearrange disinfect precise precision mechanic
mechanical microscope microscopic compensate

ultimate systematic catastrophe catastrophic building overreach
cooperatively suppose punish

swallow swallowing respond responding medicine surroundings fist arithmetic repair unfinished finish open broken pendulum
""".split())

# Words the curriculum leans on everywhere, and that a Level 1 reader meets as
# plain speech rather than as a term to be unpacked.
CORE = set("""gravity gravitational energy energetic force matter material
speed weight mass heat light sound water air plant animal body blood muscle
bone cell""".split())

SUFFIXES = ('iest', 'ier', 'ing', 'ies', 'est', 'ed', 'es', 'er', 'ly', 's',
            'al', 'ally', 'ation', 'ations', 'ion', 'ions', 'ment', 'ments',
            'ness', 'able', 'ible', 'ity')


# Endings that map back to a plain stem no amount of trimming reaches.
MORPH = (('edly', 'e'), ('ingly', ''), ('ively', 'e'), ('ility', 'le'), ('ibility', 'ible'), ('ability', 'able'),
         ('ously', 'ous'), ('ically', 'ic'), ('ally', 'al'),
         ('ization', 'ize'), ('isation', 'ise'), ('ability', 'e'))


def ordinary(word):
    """Is this an everyday word, or an inflection of one?"""
    w = word.lower()
    if w.endswith("'s") or w.endswith("s'"):
        w = w[:-2]
    if w in ORDINARY_STEMS or w in CORE:
        return True
    for suf, rep in MORPH:
        if w.endswith(suf) and len(w) > len(suf) + 2:
            cand = w[:-len(suf)] + rep
            if cand in ORDINARY_STEMS or cand in CORE:
                return True
    for suf in SUFFIXES:
        if w.endswith(suf) and len(w) > len(suf) + 2:
            stem = w[:-len(suf)]
            for cand in (stem, stem + 'e', stem + 'y', stem[:-1] + 'e',
                         stem[:-1] if stem[-1:] == 'i' else stem,
                         (stem[:-1] + 'y') if stem[-1:] == 'i' else stem,
                         stem[:-1] if len(stem) > 3 and stem[-1] == stem[-2] else stem):
                if cand in ORDINARY_STEMS or cand in CORE:
                    return True
    return False


def compound_ordinary(word):
    """A hyphenated compound is plain when every part of it is."""
    if '-' not in word:
        return False
    parts = [p for p in word.split('-') if p]
    return len(parts) > 1 and all(ordinary(p) or len(p) <= 4 for p in parts)


ORDINARY = set("""attention connection connections considered consider differently
evaluating evaluate city cities motion evidence structures structure boundaries
increasing regular predictable unpredictable discovered discover scientists
satellites uncomfortable advantages advantage consequences consequence
environment environments environmental combination separation reflection
protection Protection prevention preventable artificial capacity downstream
accumulate advance connecting physically measurable molecular isolation
resistance efficiency determines determine formation predicting prediction
cellular continuous repeatedly preserving regulation production stability
atmospheric populations population selection evolution diversity biology
Frequency frequency Clarity Resolution Severity Sensitivity Reaction Mutation
Corrosion Respiration Spectroscopy Ultrasound Vascular Engineering Outstanding
Geochemists Meteorologists geologists geomorphologists investigators
Fingerprints fingerprints impurities intermediates bottlenecks
well-designed well-matched full-scale high-frequency high-strength
load-bearing threshold-like one-and-done""".split())


def is_proper(word, text):
    """A name rather than a term: it never appears lower-case in the lesson."""
    if not word[:1].isupper():
        return False
    return not re.search(r'(?<![.!?]\s)\b' + re.escape(word.lower()) + r'\b', text)


def hard_words(text):
    skip = {x.lower() for x in EXEMPT} | {x.lower() for x in ORDINARY}
    seen = {}
    for w in re.findall(r"[A-Za-z][A-Za-z'-]*", text):
        if w.lower() in skip:
            continue
        if ordinary(w) or compound_ordinary(w):
            continue
        if is_proper(w, text):
            continue
        if len(w) >= 10 or LATIN.match(w):
            seen.setdefault(w.lower(), w)
    return seen


def defines(text, word):
    low = text.lower()
    if ('**' + word) in low or (word + '**') in low:
        return True
    for m in re.finditer(re.escape(word), low):
        if any(v in low[m.end():m.end() + 140] for v in DEFINING):
            return True
        before = low[max(0, m.start() - 60):m.start()]
        if ' called ' in before or ' we call ' in before:
            return True
    return False



def selftest():
    """Both directions, against the real failures this checker exists for.

    Going blind is the danger: a list of everyday words wide enough to quiet
    'grandmother' must not also quiet 'homeostasis'. So the test asserts that
    genuine jargon is still caught, and that bolding or defining it clears it.
    """
    hard = ('Your body keeps its homeostasis all day long, and the '
            'peristalsis never stops.')
    got = set(hard_words(hard))
    assert 'homeostasis' in got, 'stopped catching jargon: ' + repr(got)
    assert 'peristalsis' in got, 'stopped catching jargon: ' + repr(got)
    assert not defines(hard, 'homeostasis'), 'undefined word read as defined'

    bolded = 'The squeeze is called **peristalsis**, and it never stops.'
    assert defines(bolded, 'peristalsis'), 'bolding no longer counts'
    spelled = 'Homeostasis is the way a body holds itself steady.'
    assert defines(spelled.lower(), 'homeostasis'), '"is" no longer counts'

    plain = ("My grandmother asked a question about the wheelbarrow, and the "
             "material's brightness was surprising, so we went downstairs "
             "afterwards to look at the thunderstorm.")
    assert not hard_words(plain), 'everyday words flagged: ' + repr(hard_words(plain))
    print('selftest ok')
    return 0

def main():
    want = sys.argv[1:]
    if want[:1] == ['--selftest']:
        return selftest()
    files = sorted(f for f in os.listdir(L)
                   if f.endswith('.ts') and re.match(r'^[pcb]\d+-', f))
    total, rows = 0, []
    for f in files:
        lid = f.split('-')[0]
        if want and lid not in want:
            continue
        text = prose(os.path.join(L, f))
        if not text:
            continue
        undef = sorted(orig for low, orig in hard_words(text).items()
                       if not defines(text, low))
        total += len(undef)
        if undef:
            rows.append((len(undef), lid, undef))
    rows.sort(reverse=True)
    for n, lid, undef in rows:
        print('%-5s %2d undefined: %s' % (lid, n, ', '.join(undef[:12])))
    print()
    print(str(len(rows)) + ' lesson(s) with undefined hard words, '
          + str(total) + ' word(s) in total')
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main())
