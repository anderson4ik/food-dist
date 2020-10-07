function calc(){
    // Calculator of Calories

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;
 
    //setting data to local storage
    if(localStorage.getItem('sex')){
       sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
//setting data to local storage
    if(localStorage.getItem('ratio')){
       ratio = localStorage.getItem('ratio');
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSetting(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
           element.classList.remove(activeClass);
           if(element.getAttribute('id') === localStorage.getItem('sex')){
               element.classList.add(activeClass);
           }
           if(element.getAttribute('data-ratio') === localStorage.getItem('ratio')){
               element.classList.add(activeClass);
           }
    });
}


    initLocalSetting('#gender div', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '___'; 
            return;
        }
        
        if(sex == 'female'){
           result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

    }

    calcTotal();

    function getStaticInf(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));//setting data to localStorage
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));//setting data to localStorage
                }
   
                elements.forEach(elem => {
                   elem.classList.remove(activeClass);
                });
   
                e.target.classList.add(activeClass);
                calcTotal();
           });
        });
    }

    getStaticInf('#gender div', 'calculating__choose-item_active');
    getStaticInf('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInf(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
               input.style.boxShadow = '0 4px 15px rgba(240, 52, 52, 1)';
            }else{
                input.style.boxShadow = '0 4px 15px rgba(0, 0, 0, .2)';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInf('#height');
    getDynamicInf('#weight');
    getDynamicInf('#age');
}

export default calc;//ES6