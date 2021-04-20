
import {eventBus} from '../../../services/event-bus-service.js';
import keepStorageService from './keep-storage-service.js';
import {utilService} from '../../../services/util.service.js';
export default {
    getKeeps,
    addKeep,
    deleteKeep,
    updateKeep,
    updateLabels,
    getLabels,
};

function getKeeps() {
    return keepStorageService.getKeeps();
};

function addKeep(newKeepData) {
    if (!newKeepData.id) {
        currId = +localStorage.getItem('KeepsCurrId');
        localStorage.setItem('KeepsCurrId', currId++)
        newKeepData.id = localStorage.KeepsCurrId;
    } if (!newKeepData.color) {
        newKeepData.color = utilService.getRandomColor();
    }
    keepStorageService.addKeep(newKeepData);
};

function deleteKeep(id) {
    keepStorageService.deleteKeep(id);
    eventBus.$emit('keepDeleted');
};

function updateKeep(updtdKeepData) {
    keepStorageService.updateKeep(updtdKeepData);
};

function updateLabels(labels) {
    let lowerCaseLabels = labels.map((label) => label.toLowerCase());
    keepStorageService.updateLabels(lowerCaseLabels);
};

function getLabels() {
    return keepStorageService.getLabels();
}

eventBus.$on('email-keep-added', addKeep);