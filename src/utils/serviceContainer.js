import TwitterService from "../services/twitter.service";

const _services = Object.freeze({
    'twitter': new TwitterService()
});

export default class ServiceContainer {

    get(serviceName) {
        return  _services[serviceName];
    }

}