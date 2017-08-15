import generateRandomGraph from '../utils/generateRandomGraph';
import * as axios from "axios";

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

        return axios.get(`http://spidey.aviato.fr:8080/graph/${userName}`)
                    .then((response) => response.data);


        /*const graph = generateRandomGraph();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(graph);
            }, 1500);
        });*/
    }

    getUser(userName) {
        return axios.get(`http://spidey.aviato.fr:8080/user/${userName}`)
                    .then((response) => response.data);
    }

}