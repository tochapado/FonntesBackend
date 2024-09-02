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

    async getRolas() {
        try {
            const res = await RolasApi.getRolas();
            this._rolas = res.data.data;
            this.render();
        } catch(error) {
            console.log(error);
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

    render() {
        let html = '';

        for(let i = 0; i < this._rolas.length; i++) {
            const rola = this._rolas[i];
            const tagClass = this.getTagClass(rola.tag);


            html = html + `
                <div class="card">
                    <button class="delete"><i class="fas fa-times"></i></button>
                    <h3>${rola.rola}
                    </h3>
                    <p class="tag ${tagClass}">${rola.tag.toUpperCase()}</p>
                    <p>
                        Posted on <span class="date">${rola.date}</span> by
                        <span class="author">${rola.username}</span>
                    </p>
                </div>
            `;
        };
        this._rolaListEl.innerHTML = html;
    };
};

export default RolaList;