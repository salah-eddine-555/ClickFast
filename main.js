import routes from './routes.js';



const app = document.querySelector('#app');
const nav = document.querySelector('#nav');




const renderNavLink = () => {
    const navFragement = document.createDocumentFragment();
    Object.keys(routes).forEach((route) => {
        const { LinkLabel } = routes[route];

        const LinkElement = document.createElement('button');
        
        LinkElement.textContent  = LinkLabel;
        LinkElement.className = 'nav-link'
        LinkElement.dataset.path = route;

        navFragement.appendChild(LinkElement)
    })
    nav.append(navFragement);
}

renderNavLink();

const registerNavButton = () => {
    nav.addEventListener('click', (e) => {
        e.preventDefault();
        const path = e.target.dataset.path;
        // console.log(path);

        if(!path){
            return;
        }
        
   
        navigate(path);
    })
}

registerNavButton();

const renderView = (route) => {
    
    const currentRoute = routes[route];

    if(!currentRoute){
        return;
    }

    app.innerHTML = currentRoute.component()
}



const navigate = (route) => {
    
    history.pushState({}, "", route);
    renderView(route);
}
renderView('/');
