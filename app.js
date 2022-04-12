let memoInfo = document.querySelectorAll('form.keyIn input');
let btnInForm = document.querySelectorAll('form.keyIn button');
let sort = document.querySelector('#sort');
let todoList = document.querySelector('section.todoList');

localStorage.clear()

// get today
let date = new Date();
let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
let today = [date.getFullYear(), month, date.getDate()]

btnInForm.forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        if (element.id == 'today') {
            // today btn
            memoInfo[1].value = today.join('-');
        } else if (element.id == 'nextDay') {
            // next day btn
            if (memoInfo[1].value != '') {
                today[2]++;
                memoInfo[1].value = today.join('-');
            } else {
                alert('請先輸入一個日期。');
            }
        } else if (element.id == 'add') {
            // add btn
            let data = getData();
            let memo = [];
            memoInfo.forEach(element => memo.push(element.value));
            data.unshift(memo);
            saveData(data);
        }
    })
})

// get data from localStorage
function getData() {
    let data = JSON.parse(localStorage.getItem('todoList'));
    // if there is no data
    if (!data) {
        data = [];
    }
    return data;
}

function saveData(data) {
    data = JSON.stringify(data);
    localStorage.setItem('todoList', data);
}