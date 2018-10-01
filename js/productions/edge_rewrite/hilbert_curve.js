// See:
// Wikipedia
// https://en.wikipedia.org/wiki/Hilbert_curve

export const production =
    {
        angle: 90,

        axiom:
            {
                string: 'A',
                generation: 0
            },
        productions:
            {
                A: '-BF+AFA+FB-',
                B: '+AF-BFB-FA+'
            }
    };
