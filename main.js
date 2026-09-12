import routes from './routes.js';
import { saveSetting, getSetting } from './storages.js';

// objet pour reupere les donnees de formualire de configuration
const setting = {
    pseudo: '',
    mode: null,
    difficulty: null,
    duration: null,
}


export const app = document.querySelector('#app');
const nav = document.querySelector('#nav');




const renderNavLink = () => {
    const navFragement = document.createDocumentFragment();
    Object.keys(routes).forEach((route) => {
        const { LinkLabel } = routes[route];

        if (!LinkLabel) {
            return;
        }
        const LinkElement = document.createElement('button');

        LinkElement.textContent = LinkLabel;
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

const registerAppButton = () => {
    app.addEventListener('click', (e) => {
        const path = e.target.dataset.path;
        if (!path) { return };

        navigate(path)
    })
}

registerNavButton();
registerAppButton();

const navigate = (route) => {

    window.location.hash = route
    // renderView(route);
}


const getCurrentRoute = () => {

    return window.location.hash.slice(1) || '';
}

const renderView = (route) => {

    const currentRoute = routes[route];
    if (!currentRoute) {
        return;
    }
    app.innerHTML = currentRoute.component();

    if (route === '/game') {
        createGame();
    }
    if(route === '/historique'){
        renderViewHistorique();
    }

};


window.addEventListener('hashchange', () => {

    renderView(getCurrentRoute());

});


const removeSelect = (selector) => {
    document.querySelectorAll(selector).forEach(s => {

        s.classList.remove('selected');
    })
}

const selectButton = (selector, btn) => {

    removeSelect(selector);
    btn.classList.add('selected');
}

const handleConfigClick = (e) => {

    const btn = e.target;

    if (btn.dataset.mode) {
        selectButton("[data-mode]", btn)
        setting.mode = btn.dataset.mode

    }
    if (btn.dataset.duration) {
        selectButton("[data-duration]", btn);
        setting.duration = btn.dataset.duration
    }
    if (btn.dataset.difficulty) {
        selectButton("[data-difficulty]", btn);
        setting.difficulty = btn.dataset.difficulty
    }
}

app.addEventListener('click', handleConfigClick);

// fonction de recupere les donnees de form 

const handFormConfig = (e) => {
    e.preventDefault();

    const pseudo = document.querySelector("#pseudo").value.trim();
    setting.pseudo = pseudo;
    // console.log(setting.duration === null); return 

    if (
        setting.pseudo === "" || setting.mode === null || setting.difficulty === null || setting.duration == null
    ) {
        alert('tous les champs sont oblegatoire a remplite')
        return;
    }
    saveSetting(setting) // on importer cette fonction a le storages.js  pour enregistere l'objet dans localStorage
    navigate('/game');
}

app.addEventListener('submit', (e) => {
    if (e.target.id !== 'config-form') {
        return
    }
    handFormConfig(e)
})


// la fonction principale du game qui appler tous les fonctionnalite depond au jeu 
const createGame = () => {
    // console.log('1');
    const setting = getSetting()
    const gameState = createGameState(setting);

    createHeadrGame(gameState);

    startTimer(gameState);
    const arena = createArena();

    const target = createTarget(setting.difficulty);
    arena.append(target);

    moveTarget(target, arena)

    target.addEventListener("click",  () => {
        if(gameState.isPlaying !== true) return;

        moveTarget(target, arena);
    })
    calculeScore(target, gameState)
    calculeDefi(arena, target, gameState);
    // calculerRecord(gameState);
   
    return gameState;
}

function moveTarget(target, arena){
    // console.log(parseInt(arena.style.width)); 

    let MaxX = parseInt(arena.style.width) - (parseInt(target.style.width));
    let MaxY = parseInt(arena.style.height) - (parseInt(target.style.height));

    let x = Math.random() * MaxX;
    let y = Math.random() * MaxY;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}


function calculeScore (target, gameState){

        target.addEventListener('click', (e) => {
            // console.log(e.target);
            if(gameState.isPlaying !== true){
                return;
            }
            gameState.score = gameState.score+ 1;
            updateScore(gameState); 
        })
}

function calculeDefi(arena, target, gameState){

    console.log(gameState.mode);

      if (gameState.mode !== "precision") {
        return;
    }
    arena.addEventListener('click', (e) => {

        if(!gameState.isPlaying){
            return;
        }
        if(e.target !== target){
            gameState.hits++;
            updateDefis(gameState);
        }
    })
}

const saveResults = (gameState) => {

    const results = JSON.parse(localStorage.getItem("results")) || [];

    results.push(gameState);

    localStorage.setItem("results", JSON.stringify(results));
};

function calculerRecord(difficulty, duration) {

    // console.log(difficulty, duration);return ;

    const results = JSON.parse(localStorage.getItem("results")) || [];
    let record = 0;
    results.forEach(result => {
    
        if (result.difficulty === difficulty && Number(result.duration) === Number(duration)) {
            if (result.score > record) {
                record = result.score;
            }
        }

    });

    return record;
}



const startTimer = (gameState) => {
    const timer = setInterval(() => {

        if(gameState.time <= 0){
            clearInterval(timer);
            gameState.isPlaying = false; 
           if(gameState.score > gameState.record){
            gameState.record = gameState.score;
           }
            saveResults(gameState);
            const record = calculerRecord(gameState.difficulty, Number(gameState.duration));

            if(gameState.score < record){
                gameState.record = record;
            }else{
                  gameState.record = record;
            }
            updateRecord(gameState);
            return ;
        }
        
        gameState.time--;
        updateTime(gameState.time);
    }, 1000)

    return gameState.time;  
}

const updateRecord = (gameState) => {

    const ele = document.getElementById("game-record");

    ele.textContent = gameState.record;
}

const updateTime = (time) => {

    const timer = document.getElementById("time-game");

    timer.textContent = time;
}

const updateScore = (gameState) => {
    
    const score = document.getElementById("score-game");
    score.textContent = gameState.score;
}

const updateDefis = (gameState) => {
    const hits = document.getElementById("hits-game");
    hits.textContent = gameState.hits;
}   

 

const createGameState = (setting) => {
    
    return {
        pseudo: setting.pseudo,
        mode: setting.mode,
        difficulty: setting.difficulty,
        duration: Number(setting.duration),
        score: 0,
        hits: 0,
        record: calculerRecord(setting.difficulty, Number(setting.duration)) || 0,
        time: Number(setting.duration),
        isPlaying: true
    }
}


const createTarget = (difficulty) => {

    const target = document.createElement("div");
    target.classList.add("target");
    target.style.position = "absolute";

    switch (difficulty) {
        case "easy":
            target.style.width = "80px"
            target.style.height = "80px"
            break;
        case "medium":
            target.style.width = "50px";
            target.style.height = "50px";
            break;
        case "hard":
            target.style.width = "30px";
            target.style.height = "30px"
            break
    }

    return target;

}

const createArena = () => {
    const arena = document.querySelector("#game-arena");
    // console.log(arena); return;
    arena.style.width = "500px";
    arena.style.height = "500px";
    arena.style.position = "relative";
    return arena
}

1



const createHeadrGame = (gameState) => {
    const head = document.getElementById("game-head");
    

     head.innerHTML = `
             <div>
                <span>Pseudo</span>
                <strong>${gameState.pseudo}</strong>
             </div>

            <div>
                <span>Score</span>
                <strong id="score-game">${gameState.score}</strong>
            </div>
            
           
            ${
                gameState.mode === "precision" ?
                     `<div>
                        <span>hits</span>
                        <strong id="hits-game" >${gameState.hits}</strong>
                    </div>`
                : ""
            }
                
            <div>
                <span>Record</span>
                <strong id="game-record">${gameState.record}</strong>
            </div>

            <div>
                <span>Time</span>
                <strong id="time-game">${gameState.time}</strong>
            </div>
        `

}


const getLastHistorique = () => {
    const data = localStorage.getItem("results");

    if(!data) {
        return []
    }
    const results = JSON.parse(data);

    return results.slice(-5);
}


const renderViewHistorique = () => {

    const results = getLastHistorique();
    console.log(results);
    console.log(results.length);
    const ele = document.getElementById("historique-list");

    if (results.length === 0) {
        ele.innerHTML = `<p>Aucune historique pour le moment !</p>`;
        return;
    }

    ele.innerHTML = results.map(result => {
        return `
            <div class="historique-item">
                <p>Pseudo : ${result.pseudo}</p>
                <p>Mode : ${result.mode}</p>
                <p>Difficulty : ${result.difficulty}</p>
                <p>Duration : ${result.duration}</p>
                <p>Score : ${result.score}</p>
                <p>hits : ${result.hits}</p>

            </div>
        `
    }).join("");
}


renderView('/')
renderView(getCurrentRoute());


