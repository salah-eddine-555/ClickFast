// import { ConfigView  } from './views/config.js';
// import { homeView } from './views/home.js';
// import { resultView } from './views/result.js';


const routes = {
    '/': {
        LinkLabel: 'home',
        viewId: 'view-home',
        // component: homeView
    },
    '/view-config': {
        LinkLabel: 'configuration',
        viewId: "view-config",
        // component: ConfigView 
    },
    '/historique': {
        LinkLabel: 'voire l'+"'"+'historique ',
        viewId: "view-historique"
        // component: ConfigView
    },
    '/result': {
        LinkLabel: 'results',
        viewId: "view-result"
        // component: resultView
    }
}


export default routes;