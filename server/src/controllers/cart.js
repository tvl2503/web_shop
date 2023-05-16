const Cart = require("../models/Cart")
const User = require("../models/User")

module.exports.addToCart = async (req, res) => {
  const userId = req.user._id
    try{
        const productId = req.body.products.productId
        const quantity = req.body.products.quantity
        const price = req.body.products.price
        const img = req.body.products.img
        const name = req.body.products.name
        const size = req.body.products.size
        const percentReduce = req.body.products.percentReduce
        let userCart = await Cart.findOne({userId: userId})
    
        if (userCart) {
          const itemIndex  = userCart.products.findIndex(item => {
            return item.productId === productId && item.size === size
          })
        
          if (itemIndex  > -1) {
           
            let productItem = userCart.products[itemIndex];
            productItem.quantity += quantity
            productItem.percentReduce = percentReduce
            userCart.products[itemIndex] = productItem
          }
          else {
            userCart.products.push({ productId, price, quantity, img, name, size, percentReduce })
          }
          let total = 0;
          for(let i = 0; i < userCart.products.length; i++){
            total += userCart.products[i].price * userCart.products[i].quantity*(1 - userCart.products[i].percentReduce/100)
          }
          
          userCart.total = total 
          userCart = await userCart.save();
          return res.status(201).json({code : 200, message: "Thành công" ,result : userCart});
        }
        else {
          let total = parseInt(req.body.products.price * req.body.products.quantity*(1 - req.body.products.percentReduce/100))
          const newCart = await Cart.create({
            userId,
            products: [req.body.products],
            total: total
          });
          return res.status(201).json({code : 200, message: "Thành công" ,result : newCart})
        }
    }catch(err) {
      console.log(err);
      res.status(500).json({code: 500, message :"Đã có lỗi xảy ra!"});
    }
} 
module.exports.getToCartByUser = async (req,res) =>{
    const userId = req.user._id
    try{
      const user = await Cart.findOne({userId: userId})
        return res.status(201).json({ code : 200, message: "Thành công" ,result :user})

    }catch(err){
            console.log(err);
            res.status(200).json({code: 500, message :"Đã có lỗi xảy ra!"});

    }
}
module.exports.updateCartByUser = async (req, res) => {
  try{
    const userId = req.user._id
    let userCart = await Cart.findOne({userId: userId})
    if(userCart){
      const itemIndex =  userCart.products.findIndex(item =>{
        return item.productId === req.params.id && item.size === req.body.size})
      if(req.body.type === "remove"){
        userCart.products.splice(itemIndex, 1);
      }
      if(req.body.type === "minus"){
        if(userCart.products[itemIndex].quantity === 1){
          userCart.products.splice(itemIndex, 1);
        }
        else{
          let productItem = userCart.products[itemIndex];
          productItem.quantity -= 1
          userCart.products[itemIndex] = productItem
        }
      }
      else if(req.body.type === "plus"){
        let productItem = userCart.products[itemIndex];
        productItem.quantity += 1
        userCart.products[itemIndex] = productItem
      }
      let total = 0;
        for(let i = 0; i < userCart.products.length; i++){
          total += userCart.products[i].price * userCart.products[i].quantity*(1 - userCart.products[i].percentReduce/100)
        }
        userCart.total = total 
        if(userCart.total === 0){
          await Cart.findByIdAndDelete(userCart._id)
          return res.status(201).json({code : 200, message : "Thành công", result: userCart});

        }
        else{
          userCart = await userCart.save();
         return res.status(201).json({code : 200, message : "Thành công", result: userCart});
        }
    }
  }catch(err){
    return  res.status(500).json({code : 500, message: "Có lỗi xảy ra"});
  }
}

