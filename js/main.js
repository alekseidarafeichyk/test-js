// 1.Request Любой запрос к любому сервису который отдаёт json, и возвращает данные. https://jsonplaceholder.typicode.com/

const requestURL = 'https://jsonplaceholder.typicode.com/photos';

function makeRequest(method, url, body = null) {
    return fetch(url).then(response => response.json())
}

makeRequest('GET', requestURL)
    .then(response => console.log( 'Запрос выполнен успешно :',response))
    .catch(error => console.log('Запрос выполнен с ошибкой ',error));

// 2. Плюс сделать форму, которая загружает фото. Если ещё и покажешь  фотку, которую загрузил пользователь, вообще класс будет

const realFileBtn = document.getElementById('real-file');
const customBtn = document.getElementById('custom-button');
const customText = document.getElementById('custom-text');

const imagePreview = document.querySelector('.image-preview');
const textPreview = document.querySelector('.image-preview-text');

customBtn.addEventListener('click', function () {
    realFileBtn.click();
})

realFileBtn.addEventListener('change', function () {

    if(realFileBtn.value) {
        customText.textContent = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];

    } else {
        customText.textContent = 'No file chosen, yet.';
    }

    const file = this.files[0];

    if (file) {
        const src = window.URL.createObjectURL(file);

        textPreview.style.display = 'none';
        imagePreview.style.display = 'block';

        imagePreview.setAttribute('src', src);
    }

    // 2-ой способ
    // if (file) {
    //     const reader = new FileReader();
    //
    //     reader.addEventListener('load', function () {
    //
    //         textPreview.style.display = 'none';
    //         imagePreview.style.display = 'block';
    //
    //         imagePreview.setAttribute('src', this.result);
    //     });
    //
    //     reader.readAsDataURL(file);
    // }

})


//3  Сделать одну секцию с фоновой картинкой, у картинки обязательно должна быть оптимизация под ретина и мобильные экраны


// 4 Сделать секцию, у которой есть таймер. Обратный отсчёт до какого-то времени, которое я могу задать в константе.
// - как только таймер отсчитает, сделать любую секцию ниже секции таймера. Где написан какой-то текст. А тайм удалить
// Если я захожу на страницу после таймера, его не должно быть видно

const countDownDate = new Date("Dec 14, 2020 18:00:00").getTime();
const isShowTimer = (countDownDate - new Date().getTime()) > 0;

if (isShowTimer) {

    const countDown = setInterval(function () {

        const now = new Date().getTime();

        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").textContent = `${days} d ${hours} h ${minutes} m ${seconds} s`;

        if (distance < 0) {
            clearInterval(countDown);

            const domElement = document.getElementById('timer');

            addDomElement('div', 'lorem ipsum', domElement);

            document.getElementById("timer").remove();
        }
    }, 1000);
}

function addDomElement(newElement, text, domElement) {

    const element = document.createElement(newElement);
    element.textContent = text;
    element.style.cssText = 'text-align: center; color: #ffffff; font-size: 30px; font-weight: bolder';

    domElement.after(element);
}

