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
            reject('Giving up :( Cannot create an XMLHTTP instance');
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

/*
//test hardcode call
var testJSON = [
    {
        "_id": "57ffce008069be6bd948dd31",
        "name": {
            "first": "Day",
            "last": "Gross"
        }
    },
    {
        "_id": "57ffce00d421f604048197e9",
        "name": {
            "first": "Simon",
            "last": "Vincent"
        }
    },
    {
        "_id": "57ffce01f5a890d50d2ffb93",
        "name": {
            "first": "Mitzi",
            "last": "Graves"
        }
    },
    {
        "_id": "57ffce019a42ad4438355f5a",
        "name": {
            "first": "Reynolds",
            "last": "Green"
        }
    },
    {
        "_id": "57ffce01cd2844a7e82b1855",
        "name": {
            "first": "Todd",
            "last": "Mack"
        }
    },
    {
        "_id": "57ffce01e24d7a1c33de99a3",
        "name": {
            "first": "Elnora",
            "last": "Bates"
        }
    }
];

*/

//pull from file call
var basicJSON;
var callback = {
    success: function (data) {
        console.log(1, 'success', data);
        basicJSON = data["users"];

        //To pull JSON from file
        displayList('ul.users', basicJSON);

    },
    error: function (data) {
        console.log(2, 'error', data);
    }
};
    //makeRequest('data/users.json').then(callback.success, callback.error);
    makeRequest('data/' +_id + '.JSON').then(callback.success, callback.error);  


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
        li.addEventListener('click', displayContent.bind(null, 'section.featured', value));
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

    
    docfrag.appendChild(createParagraphElement('ID: ', item._id));
    docfrag.appendChild(createParagraphElement('Full Name: ', item.name.first + " " + item.name.last));
    docfrag.appendChild(createParagraphElement('Company: ', item.company));
    docfrag.appendChild(createParagraphElement('Email: ', item.email));

    var completed = createParagraphElement('Completed: ', item.name.last);
    completed.setAttribute('class', 'link');
    completed.addEventListener('click', function () {
        item.completed = !item.completed;
        displayContent(selector, item);
    });

    docfrag.appendChild(completed);
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

//Maunal JSON
//window.addEventListener('load', displayList.bind(null, 'ul.users', testJSON));