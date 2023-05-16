const Category = require("../models/Category")
const Product = require("../models/Product")


module.exports.createCategory = async (req, res) => {

    try{
        if(!req.body.name) return res.status(200).json({code: 400, message: "Yêu cầu nhập tên!"})
        if(!req.body.path) return res.status(200).json({code: 400, message: "Yêu cầu nhập path!"})
        let path = req.body.path
        const findCate = await Category.find(      {
            "$or": [
              {path: {$regex: path}}
            ]
          })
        console.log(findCate);
        if(findCate.length > 0){
            path = `${path}-${findCate.length}`
        }
        const newCate = new Category({name : req.body.name, path : path})
        const saveCate = await newCate.save()
        res.status(201).json({code : 200, message : "Thêm thành công" ,result: saveCate})
    }catch(err){
        console.log(err.keyValue);
        if(err.keyValue.name) return res.status(200).json({code: 400, message: "Tên danh mục đã có!"})
        res.status(500).json(err.keyValue);

    }
} 
module.exports.getAllCategory = async (req, res) => {
    try{
        const category = await Category.find({}).sort({createdAt: 1})
        res.status(201).json({code : 200, message : "Thành công" ,result: category})
    }catch(err){
        res.status(500).json({code : 500, message: "Đã xảy ra lỗi"})
    }
}
module.exports.deleteCategory = async (req, res) => {
    try{
        const product = await Product.find({category: req.params.id});
        if(product.length > 0){
            res.status(200).json({code : 400, message: "Không thể xóa danh mục"});
        }
        else{
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).json({code : 200, message: "Xóa thành công"});
        }
    }catch(err){
        res.status(500).json({code : 500, message: "Đã xảy ra lỗi"})
    }
}
module.exports.updateCategory = async (req, res) => {
    try{
        const id = req.params.id;
        const Cate = await Category.findById(id)
        if(!Cate) return res.status(200).json({code : 400, message: "Danh mục không được tìm thấy"})
        if(!req.body.name) return res.status(200).json({code : 400, message: "Vui lòng nhập tên!"})

        const updateCate = await Category.findByIdAndUpdate(id, {
            $set : req.body
        },
        {
            new : true
        }
        )
        return res.status(200).json({code : 200, message: "Thành công!", result : updateCate})
    }catch(err){
        console.log(err);
        return res.status(500).json({code : 500, message: "Thất bại!"})
    }
}