// See:
// The Algorithmic Beauty of Plants
// page 11, example a
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        axiom:
            {
                string: 'Fl',
                generation: 0
            },
        productions:
            [

                (string) => {
                    return string.replace(new RegExp('Fl', 'g'), 'Fl+Fr+');
                },

                (string) => {
                    return string.replace(new RegExp('Fr', 'g'), '-Fl-Fr');
                }


            ]
    };
