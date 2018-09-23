// See:
// Lecture Notes in Biomathematics
// Lindenmayer Systems, Fractals, and Plants
// page 13
// P. Prusinkiewicz and J. Hanan
// or
// The Algorithmic Beauty of Plants
// page 8
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        axiom:
            {
                string: 'F+F+F+F',
                generation: 0
            },
        productions:
            {
                F: 'F-F+F+FF-F-F+F'
            }
    };
