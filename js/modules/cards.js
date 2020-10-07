import {getResource} from '../services/services';

function cards(){
    //Use classes for creating cards 'menu__item'

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {//method to convert from dollar to UAH
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {//check if passed a parameter of class
                this.className = 'menu__item';//creating property that contain default className
                element.classList.add(this.className);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    axios.get('http://localhost:3000/menu')//using axios library
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {//destruction of object data
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });  
}

export default cards;//ES6