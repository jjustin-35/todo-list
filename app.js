let input = document.querySelectorAll('form.keyIn input');
let btn = document.querySelectorAll('button');
let todoList = document.querySelector('section.todoList');

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

// get data
let data = getData();

// render the memo
function renderMemo(memo) {
    let newMemo = document.createElement('div');
    let text = document.createElement('p');
    text.innerHTML = memo[0];
    let time = document.createElement('p');
    time.innerHTML = memo[1];
    newMemo.classList.add('show');
    newMemo.appendChild(text);
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
            let text = div.children[0].innerText;
            let time = div.children[1].innerText;
            data.forEach((element, i) => {
                if (element[0] == text && element[1] == time) {
                    data.splice(i, 1);
                    saveData(data);
                }
            })
            div.remove();
        })
    })

    newMemo.appendChild(finishBtn);
    newMemo.appendChild(deleteBtn);
    todoList.appendChild(newMemo);
}

data.forEach(element => {
    renderMemo(element);
});

// btn function
btn.forEach(element => {
    element.addEventListener('click', (event) => {
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
            input.forEach(element => {
                memo.push(element.value);
                element.value = '';
            });
            
            if (memo[0] == '') {
                alert('請輸入內容。');
                return;
            } else if (memo[1] == '') {
                alert('請輸入時間。');
                return;
            }
            
            // local storage
            data.push(memo);
            saveData(data);

            // render
            renderMemo(memo);
        } else if (element.id == 'sort') {
            
        }
    })
})

