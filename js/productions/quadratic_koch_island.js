// See:
// The Algorithmic Beauty of Plants
// page 7-8
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        axiom:
            {
                string: 'F-F-F-F',
                generation: 0
            },
        productions:
            {
                F: 'F-F+F+FF-F-F+F'
            }
    };
