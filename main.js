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

    const path = e.target.dataset.path;

    if (!path) {
        return;
    }

    navigate(path);

    });
}

registerNavButton();

const navigate = (route) => {
    
    window.location.hash = route
    // renderView(route);
}


const getCurrentRoute = () => {
    
    return window.location.hash.slice(1) || ''; 
}

const renderView = (route) => {

    const currentRoute = routes[route];
    // // console.log(route);
    // return ;
    console.log(currentRoute);
    if (!currentRoute) {
        return;
    }
    app.innerHTML = currentRoute.component();
    // console.log(currentRoute);
    // return;

    // document.querySelectorAll('.view').forEach((v) => {
    //     v.classList.remove('active');

    // });


    // const currentView = document.getElementById(
    //     currentRoute.viewId
    // );
    // // console.log(currentView);
    // // return;

    // if (currentView) {
    //     currentView.classList.add('active');
    // }
};




window.addEventListener('hashchange', () => {

    renderView(getCurrentRoute());

});




// renderNavLink();

renderView(getCurrentRoute());