// setp 1
window.addEventListener('DOMContentLoaded', init);

function init () {
    const form = document.getElementById('form');
    const xmlRadio = document.getElementById('request');
    let output = document.getElementById('response');


    form.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();

        let requestMethod = submitEvent.submitter.value;
        if ((requestMethod !== 'POST') && (requestMethod !== 'GET')
            && (requestMethod !== 'PUT') && (requestMethod !== 'DELETE')) {
            console.error('Invalid submittion method!!!');
            return;
        }

        let id = submitEvent.srcElement[0].value;
        let articleName = submitEvent.srcElement[1].value;
        let articleBody = submitEvent.srcElement[2].value;
        if (xmlRadio.checked) {
            xmlRequest(requestMethod, id, articleName, articleBody, output);
        } else {
            fetchRequest(requestMethod, id, articleName, articleBody, output);
        }
    });

}

function xmlRequest (method, id, articleName, articleBody, output) {
    // step 2
    let xhr = new XMLHttpRequest();
    let date = new Date();

    if (method === 'GET' || method === 'DELETE') {
        // step 3-5
        xhr.open(method, `https://httpbin.org/${method.toLowerCase()}?id=${encodeURIComponent(id)}
        &article_name=${encodeURIComponent(articleName)}
        &article_body=${encodeURIComponent(articleBody)}
        &date=${encodeURIComponent(date)}`);
    } else {
        // step 3-5
        xhr.open(method, `https://httpbin.org/${method.toLowerCase()}`);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('X-Sent-By', 'javascript');

    // step 3-5
    xhr.onload = function () {
        // step 7-8
        const response = xhr.responseText;
        // step 7-8
        output.innerHTML = response;
    }

    // step 3-5
    if (method === 'GET' || method === 'DELETE') {
        xhr.send();
    } else {
        xhr.send(`id=${encodeURIComponent(id)}
        &article_name=${encodeURIComponent(articleName)}
        &article_body=${encodeURIComponent(articleBody)}
        &date=${encodeURIComponent(date)}`);
    }
}

async function fetchRequest (method, id, articleName, articleBody, output) {
    let date = new Date();
    let response;

    if (method === 'GET' || method === 'DELETE') {
        response = await fetch(`https://httpbin.org/${method.toLowerCase()}?id=${encodeURIComponent(id)}
        &article_name=${encodeURIComponent(articleName)}
        &article_body=${encodeURIComponent(articleBody)}
        &date=${encodeURIComponent(date)}`, {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Sent-By': 'javascript'
            },
        });
    } else {
        response = await fetch(`https://httpbin.org/${method.toLowerCase()}`, {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Sent-By': 'javascript'
            },
            body: `id=${encodeURIComponent(id)}
            &article_name=${encodeURIComponent(articleName)}
            &article_body=${encodeURIComponent(articleBody)}
            &date=${encodeURIComponent(date)}`
        });
    }
    if (response.ok) {
        let responseText = await response.text();
        output.innerHTML = responseText;
    } else {
        alert(`Error : ${response.status}`)
    }
}

function getinit () {

}