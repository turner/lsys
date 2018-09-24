// See:
// The Algorithmic Beauty of Plants
// page 24-27
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        axiom:
            {
                string: 'FF[+FFF]FF',
                generation: 0
            },
        productions:
            {
                F: 'F-F+F+FF-F-F+F'
            }
    };
