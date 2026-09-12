import { ConfigView  } from './views/config.js';
import { homeView } from './views/home.js';

import { historiqueView } from './views/historique.js';
import { GameView } from './views/game.js';


const routes = {
    '/': {
        LinkLabel: 'home',
        // viewId: 'view-home',
        component: homeView
    },
    '/view-config': {
        LinkLabel: 'configuration',
        // viewId: "view-config",
        component: ConfigView 
    },
    '/historique': {
        LinkLabel: 'voire l'+"'"+'historique ',
        // viewId: "view-historique"
        component: historiqueView
    },
    '/game': {
        component: GameView
    }
}


export default routes;