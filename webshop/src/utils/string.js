export  function convertToSlug(str) {
    // Chuyển các ký tự tiếng Việt thành không dấu
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    str = str.replace(/[áàảãạâấầẩẫậăắằẳẵặ]/g, "a");
    str = str.replace(/[éèẻẽẹêếềểễệ]/g, "e");
    str = str.replace(/[íìỉĩị]/g, "i");
    str = str.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o");
    str = str.replace(/[úùủũụưứừửữự]/g, "u");
    str = str.replace(/[ýỳỷỹỵ]/g, "y");
    
    // Chuyển đổi chuỗi thành chữ thường
    str = str.toLowerCase();
    
    // Thay thế khoảng trắng và các ký tự không phải là chữ cái bằng dấu gạch ngang
    str = str.replace(/\s+/g, "-");
    str = str.replace(/[^a-z0-9-]/g, "");
    
    return str;
  }