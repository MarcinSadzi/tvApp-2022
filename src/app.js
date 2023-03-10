
import { mapListToDOMElements, createDOMElem } from './DOMInteractions.js'
import { getShowsByKey, getShowById } from './requests.js'

class TvApp {
    constructor() {
        this.viewElems = {}
        this.showNameBtn = {}
        this.selectedName = "harry"
        this.initializeApp()
    }
    initializeApp = () => {
        this.connectDomElements();
        this.setupListeners();
        this.fetchAndDisplayShows();
    }
    connectDomElements = () =>{
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        const listOfShowNames = Array.from(
            document.querySelectorAll('[data-show-name]')
            ).map(elem => elem.dataset.showName)
            
           
            this.viewElems = mapListToDOMElements(listOfIds, 'id')
            this.showNameBtn = mapListToDOMElements(listOfShowNames, 'data-show-name')
          
    }
    setupListeners = () => {
        Object.keys(this.showNameBtn).forEach(showName => {
            this.showNameBtn[showName].addEventListener('click', this.setCurrentNameFilter)
        })
    }
    setCurrentNameFilter = () => {
        this.selectedName = event.target.dataset.showName;
        this.fetchAndDisplayShows();
    }
    fetchAndDisplayShows = () => {
        getShowsByKey(this.selectedName).then(shows => this.renderCardsOnList(shows))
    }

    renderCardsOnList = (shows) => {
        Array.from(
            document.querySelectorAll('[data-show-id]')
        ).forEach(btn => btn.removeEventListener('click', this.openDetailsView))
        this.viewElems.showsWrapper.innerHTML = '';

        for (const { show } of shows) {
            const card = this.createShowCard(show)
            this.viewElems.showsWrapper.appendChild(card)

        }
    }
    
    

    closeDetailsView = event => {
        const { showId } = event.target.dataset
        const closeBtn = document.querySelector(`[id='showPreview'] [data-show-id='${showId}']`)
        closeBtn.removeEventListener('click', this.closeDetailsView)
        this.viewElems.showPreview.style.display = 'none';
        this.viewElems.showPreview.innerHTML = '';
        }

        openDetailsView = event => {
            const { showId } = event.target.dataset
            getShowById(showId).then(show => {
                const card = this.createShowCard(show, true);
                this.viewElems.showPreview.appendChild(card);
                this.viewElems.showPreview.style.display = 'block';
            })            
        }
        
    

createShowCard = (show, isDetailed) => {
    const divCard = createDOMElem('div', 'card');
    // const img = createDOMElem('img', 'card-img-top', null, show.image.medium);
    const divCardBody = createDOMElem('div', 'card-body');
    const h5 = createDOMElem('h5', 'card-title', show.name);
    // const p = createDOMElem('p', 'card-text', show.summary);
    const btn = createDOMElem('button', 'btn btn-primary', 'Show details');

    let img, p;
    if (show.image) {
        if (isDetailed) {
            img = createDOMElem('img', 'card-preview-bg');
            img.style.backgroundImage = `url('${show.image.original}')`
        }else{
            img = createDOMElem('img', 'card-img-top', null, show.image.medium);
        }        
    }else{
        img = createDOMElem('img', 'card-img-top', null, "https://via.placeholder.com/300");
    }

 
    if (show.summary) {
        if (isDetailed) {
            p = createDOMElem('p', 'card-text', show.summary);
        }else{
            p = createDOMElem('p', 'card-text', `${show.summary.slice(0, 80)}...`);
        }
    }else{
        p = createDOMElem('p', 'card-text', "There is no summary fo this show yet.");
    }

    btn.dataset.showId = show.id;

    if (isDetailed) {
        btn.addEventListener('click', this.closeDetailsView);
    }else{
        btn.addEventListener('click', this.openDetailsView);

    }


    
    divCard.appendChild(divCardBody)
    divCardBody.appendChild(img)
    divCardBody.appendChild(h5)
    divCardBody.appendChild(p)
    divCardBody.appendChild(btn)

    return divCard;
}


    
}



document.addEventListener('DOMContentLoaded', new TvApp())