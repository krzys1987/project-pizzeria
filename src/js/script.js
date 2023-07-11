/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

// const { active } = require("browser-sync");

{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: "#template-menu-product",
      },
      containerOf: {
        menu: '#product-list',
        cart: '#cart',
      },
      all: {
        menuProducts: '#product-list > .product',
        menuProductsActive: '#product-list > .product.active',
        formInputs: 'input, select',
      },
      menuProduct: {
        clickable: '.product__header',
        form: '.product__order',
        priceElem: '.product__total-price .price',
        imageWrapper: '.product__images',
        amountWidget: '.widget-amount',
        cartButton: '[href="#add-to-cart"]',
      },
      widgets: {
        amount: {
          input: 'input[name="amount"]',
          linkDecrease: 'a[href="#less"]',
          linkIncrease: 'a[href="#more"]',
        },
      },
    };

    const classNames = {
      menuProduct: {
        wrapperActive: 'active',
        imageVisible: 'active',
      },
    };

    const settings = {
      amountWidget: {
        defaultValue: 1,
        defaultMin: 1,
        defaultMax: 9,
      }
    };

    const templates = {
      menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
    };

    class Product {
      constructor(id, data){
        const thisProduct = this;
        this.id = id;
        this.data = data;
        this.renderInMenu();
        this.getElements();
        this.initAccordion();
        this.initOrderForm();
        this.initAmountWidget(); //widget which enable + and  - buttom in oder menu
        this.processOrder();

       console.log('PRODUCT', this)
        console.log('new Product:', thisProduct);
      }

      //initOrderForm --> select product to buy
      initOrderForm(){
        const thisProduct = this;
        thisProduct.form.addEventListener('submit', function(event){
          event.preventDefault();
          thisProduct.processOrder();
        });

        //Loop start for thisProduct -->4 loops
        for(let input of thisProduct.formInputs){
          input.addEventListener('change', function(){
            thisProduct.processOrder();
          });
        }

        thisProduct.cartButton.addEventListener('click', function(event){
          event.preventDefault();
          thisProduct.processOrder();
          // console.log('add to your order');
        });
      }

      processOrder(){
        const thisProduct = this;

        // covert form to object structure e.g. { sauce: ['tomato'], toppings: ['olives', 'redPeppers']}
        const formData = utils.serializeFormToObject(thisProduct.form);
        console.log('###formData###', formData);

        //set default price
        let price = thisProduct.data.price;

        //a loop throw every of general category (param)
        for(let paramId in thisProduct.data.params){
          //set params value > paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
          const param = thisProduct.data.params[paramId];
          // console.log('paramId, param', paramId, param);

          //a loop within every product opions in chosen category
          //[IN PROGRESS] decrease/increase thisProduct price
          for(let optionId in param.options){
            //set options value > optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
            const option = param.options[optionId];
            // console.log('option, optionId');

            // set price to default price --> 'let' variable to - or + its value
            // let price = thisProduct.data.price;

            // add option price to price variable --> it's default set
            let orderPrice = option.price;

            //find impages for selected product > contains paramId-optionId
            const optionImage = thisProduct.imageWrapper.querySelector('.' + paramId + '-' + optionId);

            //select paramId at formData but only ones contain optionId
            const optionSelected = formData[paramId] && formData[paramId].includes(optionId);
            //check if option is selected --> simply if contains optionSelected -->add photos
              if(optionImage){
                if(optionSelected){
                  optionImage.classList.add(classNames.menuProduct.imageVisible);
                } else {
                  optionImage.classList.remove(classNames.menuProduct.imageVisible);
                }

              //check if option is selected --> simply if contains optionSelected
              if(optionSelected){
                //check if the option is not default, if YES do nothing, but if no --> proceed an action
                if(!option.default) {
                  console.log('Your order cost:', [orderPrice + option]);
                  orderPrice + option;
                  }
                } else {
                  // check if the option is default
                  if(option.default) {
                    console.log(orderPrice, 'basic pizza set cost 20$');

                  }



                }

            }

          }

        }

        //show the product value
        const priceElem = select.menuProduct.priceElem;

        // update calculated price in the HTML
        console.log('###', thisProduct, 'priceElem >', select.menuProduct.priceElem);
        // thisProduct.priceElem.innerHTML = price;

        //pick a value from thisProduct classes
        const yourChosenproducts = thisProduct.element.querySelector(select.menuProduct.priceElem);

        //put chosen products prices to HTML
        const priceHTML = yourChosenproducts.innerHTML;

        //[DONE ALREADY] set a price variable

      }

      renderInMenu(){
        const thisProduct = this;

        /* generate HTML based on template */
        const generateHTML = templates.menuProduct(thisProduct.data);

        /* create element using utils.createElementFromHTML */
        thisProduct.element = utils.createDOMFromHTML(generateHTML);
        //create a DOM element and save it as an attribute of the new-created instance

        /* find menu container */
        const menuContainer = document.querySelector(select.containerOf.menu);

        /* add element to menu */
        menuContainer.appendChild(thisProduct.element);

      }

      /* find elements in Product container */
      getElements(){
        const thisProduct = this;

        thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
        thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
        thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
        thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
        thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.price);
        thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper); // 'product__images'
        thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget); //add div with bottoms +, - . SelectAll might cause chose other product div
      }

      initAmountWidget(){
        const thisProduct = this;
        thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem); //create a new instance and give it a reference to div with buttons: -, +
      }

      initAccordion(){
        const thisProduct = this;

        /* find the clickable trigger (the element that should react to clicking) */
        const clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);

        /* START: add event listener to clickable trigger on event click */
        clickableTrigger.addEventListener('click', function(event) {
          /* prevent default action for event */
          event.preventDefault();
          /* find active product (product that has active class). */

          clickableTrigger.classList.toggle('active');

          /* toggle active class on thisProduct.element */

          thisProduct.element.classList.toggle('active');
        });


      }
    }

    class AmountWidget {
      constructor(element){
        const thisWidget = this;
        //getElements(element) --> function into the methood
        thisWidget.element = element;
        thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
        thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
        thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
        console.log('AmountWidget', this);
        console.log('contructor arg', element);
      }
    }

    const app = {

        initData: function(){
          const thisApp = this;
          console.log('served-meals', dataSource);
          thisApp.data = dataSource; //created a handy reference to dataSource at data.js
        },

        initMenu: function () {
          const thisApp = this;
          console.log('thisAppdata', thisApp.data) //[potencial problem] gtools show 5 new Product
          for(let productData in thisApp.data.products){ //loop iterates productData of all products
            new Product(productData, thisApp.data.products[productData]); //a new instance created, contains 2 argument: productData (object properties), thisApp.data.products[productData] (object values)
          }
      },

        init: function(){
          const thisApp = this;
          console.log('*** App starting ***');
          console.log('thisApp:', thisApp);
          console.log('classNames:', classNames);
          console.log('settings:', settings);
          console.log('templates:', templates);
          this.initData();
          this.initMenu();
        }

    };

      const thisApp = this;
      thisApp.data = dataSource;
      app.initData;
      app.initMenu;

      app.init();

  }