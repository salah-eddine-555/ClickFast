import { ConfigView  } from './views/config.js';
import { homeView } from './views/home.js';
import { resultView } from './views/result.js';


const routes = {
    '/': {
        LinkLabel: 'home',
        component: homeView
    },
    '/config': {
        LinkLabel: 'configuration',
        viewId: "view-config",
        component: ConfigView 
    },
    '/historique': {
        LinkLabel: 'voire l'+"'"+'historique ',
        component: ConfigView
    },
    '/result': {
        LinkLabel: 'results',
        component: resultView
    }
}


export default routes;