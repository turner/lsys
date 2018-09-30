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
                Fl: 'F#l+F#r+',
                Fr: '-F#l-F#r'
            }
    };
