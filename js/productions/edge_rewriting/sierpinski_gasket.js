// See:
// The Algorithmic Beauty of Plants
// page 11, example b
// P. Prusinkiewicz and A. Lindenmayer

export const production =
    {
        axiom:
            {
                string: 'Fr',
                generation: 0
            },
        productions:
            {
                Fl: 'F#r+F#l+F#r',
                Fr: 'F#l-F#r-F#l'
            },
        // _productions:
        //     [
        //
        //         (string) => {
        //             return string.replace(new RegExp('Fl', 'g'), 'Fl+Fr+');
        //         },
        //
        //         (string) => {
        //             return string.replace(new RegExp('Fr', 'g'), '-Fl-Fr');
        //         }
        //
        //
        //     ]
    };
