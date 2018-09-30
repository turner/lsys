// See:
// The Algorithmic Beauty of Plants
// page 25, figure c
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        angle: 22.5,
        axiom:
            {
                string: 'F',
                generation: 0
            },
        productions:
            {
                F: 'FF-[-F+F+F]+[+F-F-F]'
            }
    };
