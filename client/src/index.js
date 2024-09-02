import '@fortawesome/fontawesome-free/css/all.css';
import RolaList from './components/RolaList.js';
import Modal from './components/Modal.js';
import RolaForm from './components/RolaForm.js';
import './css/style.css';

const rolaList = new RolaList();
const modal = new Modal();
const rolaForm = new RolaForm();

rolaList.render();
rolaForm.render();