// Bullets
let bull = document.createElement('div');
let li = document.createElement('li');
bull.className = 'bullets';

for (let index = 0; index < 10; index++) {
    let li = document.createElement('li');

    bull.appendChild(li);
}

let btn = document.querySelector('.btn');
btn.appendChild(bull)

// Form
let qes = document.querySelector('.qes');
let h2 = document.createElement('h2');
let form = document.createElement('form');
let count = 0;

let jsData = new XMLHttpRequest();
jsData.open('GET', 'qes.json');
jsData.send();

jsData.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let mainData = JSON.parse(this.response);

        let saveEndAnswer ;

        function questionsAndAnswer() {
            qes.innerHTML = '';
            form.innerHTML = '';

            h2.innerHTML = mainData[count].ques;
            for (let index = 1; index <= 4; index++) {
                let div = document.createElement('div');
                let input = document.createElement('input');
                let label = document.createElement('label');
        
                input.type = 'radio';
                input.name = 'lang';
                input.id = index;
                
                input.value = `${mainData[count][`ans${index}`]}`
                label.setAttribute('value',`${mainData[count][`ans${index}`]}`);
                label.innerHTML = mainData[count][`ans${index}`];
                label.setAttribute('for' ,index);
                
                if (index === 1) {
                    label.className = 'active';
                    saveEndAnswer = label.getAttribute('value');
                    input.checked = true;
                }
                div.appendChild(input);
                div.appendChild(label);
    
                form.appendChild(div);
            }
            qes.appendChild(h2);
            qes.appendChild(form);
    
            // click on input label
            let labelAll = document.querySelectorAll('form label')
            labelAll.forEach(function (e) {
                e.onclick = function () {
                    labelAll.forEach(function (e) {
                        e.classList.remove('active');
                    })
                    this.classList.add('active');
                    // Save Answer
                    saveEndAnswer = this.getAttribute('value')
                }
            })
            
        }
        questionsAndAnswer();

        // Submit Answer
        let countRightAnswer = 0;
        let button = document.querySelector('.btn button');
        document.querySelector('.btn button').className  = count;
        button.onclick = function () {

            // Ckeck End Answer
            if (saveEndAnswer === mainData[count].answer){
                countRightAnswer++;

            }if (count < mainData.length - 1) {
                count++;
                questionsAndAnswer();
                activeLi();
                document.querySelector('.btn button').className  = count;

            }else {
                qes.innerHTML = `<button>Show Result</button>`;
                document.querySelector('.btn').innerHTML = '';
                document.querySelector('.qes button').onclick = function () {
                    
                    if (countRightAnswer > (mainData.length/2)) {
                        qes.innerHTML = `<span> <h3>Good</h3>, ${countRightAnswer} From ${mainData.length}</span>`;
                    }else{
                        qes.innerHTML = `<span> <h3>Bad</h3>, ${countRightAnswer} From ${mainData.length}</span>`;
                    }
                }
            }
        }

    }
}

// Acitve li 
function activeLi() {
    let liItem = document.querySelectorAll('.bullets li');
    liItem[count].classList.add('active');
}
activeLi();


