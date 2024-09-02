class RolaList {
    constructor() {
        this._rolaListEl = document.querySelector('#rola-list');
        this._rolas = [
            {
                id: 1,
                rola: 'benga graúda no verão',
                tag: 'penes',
                username: 'tatau',
                date: '04/20/2024',
            },
            {
                id: 2,
                rola: 'jeba rombuda no balde',
                tag: 'big-penes',
                username: 'bago',
                date: '10/07/2024',
            }
        ];
    };

    render() {
        let html = '';

        for(let i = 0; i < this._rolas.length; i++) {
            const rola = this._rolas[i];
            html = html + `
                <div class="card">
                    <button class="delete"><i class="fas fa-times"></i></button>
                    <h3>${rola.rola}
                    </h3>
                    <p class="tag tag-technology">${rola.tag.toUpperCase()}</p>
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