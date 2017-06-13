import generateRandomGraph from '../utils/generateRandomGraph';

export default class TwitterService {

    getGraph(userName) {
        // const nodes = text.split('').map((letter, i) => ({
        //     id: 'n' + i,
        //     label: letter,
        //     color: '#'+Math.floor(Math.random()*16777215).toString(16)
        // }));
        //
        // const edges = Array.from({ length: nodes.length - 1 }).map((_, i) => ({
        //     id: 'e' + i,
        //     source: 'n' + (Math.ceil(Math.random() * nodes.length) - 1),
        //     target: 'n' + (Math.ceil(Math.random() * nodes.length) - 1),
        //     color: '#'+Math.floor(Math.random()*16777215).toString(16)
        // }));

        return fetch(`http://localhost:8080/graph/${userName}`)
                    .then(graph => graph.json());


        /*const graph = generateRandomGraph();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(graph);
            }, 1500);
        });*/
    }

    getUser(userName) {
        return fetch(`http://localhost:8080/user/${userName}`)
                    .then(user => user.json());
    }

}