import RolasApi from '../services/RolasApi.js';

class RolaList {
    constructor() {
        this._rolaListEl = document.querySelector('#rola-list');
        this._rolas = [];

        this.getRolas();

        this._validTags = new Set();
        this._validTags.add('rola');
        this._validTags.add('benga');
        this._validTags.add('vara');

    };

    addEventListeners() {
        this._rolaListEl.addEventListener('click', this.handleDeleteClick.bind(this));
    };

    async getRolas() {
        try {
            const data = await RolasApi.getRolas();

            this._rolas = data;
            this.render();
        } catch(error) {
            console.log(error);
        };
    };

    async deleteRola(rolaId) {
        let newRolas = [rolaId];
        try {
            // Delete from server
            const res = await RolasApi.deleteRola(rolaId);

            for(let i = 0; i < this._rolas.length; i++) {
                if(this._rolas[i] !== rolaId) {
                    newRolas.push(this._rolas[i]);
                };
            };

            this._rolas = newRolas;
            this.getRolas();
        } catch(error) {
            alert('You cant delete this one');
        };
    };

    addRolaToList(rola) {
        this._rolas.push(rola);
        this.render();
    }

    getTagClass(tag) {
        tag = tag.toLowerCase();

        let tagClass = '';

        if(this._validTags.has(tag)) {
            tagClass = `tag-${tag}`;
        } else {
            tagClass = '';
        };

        return tagClass;
    };

    handleDeleteClick(e) {
        if(e.target.classList.contains('fa-times')) {
            e.stopImmediatePropagation();
            const rolaId = e.target.parentElement.parentElement.dataset.id;
            
            this.deleteRola(rolaId);
        };
    };

    render() {
        let html = '';

        for(let i = 0; i < this._rolas.length; i++) {
            const rola = this._rolas[i];
            const tagClass = this.getTagClass(rola.tag);

            let deleteBtn = '';
            if(rola.username === localStorage.getItem('username')) {
                deleteBtn = '<button class="delete"><i class="fas fa-times"></i></button>'
            };

            html = html + `
                <div class="card" data-id="${rola._id}">
                    ${deleteBtn}
                    <h3>${rola.rola}</h3>
                    <p class="tag ${tagClass}">${rola.tag.toUpperCase()}</p>
                    <p>
                        Posted on <span class="date">${rola.date}</span> by
                        <span class="author">${rola.username}</span>
                    </p>
                </div>
            `;
        };
        this._rolaListEl.innerHTML = html;

        this.addEventListeners();
    };
};

export default RolaList;