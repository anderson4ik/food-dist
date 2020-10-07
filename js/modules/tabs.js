function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
     // Tabs
     const tabs = document.querySelectorAll(tabsSelector),
     tabsContent = document.querySelectorAll(tabsContentSelector),
     tabsParent = document.querySelector(tabsParentSelector);

 function hideTabContent() {
     tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
     });

     tabs.forEach(element => {
         element.classList.remove(activeClass);
     });
 }

 function showTabContent(i = 0) {
     tabsContent[i].classList.add('show', 'fade');
     tabsContent[i].classList.remove('hide');

     tabs[i].classList.add('tabheader__item_active');
 }

 hideTabContent();
 showTabContent();

 tabsParent.addEventListener('click', (event) => {
     const target = event.target;
     if (target && target.classList.contains(tabsSelector.slice(1))) {//using slice(1) to delete first coma from 
        //string '.tabheader__item'
         tabs.forEach((item, i) => {
             if (target == item) {
                 hideTabContent();
                 showTabContent(i);
             }
         });
     }
 });
}

export default tabs;//ES6