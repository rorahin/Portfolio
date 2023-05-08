// // @ts-check
// import Customdialog from './customdialog.js'

// function loadHandler () {
//     let element = document.getElementById("Alert");
//     // document.write("hello");
//     // alert("helllllo")
//     element.addEventListener('click', clickHandler);
// }

// function clickHandler () {
//     alert("clicked");
// }

// loadHandler();
// window.addEventListener('DOMContentLoaded'.loadHandler);

let alertEle = document.getElementById('Alert');
let confirmEle = document.getElementById('Confirm');
let promptEle = document.getElementById('Prompt');
let saferEle = document.getElementById('Safer');
let confirmAnswerEle = document.getElementById('aConfirm');
let promptAnswerEle = document.getElementById('aPrompt');
let safeAnswerEle = document.getElementById('sAPrompt');


const namePattern = /^[A-Za-z\x]+$/;
// alert(alertEle?.nodeName);
// alert(confirmEle?.nodeName);
// alert(saferEle?.nodeName);
//alert(promptAnswerEle?.nodeName);
// alert(confirmAnswerEle?.nodeName)
// alert(safeAnswerEle?.nodeName);

function loadHandler () {

    const hamburgerMenu = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    let isOpen = false;

    hamburgerMenu.addEventListener('click', (event) => {
        event.stopPropagation(); // Stop the click event from bubbling up to the document

        if (!isOpen) {
            menu.style.display = 'block';
            isOpen = true;
        } else {
            menu.style.display = 'none';
            isOpen = false;
        }
    });

    document.addEventListener('click', () => {
        if (isOpen) {
            menu.style.display = 'none';
            isOpen = false;
        }
    });



    alertEle?.addEventListener('click', () => {
        alert('Alert button clicked!')
    })

    confirmEle?.addEventListener('click', () => {
        let answer = confirm('Would you like to continue?');
        if (answer) {
            confirmAnswerEle.innerHTML = `The value returned by the confirm method is : ${answer}`;

            // alert("User confirmed!")
        } else {
            confirmAnswerEle.innerHTML = `User canceled`;
            // alert("User canceled!")
        }
    })

    promptEle?.addEventListener('click', () => {
        let answer = prompt('Enter your name:');
        // if (namePattern.test(answer)) {
        if (answer !== null && answer !== "") {
            promptAnswerEle.innerText = `User's first name is ${answer}`;
            // alert(`User's name is ${answer}.`)
        } else {
            promptAnswerEle.innerHTML = `User didn't enter anything!`
        }
        // }
    })

    saferEle?.addEventListener('click', () => {
        let answer = prompt("Enter your last name:");
        let cAnswer = DOMPurify.sanitize(answer);
        if (cAnswer !== null && cAnswer !== "") {
            safeAnswerEle.innerText = `User's last name is ${cAnswer}`;
            // alert(`User's name is ${answer}.`)
        } else {
            safeAnswerEle.innerHTML = `User didn't enter anything!`
        }
    })

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    /*                                                           */
    /*                  Project HTML                             */
    /*                                                           */
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    // Custom HTML Element Project Card
    /**
     * @class ProjectCard
     */
    class ProjectCard extends HTMLElement {
        /**
         * Setter function for project-data element
         */
        constructor() {
            super()

            // add data member variable to the element
            // this._data = {}          **********************

            // create shadow dom
            const shadow = this.attachShadow({ mode: 'open' })
            shadow.innerHTML = `<link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/icon?family=Material+Icons"
              />`       //     ****************************************************************
            // mainContainer is the always visible section of project-card
            const mainContainer = document.createElement('div')             // <div class='mainContainer' name='mainContent'>
            mainContainer.setAttribute('class', 'mainContainer')
            // header is the always visible section of project-card
            const header = document.createElement('span')                   // <span class='projectHeader' name='header'>
            header.setAttribute('class', 'projectHeader')
            // header is the collapsible section of project-card
            const content = document.createElement('div')                   // <div class='projectContent' name='content'>
            content.setAttribute('class', 'projectContent')
            // append style element to shadow dom
            const styleElem = document.createElement('style')               // <style name='styleElem> stying </style>
            styleElem.textContent = `
          .mainContainer {
              background-color: #53cbfb;
              border-radius: 10px;
              margin-bottom: 5px;
              overflow: hidden;
              box-shadow: 3px 3px 5px gray;
          }
          
          .projectHeader {
              width: 100%;
              position: static;
              display: flex;
              flex: right;
             // justify-content: space-between;
              overflow: hidden;
          }
          
          .projectHeader > * {
              margin: 10px;
          }
          
          .projectContent {
              width: 100%;
              display: none;
              overflow: hidden;
              padding: 5px 10px 5px 10px;
          }
          
          .expand-button {
              cursor: pointer;
          }
          
          .projectContent > * {
              position: relative;
              flex: 1;
          }        
          `

            // Attach Elements to Shadow Dom
            shadow.appendChild(mainContainer)      //  <shadow> <div class='mainContainer' name='mainContent'></div class='mainContainer' name='mainContent'> </shadow>
            mainContainer.appendChild(header)      //  <div> <span class='projectHeader' name='header'></span class='projectHeader' name='header'> </div>
            mainContainer.appendChild(content)     //  <div> <div class='projectContent' style="display: flex" name='content'></div class='projectContent'  style="display: flex" name='content'> </div>
            shadow.appendChild(styleElem)
        }
    }




    function arrowClicked (header, content) {               // ******** no edit button          -- activateEditFunction --
        // header expand and collapse event listener, on click
        const expandButton = header.querySelector('.expand-button')     //   <Button class="expand-button" >
        expandButton.addEventListener('click', function () {            //          |-> <div class='projectContent' name='content' style="display: flex">
            if (content.style.display === 'flex') {
                content.style.display = 'none'
                expandButton.textContent = 'expand_more'
                alert("error");
            } else {
                content.style.display = 'flex'
                expandButton.textContent = 'expand_less'
            }
            alert("error");
        })

        // edit button event listener, change document ui on click          **********************************************
        // const editButton = content.querySelector('.edit-button')
        // editButton.addEventListener('click', function () {
        //     const toShow = content.getElementsByClassName('schedule-edit')
        //     const toShow2 = header.getElementsByClassName('schedule-edit')
        //     const toHide = content.getElementsByClassName('schedule-show')
        //     const toHide2 = header.getElementsByClassName('schedule-show') // clone is found here (115-127), please try to find a better way to do this, e.g. by using fuctions or variables

        //     showHideElements(toShow, toShow2, toHide, toHide2)
        // })

        /**
         * Function that shows or hides elements after closing the edit interface
         *
         * @param {Object} toShow - the elements to show
         * @param {Object} toShow2 - the elements to show
         * @param {Object} toHide - the elements to hide
         * @param {Object} toHide2 - the elements to hide
         */
        // function showHideElements (toShow, toShow2, toHide, toHide2) {  *************************************
        //     for (let i = 0; i < toShow.length; i++) {
        //         toShow[i].style.display = 'inline-block'
        //     }
        //     for (let x = 0; x < toShow2.length; x++) {
        //         toShow2[x].style.display = 'inline-block'
        //     }
        //     for (let y = 0; y < toHide.length; y++) {
        //         toHide[y].style.display = 'none'
        //     }
        //     for (let y = 0; y < toHide2.length; y++) {
        //         toHide2[y].style.display = 'none'
        //     }
        // }

        // submit button event listener, save to local storage on click
        // const submitButton = content.querySelector('.submit-button')        *****************************************
        // submitButton.addEventListener('click', function () {
        //     // scraping information off the document on submit
        //     data = {
        //         calories: // clone found here, please try to find a better way to do this, e.g. by using fuctions or variables
        //             content.getElementsByClassName('calories-input')[0].value,
        //         stat1: content.getElementsByClassName('stat1-input')[0].value,
        //         stat2: content.getElementsByClassName('stat2-input')[0].value,
        //         notes: content.getElementsByClassName('notes-input')[0].value,
        //         type: header.getElementsByClassName('type-input')[0].value,
        //         date: header.getElementsByClassName('date-input')[0].value
        //     }

        //     // temporary fix for the value
        //     header.getElementsByClassName('type-input')[0].setAttribute('value', header.getElementsByClassName('type-input')[0].value)

        //     // content.getElementsByClassName('duration-show')[0].innerText =
        //     //     data.duration
        //     content.getElementsByClassName('calories-show')[0].innerText =
        //         data.calories
        //     content.getElementsByClassName('stat1-show')[0].innerText =
        //         data.stat1
        //     content.getElementsByClassName('stat2-show')[0].innerText =
        //         data.stat2
        //     content.getElementsByClassName('notes-show')[0].innerText =
        //         data.notes
        //     header.getElementsByClassName('type-show')[0].innerText =
        //         functions.capitalizeFirstLetterInEachWord(data.type)
        //     header.getElementsByClassName('date-show')[0].innerText = data.date // clone is found here (20 lines), please try to find a better way to do this, e.g. by using fuctions or variables

        //     const toShow = content.getElementsByClassName('schedule-show')
        //     const toShow2 = header.getElementsByClassName('schedule-show')
        //     const toHide = content.getElementsByClassName('schedule-edit')
        //     const toHide2 = header.getElementsByClassName('schedule-edit') // clone is found here (166-178), please try to find a better way to do this, e.g. by using fuctions or variables

        //     showHideElements(toShow, toShow2, toHide, toHide2)

        //     // save to local storage
        //     this.getRootNode().host.getRootNode().updateData()
        // })

        // cancel button event listener, reset to original values
        // const cancelButton = content.querySelector('.cancel-button')          *****************************************      
        // cancelButton.addEventListener('click', function () {
        //     content.getElementsByClassName('calories-input')[0].value =
        //         data.calories
        //     content.getElementsByClassName('stat1-input')[0].value = data.stat1
        //     content.getElementsByClassName('stat2-input')[0].value = data.stat2
        //     content.getElementsByClassName('notes-input')[0].value = data.notes
        //     header.getElementsByClassName('type-input')[0].value = data.type
        //     header.getElementsByClassName('date-input')[0].value = data.date // clone is found here (20 lines), please try to find a better way to do this, e.g. by using fuctions or variables

        //     const toShow = content.getElementsByClassName('schedule-show')
        //     const toShow2 = header.getElementsByClassName('schedule-show')
        //     const toHide = content.getElementsByClassName('schedule-edit')
        //     const toHide2 = header.getElementsByClassName('schedule-edit')

        //     showHideElements(toShow, toShow2, toHide, toHide2)
        // })

        // delete button event listener, delete from local storage on click
        // const deleteButton = header.querySelector('.delete-button')         ***********************************
        // deleteButton.addEventListener('click', function () {
        //     const updateFunc = this.getRootNode().host.getRootNode().updateData

        //     // remove the card from the document
        //     this.getRootNode().host.remove()

        //     // delete from local storage
        //     updateFunc()
        // })

        // change of exercise type event listener, change the document ui
        // const typeInput = header.querySelector('.type-input')        ***********************************************
        // typeInput.addEventListener('change', function () {
        //     const type = typeInput.value
        //     const stat1 = content.querySelector('.stats1-label')
        //     const stat2 = content.querySelector('.stats2-label')
        //     const units1 = content.querySelector('.stats1-units')
        //     const units2 = content.querySelector('.stats2-units')
        //     // stats dependent on strength or cardio
        //     if (strengthOptions.includes(type)) {
        //         stat1.innerText = strengthStats.stats1 + ': '
        //         stat2.innerText = strengthStats.stats2 + ': '
        //         units1.innerText = ''
        //         units2.innerText = ''
        //     } else if (cardioOptions.includes(type)) {
        //         stat1.innerText = cardioStats.stats1 + ': '
        //         stat2.innerText = cardioStats.stats2 + ': '
        //         units1.innerText = ' (meters)'
        //         units2.innerText = ' (seconds)'
        //     }
        // })
    }


    // Define custom HTML keyword
    customElements.define('project-card', ProjectCard)


    // const content = document.querySelector("project-card").shadowRoot.querySelector("#projectContent")
    // const projectCard = document.querySelector("project-card")
    // const expandButton = header.querySelector('.expand-button')     //   <Button class="expand-button" >
    // expandButton.addEventListener('click', function () {            //          |-> <div class='projectContent' name='content' style="display: flex">
    //     if (projectCard.style.display === 'flex') {
    //         content.style.display = 'none'
    //         expandButton.textContent = 'expand_more'
    //     } else {
    //         content.style.display = 'flex'
    //         expandButton.textContent = 'expand_less'
    //     }
    // })



    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    /*                                                           */
    /*                  Project HTML  -- END --                  */
    /*                                                           */
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    // const project = document.querySelector('project');
    // const button = project.querySelector('button');
    // const content = project.querySelector('.content');

    // button.addEventListener('click', function () {
    //     if (content.style.display === 'none') {
    //         content.style.display = 'block';
    //         button.textContent = 'V';
    //     } else {
    //         content.style.display = 'none';
    //         button.textContent = 'V';
    //     }
    // });



    // 
    const showTextBtn = document.querySelectorAll('#mainProject button');
    const textContainer = document.querySelectorAll('#mainProject div');
    for (let i = 0; i < showTextBtn.length; i++) {
        showTextBtn[i].addEventListener('click', () => {
            textContainer[i].classList.toggle('hidden');
        })
    }
}





// Customdialog()
//     .then(() => {
//         console.log('Dialog closed.');
//     })
//     .catch((err) => {
//         console.log(err);
//     })





// oadHandler();
window.addEventListener('DOMContentLoaded', loadHandler)