let input = document.querySelectorAll('form.keyIn input');
let btn = document.querySelectorAll('button');
let todoList = document.querySelector('section.todoList');

localStorage.clear()

// get today
let date = new Date();
let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
let today = [date.getFullYear(), month, date.getDate()]

// get data from localStorage
function getData() {
    let data = JSON.parse(localStorage.getItem('todoList'));
    // if there is no data
    if (!data) {
        data = [];
    }
    return data;
}
// save data
function saveData(data) {
    data = JSON.stringify(data);
    localStorage.setItem('todoList', data);
}


btn.forEach(element => {
    element.addEventListener('click', (event) => {
        let data = getData();
        // let div = todoList.children;
        event.preventDefault();
        if (element.id == 'today') {
            // today btn
            input[1].value = today.join('-');
        } else if (element.id == 'nextDay') {
            // next day btn
            if (input[1].value != '') {
                today[2]++;
                input[1].value = today.join('-');
            } else {
                alert('請先輸入一個日期。');
            }
        } else if (element.id == 'add') {
            // add btn
            let memo = [];
            input.forEach(element => memo.push(element.value));
            data.unshift(memo);
            saveData(data);

            // render
            let newMemo = document.createElement('div');
            let p = document.createElement('p');
            p.innerHTML = memo[0];
            let time = document.createComment('p');
            time.innerHTML = memo[1];
            newMemo.classList.add('show');
            newMemo.appendChild(p);
            newMemo.appendChild(time);

            // finish
            let finishBtn = document.createElement('button');
            finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            finishBtn.classList.add('littleBtn')
            finishBtn.classList.add('finish');
            finishBtn.addEventListener('click', e => {
                let div = e.target.parentElement;
                div.classList.toggle('done');
            })

            // Delete
            let deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
            deleteBtn.classList.add('littleBtn');
            deleteBtn.classList.add('delete');
            deleteBtn.addEventListener('click', e => {
                let div = e.target.parentElement;
                div.classList.add('disappear');

                div.addEventListener('animationend', () => {
                    div.remove();
                })
            })

            newMemo.appendChild(finishBtn);
            newMemo.appendChild(deleteBtn);
            todoList.appendChild(newMemo);
        }
    })
})