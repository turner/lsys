// See:
// The Algorithmic Beauty of Plants
// page 10, figure f
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
                F: 'F-F+F-F-F'
            }
    };
