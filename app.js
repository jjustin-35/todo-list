let input = document.querySelectorAll('form.keyIn input');
let btn = document.querySelectorAll('button');

// get today
let date = new Date();
let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
let today = [date.getFullYear(), month, date.getDate()];

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

// render the memo
function renderMemo(memo) {
    let todoList = document.querySelector('section.todoList');
    let newMemo = document.createElement('div');
    let text = document.createElement('p');
    let time = document.createElement('p');

    // judge the mission is done or not.
    if (memo.finish) {
        newMemo.classList.add('done');
    }

    // judge the time is epiring or not
    let thisDay = new Date(today.join('-'));
    let anotherDay = new Date(memo.time);
    if (anotherDay < thisDay) {
        text.innerHTML += '<i class="fa-solid fa-circle-exclamation" title="time expired"></i>';
        text.style.background = 'yellow';
        time.style.background = 'yellow';
    }

    text.innerHTML += memo.text;
    time.innerHTML += memo.time;

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

        if (!memo.finish) {
            memo.finish = true;
        } else {
            memo.finish = false;
        }

        saveData(data);
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
                if (element.text == text && element.time == time) {
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

// use the merge sort in sort btn
function mergeTime(arr1, arr2) {
    let i = 0;
    let j = 0;
    let result = [];

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i].ms <= arr2[j].ms) {
            result.push(arr1[i]);
            i++;
        }else if (arr2[j].ms <= arr1[i].ms) {
            result.push(arr2[j]);
            j++;
        }
    }
    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }

    return result;
}
function mergeSort(arr) {
    if (arr.length == 1) {
        return arr;
    } else {
        let middle = Math.floor(arr.length / 2);
        let left = arr.slice(0, middle);
        let right = arr.slice(middle, arr.length);

        return mergeTime(mergeSort(left), mergeSort(right))
    }
}

// get data firstime
let data = getData();

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
                let date = new Date(input[1].value);
                let year = date.getFullYear();
                let month = date.getMonth();
                let datetime = date.getDate();

                let lastDate = new Date(year, month+1, 0);
                if (datetime < lastDate.getDate()) {
                    datetime++;
                } else if (month < 11) {
                    datetime = 1;
                    month++;
                } else {
                    datetime = 1;
                    month = 0;
                    year++;
                }
                month = (month + 1) < 10 ? `0${month + 1}` : month + 1;
                datetime = datetime < 10 ? `0${datetime}` : datetime;

                let dateArray = [year, month, datetime]
                
                input[1].value = dateArray.join('-');
            } else {
                alert('請先輸入一個日期。');
            }
        } else if (element.id == 'add') {
            // add btn
            let memo = {
                text: input[0].value,
                time: input[1].value,
                ms: new Date(input[1].value).getTime(),
                finish: false,
            };

            if (memo.text == '') {
                alert('請輸入內容。');
                return;
            } else if (memo.time == '') {
                alert('請輸入時間。');
                return;
            }
            
            // local storage
            data.push(memo);
            saveData(data);

            // render
            renderMemo(memo);

            input[0].value = '';
            input[1].value = '';
        } else if (element.id == 'sort') {
            let div = document.querySelectorAll('.todoList div');
            div.forEach(element => element.remove());

            data = mergeSort(data);
            data.forEach(element => renderMemo(element));

            saveData(data);
        }
    })
})