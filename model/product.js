const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    
    name:String,
    price:Number,
    quantite:Number,
   
});

productSchema.methods.getProduct=function () {
    return {
        _id:this._id,
        name:this.name,
        price : this.price,
        quantite : this.quantite
       
    }
}

module.exports=Product=mongoose.model('product',productSchema);
