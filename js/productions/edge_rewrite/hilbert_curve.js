// See:
// Graphical Application of L-Systems
// Figure 1f
// P. Prusinkiewicz

export const production =
    {
        angle: 90,

        axiom:
            {
                string: 'X',
                generation: 0
            },
        productions:
            {
                X: '-YF+XFX+FY-',
                Y: '+XF-YFY-FX+',
                F: 'FF'
            }
    };
