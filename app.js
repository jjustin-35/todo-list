let memoInfo = document.querySelectorAll('form.keyIn input');
let btnInForm = document.querySelectorAll('form.keyIn button');
let sort = document.querySelector('#sort');
let todoList = document.querySelector('section.todoList');

// get today
let date = new Date();
let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
let today = [date.getFullYear(), month, date.getDate()]

// today btn
btnInForm[0].addEventListener('click', () => {
    memoInfo[1].value = today.join('-');
})
// next day btn
btnInForm[1].addEventListener('click', () => {
    if (memoInfo[1].value != '') {
        today[2]++;
        memoInfo[1].value = today.join('-');
    } else {
        alert('請先輸入一個日期。');
    }
})

