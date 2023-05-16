const Product = require("../models/Product")
const Category = require("../models/Category")

module.exports.createProduct = async (req, res) =>{
    try{
        const product = new Product(req.body)
        console.log(req.body);
        const savedProduct = await product.save()
        res.status(200).json({code : 200 ,result :savedProduct, message: "Thành công!"})
    }catch(err){
        res.status(500).json({code : 500, message: "Thất bại!"})
    }
}
module.exports.getAllProduct = async (req,res) => {

    const rangePrice = req.body.range ? {[req.body.range.property]: {$gte : req.body.range.gte, $lt : req.body.range.lt}} : {}
    const page = req.body.page || -1;
    const cateId = req.body.categoryId || "";
    // const priceMin = req.body.priceMin;
    // const priceMax = req.body.priceMax;
    const keyword = req.body.keyword || "";
    const sort = req.body.sort || [];
    const category = cateId ? {category: cateId} : {};
    const total = await Product.countDocuments(category);
    const page_size = req.body.page_size || 8;
    try {
      let products
      let sortObj  =  {}
      sort.forEach((item, index) => {
        sortObj = {...sortObj, [item.property] : item.direction === 'desc' ? -1 : 1}
      })
      if(page > 0) {
        products = await Product.find(category)
            .or( {name: {$regex: keyword}})
            .populate('category')
            .find(rangePrice)
            .sort(sortObj)
            .skip(page_size*(page > 0 ? page - 1 : page))
            .limit(page_size)
      }else{
        products = await Product.find(category)
        .or( {name: {$regex: new RegExp(keyword, "i")}})
        .populate('category')
        .find(rangePrice)
        .sort(sortObj)
      }
       res.status(200).json({
        code : 200,
        message : "Ok",
        result: {
          items : products,
          total : Math.ceil(page > 0 ? total/ page_size : 1 )
        }
      }
      );
    } catch (err) {
      res.status(500).json({
        code : 500,
        message : "Đã có lỗi xảy ra"
      });
    }
}
module.exports.getProductByID = async (req, res) => {

    try{
        const product = await Product.findById(req.params.id).populate('category')
        res.status(200).json({code : 200, message: "Thành công" ,result : product});
    }catch(err) {
        res.status(400).json({code : 400, message: "Sản phẩm không được tìm thấy!"})
    }
}


module.exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({code : 200, message: "Xóa thành công!"});
  } catch (err) {
    res.status(500).json({code : 500, message: "Đã có lỗi xảy ra!"})
  }
}

module.exports.updateProduct = async (req, res) => {
  try {
    const product = Product.findById(req.params.id);
    if(!product) return res.status(200).json({code : 400, message: "Không tìm thấy sản phẩm"});
    if(!req.body.name) return res.status(200).json({code : 400, message: "Vui lòng nhập tên sản phẩm"});
    if(!req.body.category) return res.status(200).json({code : 400, message: "Vui lòng nhập danh mục sản phẩm"});
    if(!req.body.price) return res.status(200).json({code : 400, message: "Vui lòng nhập giá sản phẩm"});
    if(!req.body.quantity) return res.status(200).json({code : 400, message: "Vui lòng nhập số lượng sản phẩm"});
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set : req.body
    },
    {
        new : true
    }
  )
    res.status(200).json({code : 200, message: "Xóa thành công!", result : updateProduct});
  } catch (err) {
    console.log(err);
    res.status(500).json({code : 500, message: "Đã có lỗi xảy ra!"})
  }
}