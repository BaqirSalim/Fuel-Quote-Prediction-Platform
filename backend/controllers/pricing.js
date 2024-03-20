class Pricing{
    constructor(basePrice){
        this.basePrice = basePrice;
    }

    calculateTotal(gallonQuanity){
        return this.basePrice * gallonQuanity;
    }
}

/*
const pricing = require('./Pricing');

const gasPrice = 10;
const gallonQuanity = 5;

const pricing = new Pricing(gasPrice);
const totalPrice = pricing.calculateTotal(gallonQuantity);
*/
