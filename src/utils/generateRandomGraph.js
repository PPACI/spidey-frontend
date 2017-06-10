import faker from 'faker';

export default function() {
    var i,
        o,
        N = 100,
        E = 500,
        C = 5,
        d = 0.5,
        cs = [],
        g = {
            nodes: [],
            edges: []
        };

    var palette = [
        '#94B8B5',
        '#C46446',
        '#A761B1',
        '#95BF55',
        '#544440'
    ];

    // Generate the graph:
    for (i = 0; i < C; i++)
        cs.push({
            id: i,
            nodes: [],
            color: palette[i]
        });

    for (i = 0; i < N; i++) {
        o = cs[(Math.random() * C) | 0];
        g.nodes.push({
            id: 'n' + i,
            label: faker.name.findName(),
            description: faker.lorem.text(),
            x: 100 * Math.cos(2 * i * Math.PI / N),
            y: 100 * Math.sin(2 * i * Math.PI / N),
            size: Math.random(),
            color: o.color
        });
        o.nodes.push('n' + i);
    }

    for (i = 0; i < E; i++) {
        if (Math.random() < 1 - d)
            g.edges.push({
                id: 'e' + i,
                color: '#ccc',
                source: 'n' + ((Math.random() * N) | 0),
                target: 'n' + ((Math.random() * N) | 0)
            });
        else {
            o = cs[(Math.random() * C) | 0]
            g.edges.push({
                id: 'e' + i,
                color: '#ccc',
                source: o.nodes[(Math.random() * o.nodes.length) | 0],
                target: o.nodes[(Math.random() * o.nodes.length) | 0]
            });
        }
    }

    return g;
}