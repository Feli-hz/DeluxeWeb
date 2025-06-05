const btn = document.getElementById('button');
const sectionAll = document.querySelectorAll('section[id]');
const inputName = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll('[data-section]');

/* ===== Loader =====*/
window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
})

/*===== Header =====*/
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('abajo', window.scrollY > 0);
});

/*===== Boton Menu =====*/
btn.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        this.classList.remove('active');
        this.classList.add('not-active');
        document.querySelector('.nav_menu').classList.remove('active');
        document.querySelector('.nav_menu').classList.add('not-active');
    }
    else {
        this.classList.add('active');
        this.classList.remove('not-active');
        document.querySelector('.nav_menu').classList.remove('not-active');
        document.querySelector('.nav_menu').classList.add('active');
    }
});

/*===== Cambio de idioma =====*/
const changeLanguage = async language => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for(const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = texts[section][value];
    }
}

flagsElement.addEventListener('click', (e) => {
    changeLanguage(e.target.parentElement.dataset.language);
})

/*===== class active por secciones =====*/
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sectionAll.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
        }
        else {
            document.querySelector('nav a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
});

/*===== Boton y función ir arriba =====*/
window.onscroll = function() {
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container').classList.add('show');
    }
    else {
        document.querySelector('.go-top-container').classList.remove('show');
    }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const formulario = document.getElementById('form');
const mensajeExito = document.getElementById('mensaje-enviado');

formulario.addEventListener('submit', async function(e) {
    e.preventDefault(); // Detenemos el comportamiento por defecto

    const formData = new FormData(this);

    try {
        const response = await fetch(formulario.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            mensajeExito.style.display = 'block';
            formulario.reset();
            setTimeout(() => {
                mensajeExito.style.display = 'none';
            }, 5000);
        } else {
            alert('Ocurrió un error al enviar el mensaje.');
        }

    } catch (error) {
        alert('Error de red al enviar el formulario.');
    }
});
