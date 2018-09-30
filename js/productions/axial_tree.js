// See:
// The Algorithmic Beauty of Plants
// page 24, figure 1.23
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        angle: 45,
        axiom:
            {
                string: 'F',
                generation: 0
            },
        productions:
            {
                F: 'F[+F][-F]F'
            }
    };
