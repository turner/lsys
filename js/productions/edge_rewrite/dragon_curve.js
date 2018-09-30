// See:
// The Algorithmic Beauty of Plants
// page 11, example a
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        angle: 90,

        axiom:
            {
                string: 'Fl',
                generation: 0
            },
        productions:
            {
                Fl: 'Fl+Fr+',
                Fr: '-Fl-Fr'
            }
    };
