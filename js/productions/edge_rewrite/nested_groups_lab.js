
export const production =
    {
        angle: 22.5,

        axiom:
            {
                string: 'X',
                generation: 0
            },
        // productions:
        //     {
        //         X: 'F[+X]+F-F',
        //         F: 'FF'
        //     }

        productions:
            {
                X: 'F-[[X]+X]+F[+FX]-X',
                F: 'FF'
            }

        // productions:
        //     {
        //         X: 'F[-X]F'
        //     }
    };
