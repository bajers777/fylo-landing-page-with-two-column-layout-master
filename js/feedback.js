const pageButton = document.querySelector('.viewFeedbackForm');
const hiddenButtonText = document.querySelector('.hiddenButtonText');
const feedbackArrow = document.querySelector('.viewFeedbackForm>i');

const feedbackForm = document.querySelector('.feedbackForm');
const siteBgGray = document.querySelector('.siteBgGray');

const userCompanyName = document.querySelector('#userCompanyName');
const userName = document.querySelector('#userName');
const userCompanyEmail = document.querySelector('#userCompanyEmail');
const userFeedbackMessage = document.querySelector('#userFeedbackMessage');
const emailFormButton = document.querySelector('.emailFormButton');

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

const UserFeedback = function(company, name, email, feedbackText, id){
    this.company = company;
    this.name = name;
    this.email = email;
    this.feedbackText = feedbackText;
    this.id = id;
}

const createUserFeedback = function(){
    const newFeedback = new UserFeedback(userCompanyName.value, userName.value, userCompanyEmail.value, userFeedbackMessage.value);
    console.log(JSON.stringify(newFeedback));
    return newFeedback;
}
pageButton.addEventListener('click', ()=>{
    feedbackForm.classList.remove('hidden');
    feedbackForm.classList.remove('hiddenForm');
    siteBgGray.classList.remove('hidden');
    siteBgGray.addEventListener('click', ()=>{
        feedbackForm.classList.add('hiddenForm');
        siteBgGray.classList.add('hidden');    
    })
    emailFormButton.addEventListener("click", ()=>{
        
        postData('http://localhost:3000/feedback', createUserFeedback())
            .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
  });

        document.querySelectorAll('.feedbackForm > *').forEach((element)=>{
            element.classList.add('hidden');
        });
        feedbackForm.appendChild(document.createElement('h3')).textContent = "Thank you for feedback!";
    });
});
pageButton.addEventListener('mouseover', ()=>{
    hiddenButtonText.classList.remove('hidden');
    feedbackArrow.style.animation = "feedbackArrow .3s forwards";
    pageButton.addEventListener('mouseout', ()=>{
        hiddenButtonText.classList.add('hidden');
        feedbackArrow.style.animation = "";
    })
})
