// See:
// The Algorithmic Beauty of Plants
// page 25, example d
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        angle: 22.5,

        axiom:
            {
                string: 'X',
                generation: 0
            },
        productions:
            {
                X: 'F-[[X]+X]+F[+FX]-X',
                F: 'FF'
            }
    };
