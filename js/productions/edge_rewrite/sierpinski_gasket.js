// See:
// The Algorithmic Beauty of Plants
// page 11, example b
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        angle: 60,

        axiom:
            {
                string: 'Fr',
                generation: 0
            },
        productions:
            {
                Fl: 'Fr+Fl+Fr',
                Fr: 'Fl-Fr-Fl'
            }
    };
