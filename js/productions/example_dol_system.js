// See:
// Lecture Notes in Biomathematics
// Lindenmayer Systems, Fractals, and Plants
// page 7
// P. Prusinkiewicz and J. Hanan
// or
// The Algorithmic Beauty of Plants
// page 4
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        axiom:
            {
                string: 'b',
                generation: 0
            },
        productions:
            {
                a: 'ab',
                b: 'a'
            }
    };
