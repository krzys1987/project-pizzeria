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
        this.renderInMenu(); //function set properties of thisProduct.element
        this.getElements();
        this.initAccordion();
        this.initOrderForm();
        this.initAmountWidget();
        this.processOrder();


        console.log('PRODUCT', this)
        console.log('new Product:', thisProduct);
        // console.log('###'+''+this.initAmountWidget);
      }

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

          //a loop within every product opions in chosen category
          //[DONE] decrease/increase thisProduct price
          for(let optionId in param.options){
            //set options value > optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
            const option = param.options[optionId];

            //find impages for selected product > contains paramId-optionId
            const optionImage = thisProduct.imageWrapper.querySelector('.' + paramId + '-' + optionId);

            //select paramId at formData but only ones contain optionId
            const optionSelected = formData[paramId] && formData[paramId].includes(optionId);
            const isCalculateAllowed = optionSelected && !option.default;

              //check if option is selected --> simply if contains optionSelected -->add photos
              // if(optionImage){
              //   if(optionSelected){
              //     optionImage.classList.add(classNames.menuProduct.imageVisible);
              //   } else {
              //     optionImage.classList.remove(classNames.menuProduct.imageVisible);
              //   }
              // }
              if(optionImage){
                optionSelected
                ? optionImage.classList.add(classNames.menuProduct.imageVisible)
                : optionImage.classList.remove(classNames.menuProduct.imageVisible);
              }

                if(isCalculateAllowed){
                  price += option.price;

                  }
          }

        }

        //show the product value
        const priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);

        thisProduct.element.querySelector(select.menuProduct.priceElem).innerHTML = price;
        priceElem.innerHTML = price;

        //price operation: put chosen product value and transfer to HTML
        // thisProduct.priceElem.innerHTML;

        // thisProduct.priceElem.innerHTML = price;

        //pick a value from thisProduct classes
        // const yourChosenproducts = thisProduct.element.querySelector(select.menuProduct.priceElem);

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
        //create a new instance and give it a reference to div with buttons: -, +
        thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);

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
        // thisWidget.getElements(element);

        //getElements(element) --> function into the methood
        thisWidget.element = element;
        thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
        thisWidget.setValue(thisWidget.input.value);
        thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
        thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
        console.log('AmountWidget', this);
        console.log('contructor arg' + ' ' + 'Show HTML', element);
      }

      //set an order value
      setValue(value){
        const thisWidget = this;
        const newValue = parseInt(value); //parseInt convert text to numbers

        //[IN PROGRESS] Add validation
        /* TODO: Add validation */
        if(thisWidget.value !== newValue && !isNaN(newValue)) { //check value and convert to number if needed
          thisWidget.value = newValue;
        }

        thisWidget.input.value = thisWidget.value;
      }
    }

    class Cart {
      constructor(element){
        const thisCart = this;

        thisCart.products = [];
        thisCart.getElements(element);

        console.log('thisCart', thisCart);

      }


    }
    //execute thisWidget.element --> add a product and change price by click + or -
    // AmountWidget.thisWidget.element;

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