const News = require('../models/News');

exports.getNews = async (req,res,next)=>{
    try {
      const news = await News.find(); 
        res.status(200).json({
            status: 'success',  
            results: news.length,
            data: {news}
        })
      } catch (err) {
        res.status(500).json({ error: err });
     }
}

//tao bai post
exports.createNew = async (req, res, next) => {
    try {
      const { title, image, content, author } = req.body;
  
      // Create a new instance of the News model
      const newNews = new News({
        title,
        image,
        content,
        author
      });
  
      // Save the new News to the database
      const savedNews = await newNews.save();
  
      res.status(200).json({
        status: 'success',
        data: { news: savedNews }
      });
    } catch (error) { 
      console.error('Error creating news:', error);
      next(error);
    }
  };

//update new
exports.updateNew = async (req, res, next) => {
  try {
    const newId = req.params.newId;
    const updatedData = req.body;

    const updatedNew = await News.findByIdAndUpdate(newId, updatedData, {
      new: true, // Trả về bài tin đã được cập nhật
      runValidators: true, // Chạy các validators của model News
    });

    if (!updatedNew) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy bài tin với ID đã cho',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        new: updatedNew,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteNew = async (req, res, next) => {
  try {
    const newId = req.params.newId;

    const deletedNew = await News.findByIdAndDelete(newId);

    if (!deletedNew) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy bài tin với ID đã cho',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Xóa bài tin thành công',
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};