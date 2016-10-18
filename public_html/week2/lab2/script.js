/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

function makeRequest(url) {

    var promise = new Promise(httpPromise);

    function httpPromise(resolve, reject) {
        var httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            reject('Giving up :frowning: Cannot create an XMLHTTP instance');
        }

        httpRequest.open('GET', url);
        httpRequest.send();

        httpRequest.addEventListener('load', httpResolve.bind(httpRequest));
        httpRequest.addEventListener('error', httpReject.bind(httpRequest));

        function httpResolve() {
            if (this.status >= 200 && this.status < 300) {
                // Performs the function "resolve" when this.status is equal to 2xx
                resolve(JSON.parse(this.response));
            } else {
                // Performs the function "reject" when this.status is different than 2xx
                reject(this.statusText);
            }
        }

        function httpReject() {
            reject(this.statusText);
        }

    }
    // Return the promise
    return promise;
}


//populates Nav
var userNavJSON;

var callbackUserNav = {
    success: function (data) {
        console.log(1, 'success', data);
        userNavJSON = data["users"];
        displayList('ul.users', userNavJSON);
    },
    error: function (data) {
        console.log(2, 'error', data);
    }
};
makeRequest('data/users.json').then(callbackUserNav.success, callbackUserNav.error);


//populates user 
var callbackUserInfo = {
    success: function (data) {
        console.log(1, 'success', data);
        displayContent('section.featured', data);
    },
    error: function (data) {
        console.log(2, 'error', data);
    }
};

function infoOnClick(id) {
    makeRequest('data/' + id + '.json').then(callbackUserInfo.success, callbackUserInfo.error);
}

function userIMG(picture){
    makeRequest('data/img' + picture + '.png').then(callbackUserInfo.success, callbackUserInfo.error);
}


function displayList(selector, list) {
    var dom = document.querySelector(selector);
    /* this document fragment is just for performance 
     * We create all the elements to add to the page
     * add them to the fragment, then add the fragment to
     * the page.  Much faster than just adding all the
     * elements to the page one at a time
     * 
     */
    var docfrag = document.createDocumentFragment();

    /* JavaScript now has built in foreach loops for arrays */
    list.forEach(function (value) {
        /* you can use the creaeElement tag to create any HTML element you want */
        var li = document.createElement("li");

        //Set value
        li.textContent = value.name.first + " " + value.name.last;
        /* you can set any attribute using the function below for any Created element */
        li.setAttribute('class', 'link');
        /*you can even attach events to the element */
        //li.addEventListener('click', displayContent.bind(null, 'section.featured', value));
        li.addEventListener('click',userIMG.bind(null,value.picture));
        li.addEventListener('click', infoOnClick.bind(null, value._id));
        docfrag.appendChild(li);
    });

    /* after the fragment is completed we can add it to the page */
    dom.appendChild(docfrag);
}
function displayContent(selector, item) {
    var dom = document.querySelector(selector);
    var docfrag = document.createDocumentFragment();

    /* remove any child elements */
    while (dom.firstChild) {
        dom.removeChild(dom.firstChild);
    }

    docfrag.appendChild(createParagraphElement(item.picture));
    docfrag.appendChild(createParagraphElement('Full Name: ', item.name.first + " " + item.name.last));
    docfrag.appendChild(createParagraphElement('Company: ', item.company));
    docfrag.appendChild(createParagraphElement('Email: ', item.email));
    docfrag.appendChild(createParagraphElement('Phone: ', item.phone));
    docfrag.appendChild(createParagraphElement('Address: ', item.address));
    docfrag.appendChild(createParagraphElement('Registered: ', item.registered));
    docfrag.appendChild(createParagraphElement('Age: ', item.age));
    docfrag.appendChild(createParagraphElement('Eye Color: ', item.eyeColor));
    docfrag.appendChild(createParagraphElement('Greeting: ', item.greeting));
    docfrag.appendChild(createParagraphElement('Favorite Fruit: ', item.favoriteFruit));
    docfrag.appendChild(createParagraphElement('Balance: ', item.balance));
    docfrag.appendChild(createParagraphElement('About: ', item.about));


    dom.appendChild(docfrag);
}

/* custom function to generate a template for our view */
function createParagraphElement(label, text) {
    var pTag = document.createElement('p'),
            strongTag = document.createElement('strong'),
            strongText = document.createTextNode(label),
            pText = document.createTextNode(text);

    strongTag.appendChild(strongText);
    pTag.appendChild(strongTag);
    pTag.appendChild(pText);
    return pTag;
}