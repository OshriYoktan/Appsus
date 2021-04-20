import { utilService } from './util.service.js';
import { storageService } from './async-storage-service.js';
const EMAILS_KEY = 'EMAILS';

const emails = [
    {
        id: 1,
        subject: 'Sprint',
        text: 'lorem ipsum tahath ass zhoppa tuhes koo',
        to: 'Small',
        from: 'Oshri Yoktan',
        read: false,
        sentAt: 1614253406823,
        dateToShow: moment(1614253406823).format('l'),
        marked: false,
    },
    {
        id: 2,
        subject: 'to do',
        text: 'lorem ipsum tahath ass zhoppa tuhes koo',
        to: 'Talia lugassi',
        from: 'Avi Lugassi',
        read: false,
        sentAt: 1614253406823,
        dateToShow: moment(1614253406823).format('l'),
        marked: false,
    },

    {
        id: 4,
        subject: 'PEPE',
        text: 'lorem ipsum tahath ass zhoppa tuhes koo',
        to: 'PEPE',
        from: 'PEPE',
        read: true,
        sentAt: 1614253406823,
        dateToShow: moment(1614253406823).format('l'),
        marked: false,
    },
    {
        id: 3,
        subject: 'Sprint 3',
        text: 'lorem ipsum tahath ass zhoppa tuhes koo',
        to: 'Oshri',
        from: 'Avi',
        read: true,
        sentAt: 1614253406823,
        dateToShow: moment(1614253406823).format('l'),
        marked: false,
    },
];

function getEmails() {
    return storageService.query(EMAILS_KEY).then((storedMails) => {
        if (!storedMails || !storedMails.length) {
            storageService.postMany(EMAILS_KEY, emails);
            return emails;
        }

        return storedMails;
    });
}

function sortByDate(emailsToSort = emails) {
    return new Promise((resolve, reject) => {
        emailsToSort.sort((a, b) => {
            return a.sentAt - b.sentAt;
        });
        resolve(emailsToSort);
    });
}

function sortByLateDate(emailsToSort = emails) {
    return new Promise((resolve, reject) => {
        emailsToSort.sort((a, b) => {
            return b.sentAt - a.sentAt;
        });
        resolve(emailsToSort);
    });
}

function sortBySender(emailsToSort = emails) {
    return new Promise((resolve, reject) => {
        emailsToSort.sort((a, b) => {
            if (a.subject < b.subject) return -1;
            if (a.subject > b.subject) return 1;
            return 0;
        });
        resolve(emailsToSort);
    });
}

function sortBySubject(emailsToSort = emails) {
    return new Promise((resolve, reject) => {
        emailsToSort.sort((a, b) => {
            if (a.subject < b.subject) return -1;
            if (a.subject > b.subject) return 1;
            return 0;
        });
        resolve(emailsToSort);
    });
}

function reverseSortBySubject(emailsToSort = emails) {
    return new Promise((resolve, reject) => {
        emailsToSort.sort((a, b) => {
            if (b.subject < a.subject) return -1;
            if (b.subject > a.subject) return 1;
            return 0;
        });
        resolve(emailsToSort);
    });
}

function getUnreadEmails() {
    return new Promise((resolve, reject) => {
        let unreadEmails = emails.filter((email) => {
            return !email.read;
        });
        resolve(unreadEmails);
    });
}

function getReadEmails() {
    return new Promise((resolve, reject) => {
        let readEmails = emails.filter((email) => {
            return email.read;
        });
        resolve(readEmails);
    });
}

// function getUnmarkedEmails() {
//     return new Promise((resolve, reject) => {
//         let unreadEmails = emails.filter((email) => {
//             return !email.marked;
//         });
//         resolve(emails);
//     });
// }

function getMarkedEmails() {
    return new Promise((resolve, reject) => {
        let markedEmails = emails.filter((email) => {
            return email.marked;
        });
        resolve(markedEmails);
    });
}

function getSentEmails() {
    return new Promise((resolve, reject) => {
        let unreadEmails = emails.filter((email) => {
            return email.subject === 'Avi Lugassi';
        });
        resolve(unreadEmails);
    });
}

function emptyMail() {
    return new Promise((resolve, reject) => {
        var emptyMail = {
            id: _getNextId(),
            subject: '',
            text: '',
            to: '',
            from: 'Avi Lugassi',
            read: false,
            marked: false,
            sentAt: Date.now(),
            dateToShow: moment(Date.now()).format('l'),
        };
        resolve(emptyMail);
    });
}

function _getNextId() {
    var maxId = emails.reduce((acc, note) => {
        return note.id > acc ? note.id : acc;
    }, 0);
    return maxId + 1;
}

// function _getRenderDate(date) {
//     var result = '';
//     // var d = new Date();
//     result += date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
//     return result;
// }

function getMail(id) {
    return new Promise((resolve, reject) => {
        var foundMail = emails.find((mail) => mail.id === id);
        resolve(foundMail);
    });
}

function saveMail(newMailContent, id) {
    var mailToChangeIdx = emails.findIndex((mail) => mail.id === id);

    if (mailToChangeIdx === -1) emails.push(newMailContent);
    else emails.splice(mailToChangeIdx, 1, newMailContent);
    utilService.saveToStorage(EMAILS_KEY, emails);
}

function deleteMail(id) {
    var mailTochangeIdx = emails.findIndex((mail) => mail.id === id);
    emails.splice(mailTochangeIdx, 1);
    utilService.saveToStorage(EMAILS_KEY, emails);
}

function showMail(id) {
    var foundMail = emails.find((mail) => mail.id === id);
    foundMail.read = true;
}

function search(searchedValue) {
    debugger;
    var refiendEmails = [];
    var wordToSearch = searchedValue.toLowerCase();
    return new Promise((resolve, reject) => {
        refiendEmails = emails.filter((email) => {
            debugger;
            return (
                email.subject.toLowerCase().includes(wordToSearch) ||
                email.to.toLowerCase().includes(wordToSearch) ||
                email.subject.toLowerCase().includes(wordToSearch) ||
                email.text.toLowerCase().includes(wordToSearch)
            );
        });
        resolve(refiendEmails);
        reject('Service Failed To Filter Emails');
    });
}

function addMail(mailContent) {
    return storageService.post(EMAILS_KEY, mailContent);

    // return new Promise((resolve, reject) => {
    //     emails.push(mailContent);
    //     console.log('sended');
    //     resolve(console.log('Email Added!'));
    //     reject(console.log('service Failed To Add Email!'));
    //     utilService.saveToStorage(EMAILS_KEY, emails);
    // });
}

function changeMarked(id) {
    var mailTochangeIdx = emails.findIndex((mail) => mail.id === id);
    emails[mailTochangeIdx].marked = !emails[mailTochangeIdx].marked;
}

export default {
    getEmails,
    getMail,
    saveMail,
    deleteMail,
    emptyMail,
    sortBySender,
    sortByDate,
    sortByLateDate,
    showMail,
    getSentEmails,
    search,
    getReadEmails,
    getUnreadEmails,
    addMail,
    changeMarked,
    getMarkedEmails,
    sortBySubject,
    reverseSortBySubject,
};
