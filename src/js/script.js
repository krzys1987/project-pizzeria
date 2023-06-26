/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

// const { active } = require("browser-sync");

{
  'use strict';

  // console.log('###'+'select.menuProduct.priceElem'+'###'+'code is:' +select.menuProduct.priceElem);
  // thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.price);

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
        this.processOrder(); //amend nessesary --> error disappearing other products

       console.log('PRODUCT', this)
        console.log('new Product:', thisProduct);
      }

      initOrderForm(){
        const thisProduct = this;
        console.log('initOrderForm');
        thisProduct.form.addEventListener('submit', function(event){
          event.preventDefault();
          thisProduct.processOrder();
        });

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
        console.log('processOrder');

        // covert form to object structure e.g. { sauce: ['tomato'], toppings: ['olives', 'redPeppers']}
        const formData = utils.serializeFormToObject(thisProduct.form);
        console.log('###formData###', formData);

        //a loop throw every of general category (param)
        for(let paramId in thisProduct.data.params){
          //set params value > paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
          const param = thisProduct.data.params[paramId];
          console.log('paramId, param', param, paramId);

          //a loop within every product opions in chosen category
          for(let optionId in param.options){
            //set options value > optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
            const option = param.options[optionId];
            console.log('option, optrionId :', option, optionId);

          }
        }

        //update calculated price in the HTML
        debugger;
        //show all classes of thisProduct
        console.log('thisProduct classes', thisProduct);

        //pick a value from thisProduct classes
        console.log('thisProduct price', thisProduct.element.querySelector(select.menuProduct.priceElem)); //always show 9
        const yourChosenproducts = thisProduct.element.querySelector(select.menuProduct.priceElem);

        //put chosen products prices to HTML
        const priceHTML = yourChosenproducts.innerHTML;

        //set a price variable
        let price = thisProduct.data.price;


        //set price to default price --> its value might change, depended on chosen paramId and optionId



      }

      renderInMenu(){
        const thisProduct = this;

        /* generate HTML based on template */
        const generateHTML = templates.menuProduct(thisProduct.data);
        //console.log('generateHTML' + templates.menuProduct(thisProduct.data));

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

        console.log('###'+'select.menuProduct.clickable'+'###'+'code is:' + select.menuProduct.clickable);
        thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
        console.log('###'+'select.menuProduct.amountWidget.form'+'###'+'code is:' +select.menuProduct.amountWidget.form);
        thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
        console.log('###'+'select.all.formInputs'+'###'+'code is:' +select.all.formInputs);
        thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
        console.log('###'+'select.menuProduct.cartButton'+'###'+'code is:' +select.menuProduct.cartButton);
        thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
        console.log('###'+'select.menuProduct.priceElem'+'###'+'code is:' +select.menuProduct.priceElem);
        thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.price);
      }

      initAccordion(){
        const thisProduct = this;

        /* find the clickable trigger (the element that should react to clicking) */
        console.log('thisProduct.accordionTrigger.addEvenLister --> watch menu products');
        const clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable); //working just fine
        // select.Product.getElements.thisProduct.accordionTrigger;
        /* select menu products */
        thisProduct.accordionTrigger.addEventListener('click', function(event) {

        /* FormActionPrepare */
        const initOrderForm = function (){
          const thisProduct = this;
          console.log('###methood name'+initOrderForm);

        }

        const processOrder = function (){
          const thisProduct = this;
          console.log('###methood name'+processOrder);

        }
      });



      /* console.log on "select" object */
      console.log('###SELECT-OBJECT TESTING###', document.querySelector(select.templateOf.menuProduct));



        /* START: add event listener to clickable trigger on event click */
        clickableTrigger.addEventListener('click', function(event) {
          /* prevent default action for event */
          event.preventDefault();
          /* find active product (product that has active class) */
          // const hasActiveClass = clickableTrigger.classList.contains('active');

          /* if there is active product and it's not thisProduct.element, remove class active from it */

          // if (hasActiveClass) {
          //   clickableTrigger.classList.add('active')
          // } else {
          //   clickableTrigger.classList.remove('active')
          // }

          clickableTrigger.classList.toggle('active');

          /* toggle active class on thisProduct.element */

          thisProduct.element.classList.toggle('active'); //it works, toggle class 'active' to clicked products
        });

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
          // const testProduct = new Product (); //[potencial problem] create a new insance but why
          // console.log('testProduct', testProduct);
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
