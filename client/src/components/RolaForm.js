import RolasApi from '../services/RolasApi.js';
import RolaList from './RolaList.js';

class RolaForm {
    constructor() {
        this._formModal = document.querySelector('#form-modal');
        this._rolaList = new RolaList();
    };

    addEventListeners() {
        this._form.addEventListener('submit', this.handleSubmit.bind(this));
    };

    async handleSubmit(e) {
        e.preventDefault();

        const rola = {
            rola: this._form.elements.rola.value,
            tag: this._form.elements.tag.value,
            username: this._form.elements.username.value,
        };

        // Add rola to server
        const newRola = await RolasApi.createRola(rola);

        // Add rola to frontend
        this._rolaList.addRolaToList(newRola);

        // Clear Fields
        this._form.elements.rola.value = '';
        this._form.elements.tag.value = '';
        this._form.elements.username.value = '';

        document.dispatchEvent(new Event('closemodal'));
    };

    render() {
        this._formModal.innerHTML = `
            <form id="rola-form">
            <div class="form-control">
                <label for="username">Enter a Username</label>
                <input type="text" name="username" id="username" />
            </div>
            <div class="form-control">
                <label for="rola-text">What's Your Idea?</label>
                <textarea name="rola" id="rola-text"></textarea>
            </div>
            <div class="form-control">
                <label for="tag">Tag</label>
                <input type="text" name="tag" id="tag" />
            </div>
            <button class="btn" type="submit" id="submit">Submit</button>
            </form>
        `;

        this._form = document.querySelector('#rola-form');
        this.addEventListeners();
    };
};

export default RolaForm;