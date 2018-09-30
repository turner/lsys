// See:
// The Algorithmic Beauty of Plants
// page 25, example d
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        axiom:
            {
                string: 'X',
                generation: 0
            },
        productions:
            [

                (string) => {
                    return string.replace(new RegExp('X', 'g'), 'F[+X]F[-X]+X');
                },

                (string) => {
                    return string.replace(new RegExp('F', 'g'), 'FF');
                }


            ]
    };
