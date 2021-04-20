

export default {
    getKeeps,
    addKeep,
    deleteKeep,
    updateKeep,
    updateLabels,
    getLabels
};

window.currId = 101;

function getKeeps() {
    if (!localStorage.getItem('gKeeps')) {
        localStorage.setItem('gKeeps', JSON.stringify(gKeeps));
        localStorage.setItem('KeepsCurrId', currId);
    }
    currId = localStorage.getItem('KeepsCurrId');
    return Promise.resolve(JSON.parse(localStorage.getItem('gKeeps')));
};

function addKeep(newKeepData) {
    let keeps = JSON.parse(localStorage.getItem('gKeeps'));
    keeps.unshift(newKeepData);
    localStorage.setItem('gKeeps', JSON.stringify(keeps));
    localStorage.KeepsCurrId = currId;
};

function deleteKeep(id) {
    let keeps = JSON.parse(localStorage.getItem('gKeeps'));
    let idx = keeps.findIndex(keep => keep.id === id);
    keeps.splice(idx, 1);
    localStorage.setItem('gKeeps', JSON.stringify(keeps));
};

function updateKeep(updtdKeepData) {
    let keeps = JSON.parse(localStorage.getItem('gKeeps'));
    let idx = keeps.findIndex(keep => keep.id === +updtdKeepData.id);
    keeps.splice(idx, 1, updtdKeepData);
    localStorage.setItem('gKeeps', JSON.stringify(keeps));
};

function getLabels() {
    return JSON.parse(localStorage.getItem('keepLabels'));
};

function updateLabels(labels) {
    let labelsStr = JSON.stringify(labels);
    localStorage.setItem('keepLabels', labelsStr);
};

const gLabels = ['personal', 'work'];

const gKeeps = [
    {
        title: 'Do Laundry',
        id: currId++,
        type: 'task',
        color: '#EEF26C',
        labels: ['personal'],
    },
 
    {
        title: 'Mountain',
        id: currId++,
        type: 'image',
        extra: 'https://cdn.shopify.com/s/files/1/2341/3995/files/charlotte-karlsen-768256-unsplash_2048x2048.jpg?v=1547581682',
        color: '#B89747',
        labels: ['personal'],
    },
    {
        title: 'Codeing Academy , January 2021',
        id: currId++,
        type: 'task',
        color: '#96A90E',
        labels: [],
    },
 
    {
        title: 'Build By Avi Lugassi & Oshri Yoktan',
        id: currId++,
        type: 'task',
        color: '#4B64D3',
        labels: [],
    },
];