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

//populates user title
var callbackUserInfo = {
    success: function (data) {
        console.log(1, 'success', data);
        displayContent('div.info', data);
    },
    error: function (data) {
        console.log(2, 'error', data);
    }
};
makeRequest('http://localhost:3000/todo').then(callbackUserInfo.success, callbackUserInfo.error);

function displayContent(selector, item) {
                var dom = document.querySelector(selector);
                var docfrag = document.createDocumentFragment();
                
                /* remove any child elements */
                while (dom.firstChild) {
                    dom.removeChild(dom.firstChild);
                }   
             
                console.log(item);
                
                //loops through array
                for(var i = 0; i < 10; i++){
                    
                    docfrag.appendChild( createParagraphElement('Title: ', item[i].title) );
                }
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