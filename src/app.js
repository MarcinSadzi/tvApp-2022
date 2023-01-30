
import { mapListToDOMElements } from './DOMInteractions.js'
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
    }
    connectDomElements = () =>{
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        const listOfShowNames = Array.from(
            document.querySelectorAll('[data-show-name]')
            ).map(elem => elem.dataset.showName);


            console.log(listOfShowNames);
            console.log(listOfIds);
            
            // this.showNameBtn = 
            this.viewElems = mapListToDOMElements(listOfIds, 'id');
            this.showNameBtn = mapListToDOMElements(listOfShowNames, 'data-show-name');
            console.log(this.viewElems)
            console.log(this.showNameBtn)
    }
    setupListeners = () => {
        Object.keys(this.showNameBtn).forEach(showName => {
            this.showNameBtn[showName].addEventListener('click', this.setCurrentNameFilter);
        })
    }
    setCurrentNameFilter = () => {
        this.selectedName = event.target.dataset.showName;
    }
}



document.addEventListener('DOMContentLoaded', new TvApp())