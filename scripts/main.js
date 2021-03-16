document.addEventListener('DOMContentLoaded', () =>{
    'use strict';

    const getData = (url, callback) =>{
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('readystatechange', () =>{
            if(request.readyState !== 4) return;
            if (request.status === 200 ) {
                const response = JSON.parse(request.response);
                callback(response);
            } else{
                console.log(new Error('Ошибка: ' + request.status));
            }
        });
        request.send();
        console.log(request.readyState);
    }
    

    const tabs = () =>{
        const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
        const cardDetailsTitle = document.querySelectorAll('.card-details__title');
        const cardImageItem = document.querySelector('.card__image_item');
        const cardDetailsPrice = document.querySelector('.card-details__price');
        const descriptionMemory = document.querySelector('.description__memory');
        
        const dataPhone = [
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img: 'img/iPhone-graphite.png',
                price: 95990,
                memoryROM: 128
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
                img: 'img/iPhone-silver.png',
                price: 120990,
                memoryROM: 256
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
                img: 'img/iPhone-blue.png',
                price: 98990,
                memoryROM: 128
            },
        ];
        const deactive = () =>{
            cardDetailChangeElems.forEach(btn => btn.classList.remove('active'));
        }

        cardDetailChangeElems.forEach((btn, i) =>{
            btn.addEventListener('click', ()=>{
                if(!btn.classList.contains('active')){
                    deactive();
                    btn.classList.add('active');
                    cardDetailsTitle.textContent = dataPhone[i].name;
                    cardImageItem.src = dataPhone[i].img;
                    cardImageItem.alt = dataPhone[i].name;
                    cardDetailsPrice.textContent = dataPhone[i].price + '₽';
                    descriptionMemory.textContent = `Встроенная память (ROM) ${dataPhone[i].memoryROM} ГБ`;
                }
            });
        });

        // const cardImageElems = document.querySelectorAll('.card__image');
        
        // const hideAll = () =>{
        //     for (let i = 0; i < cardDetailChangeElems.length; i++) {
        //         cardDetailChangeElems[i].classList.remove('active');
        //         cardDetailsTitleElems[i].classList.remove('active');
        //         cardImageElems[i].classList.remove('active');
        //     }
        // }

        // for (let i = 0; i < cardDetailChangeElems.length; i++) {
        //     cardDetailChangeElems[i].addEventListener('click', () =>{
        //         hideAll();
        //         cardDetailChangeElems[i].classList.add('active');
        //         cardDetailsTitleElems[i].classList.add('active');
        //         cardImageElems[i].classList.add('active');
        //     });
        // }

    };

    const accordion = () =>{
        const  characteristicsList = document.querySelector('.characteristics__list');
        const  characteristicsItem = document.querySelectorAll('.characteristics__item');

        const open = (button, dropDown) =>{
            closeAllDrops();
            button.classList.add('active');
            dropDown.classList.add('active');        
        };

        const close = (button, dropDown) =>{
            button.classList.remove('active');
            dropDown.classList.remove('active');            
        };
        const closeAllDrops = (button, dropDown) =>{
            characteristicsItem.forEach((elem) =>{
                if (elem.children[0] !== button && elem.children[1] !== dropDown) {
                    close(elem.children[0], elem.children[1]);
                }
            });
        }
        characteristicsList.addEventListener('click', (event) =>{
            const target = event.target;
            if (target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item');
                const description = parent.querySelector('.characteristics__description');
                description.classList.contains('active') ? close(target, description) : open(target, description);
            }
        });
        // const characteristicsTitle = document.querySelectorAll('.characteristics__title');
        // const characteristicsDescription = document.querySelectorAll('.characteristics__description');
        // characteristicsTitle.forEach((elem, i) =>{
        //     elem.addEventListener('click', () =>{
        //         elem.classList.toggle('active');
        //         characteristicsDescription[i].classList.toggle('active');
        //     });
        // });
    };


    // MODAL

    const modal = () =>{
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
        const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
        const modal = document.querySelector('.modal');
        const cardDetailsTitle =  document.querySelector('.card-details__title');
        const modalTitle = document.querySelector('.modal__title');
        const modalSubtitle = document.querySelector('.modal__subtitle'); 
        const modalTitleSubmit = document.querySelector('.modal__title-submit');
        

        const openModal = (event) => {
            const target = event.target;
            modal.classList.add('open');
            document.addEventListener('keydown', escapeHandler);
            modalTitle.textContent = cardDetailsTitle.textContent;
            modalTitleSubmit.value = cardDetailsTitle.textContent;
            console.log(modalTitleSubmit.value);
            modalSubtitle.textContent = target.dataset.buttonBuy;
        };

        const closeModal = () =>{
            modal.classList.remove('open');
            document.removeEventListener('keydown', escapeHandler);
        };

        
        const escapeHandler = (event) =>{
            if(event.code === 'Escape'){
                closeModal();
            };
        };

        modal.addEventListener('click', (event) =>{
            const target = event.target;
            if(target.classList.contains('modal__close') || target === modal){
                closeModal();
            }
        });
        

        cardDetailsButtonBuy.addEventListener('click', openModal);
        cardDetailsButtonDelivery.addEventListener('click', openModal);
    };

    const renderCrossSell = () =>{
        const crossSellList = document.querySelector('.cross-sell__list');
        const crossSellAdd = document.querySelector('.cross-sell__add');
        const allGoods = [];

        const shuffle = arr => arr.sort(() => Math.random() - 0.5);

        const createCrossSellItem = (good) => {
            const liItem = document.createElement('li');
            liItem.innerHTML = `
                <article class="cross-sell__item">
                    <img class="cross-sell__image" src="${good.photo}" alt="${good.name}">
                    <h3 class="cross-sell__title">${good.name}</h3>
                    <p class="cross-sell__price">${good.price}₽</p>
                    <button type="button" class="button button_buy cross-sell__button">Купить</button>
                </article>
            `;
            return liItem;
        }

        const render = (arr) =>{
            arr.forEach(item =>{
                crossSellList.append(createCrossSellItem(item));
            });
        }

        const createCrossSellList = (goods) => {
            allGoods.push(...shuffle(goods));
            const fourItems = allGoods.splice(0, 4);
            render(fourItems);
        };

        crossSellAdd.addEventListener('click', () => {
            render(allGoods);
            crossSellAdd.remove();
        });
        getData('cross-sell-dbase/dbase.json', createCrossSellList);
    };


    tabs();
    accordion();
    modal();
    renderCrossSell();
    amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger');
});