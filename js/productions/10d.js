// See:
// The Algorithmic Beauty of Plants
// page 10, figure d
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
                F: 'FF-F--F-F'
            }
    };
