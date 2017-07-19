import * as axios from "axios";

export default class TwitterService {

    getGraph(userName) {
        return axios.get(`http://localhost:8080/graph/${userName}`)
                    .then((response) => response.data);
    }

    getUser(userName) {
        return axios.get(`http://localhost:8080/user/${userName}`)
                    .then((response) => response.data);
    }

}