function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';//to prevent scrolling of page in time that modal window active

    console.log(modalTimerId);
    if(modalTimerId){
        clearInterval(modalTimerId);//to prevent pop-uping of modal  window if user open it itself
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId){
    //Modal

    const modalTriggers = document.querySelectorAll(triggerSelector),//using data selectors
        modal = document.querySelector(modalSelector);

    modalTriggers.forEach(btn => {//handling event on buttons 'call me'
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            //first condition - close modal window if user click outside of it
            //second condition - close modal window if user click on "X"
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {//close modal window if user press 'Esc'
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {//open modal window if user get the footer
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);//window.pageYOffset - have many px user flipped from top
            //document.documentElement.clientHeight - the height of the visible part of document
            //document.documentElement.scrollHeight - the full height of document
            window.removeEventListener('scroll', showModalByScroll);//removing of event if user once get the 
            //modal window by scrolling till the end of page
        }
    }

    window.addEventListener('scroll', showModalByScroll);//handling event on global window if user get footer,
    //modal window pop-up
}

export default modal;//ES6
export {openModal};
export {closeModal};