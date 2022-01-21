const refreshButton = document.querySelector('.feedbackRefresh');
const mainTable = document.querySelector('table>tbody');
let newFeedbackArray = [];



function fetchData(){
    fetch('http://localhost:3000/feedback')
  .then(response => response.json())
  .then(data => {
    newFeedbackArray = [...data];
    console.log(newFeedbackArray);
})
}
fetchData();
const createRow = ()=>{
    const tdClass = ['feedbackCheckbox', 'company', 'email', 'name', 'feedback_body-buttons'];
    const spanIconClassArray = ['feedbackNote', 'feedbackDelete', 'feedbackAdd'];
    const iconClassArray = ['fa-sticky-note', 'fa-trash-alt', 'fa-plus-square'];
    let arrayObjCounter = 0;
    for (let i = 0; i<newFeedbackArray.length; i++){
        const newTr = mainTable.appendChild(document.createElement('tr'));
        newTr.classList.add('feedback_body-userFeedback');
        tdClass.forEach(item=>{
            const newTd = newTr.appendChild(document.createElement('td'));
            newTd.classList.add(item);
            if (newTd.className === 'feedbackCheckbox'){
                newTd.appendChild(document.createElement('input')).setAttribute("type", "checkbox");
            }
            else if (newTd.className === 'feedback_body-buttons'){
                let arrayCounter = 0;
                for (let i = 0; i<spanIconClassArray.length; i++){
                    const icon = document.createElement('i');
                    const spanIcon = document.createElement('span');
                    newTd.appendChild(spanIcon).classList.add(spanIconClassArray[arrayCounter]);
                    spanIcon.appendChild(icon);
                    icon.classList.add('far', iconClassArray[arrayCounter]);
                    arrayCounter++;
                }
            }
            else{
                for (const property in newFeedbackArray[arrayObjCounter]){
                    if (property === item){
                        newTd.textContent = `${newFeedbackArray[arrayObjCounter][property]}`
                    }
                }
            }
        })
        arrayObjCounter++;
    }
}
refreshButton.addEventListener("click", ()=>{
    createRow();
})