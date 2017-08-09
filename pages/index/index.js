//index.js
//获取应用实例
const wxParser = require('../../wxParser/index');

var app = getApp()

Page({
  data: {

    profile: null,
    tableID: 373, // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取
    bookList: null,
    newsList: [],
    createBookValue: '',
    inputBook: '',
    editBookName: '',
    inputEditBook: '',
  },
  contentDetail: function (event) {
    console.log(event.currentTarget.dataset.contentId);
    var contentId=event.currentTarget.dataset.contentId;
    wx.navigateTo({
      url: '../detail/detail?newsId='+contentId
    })
  },
  onLoad(options) {
  

    this.setData({
      profile: app.getUserInfo()
    })
    this.fetchBookList()

    this.fetchNewList();
  },

  // 获取 bookList 数据
  fetchNewList() {
    let that = this
    let content_group_id = 101;//新闻和公告分类id
    let objects = {
      content_group_id
    }

    wx.BaaS.getContentList(objects).then((res) => {
      that.setData({
        newsList: res.data.objects
      })
    }, (err) => {
      console.dir(err)
    });
  },


  // 获取 bookList 数据
  fetchBookList() {
    let that = this
    let tableID = this.data.tableID
    let objects = {
      tableID
    }

    wx.BaaS.getRecordList(objects).then((res) => {
      that.setData({
        bookList: res.data.objects // bookList array, mock data in mock/mock.js
      })
    }, (err) => {
      console.dir(err)
    });
  },

  inputBook(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      inputBook: value
    })

  },

  createBook(e) {
    let that = this
    let tableID = this.data.tableID
    let inputBook = this.data.inputBook
    let data = {
      bookName: inputBook,
      isEditing: false
    }
    let objects = {
      tableID,
      data
    }

    // 创建一个数据项
    wx.BaaS.createRecord(objects).then((res) => {
      that.setData({
        createBookValue: '',
      })
      that.fetchBookList()
    }, (err) => {
      console.log(err)
    })
  },

  editBook(e) {
    let that = this
    let activeIndex = e.currentTarget.dataset.index
    let bookList = this.data.bookList

    bookList.forEach((elem, idx) => {
      if (activeIndex == idx) {
        bookList[idx].isEditing = !bookList[idx].isEditing
      }
    })

    that.setData({
      bookList
    })
  },

  getEditBookName(e) {
    let that = this
    let value = e.detail.value

    this.setData({
      editBookName: value
    })
  },

  updateBook(e) {
    let that = this
    let tableID = this.data.tableID
    let recordID = e.target.dataset.bookId;
    let editBookName = this.data.editBookName

    let data = {
      bookName: editBookName,
      isEditing: false
    }

    let objects = {
      tableID,
      recordID,
      data
    }
    wx.BaaS.updateRecord(objects).then((res) => {
      that.fetchBookList()
    }, (err) => { })
  },

  deleteBook(e) {
    let that = this
    let tableID = this.data.tableID
    let recordID = e.target.dataset.bookId;

    // 删除 tableID 为 56 的数据表中 recordID的数据项
    let objects = {
      tableID,
      recordID
    };

    wx.BaaS.deleteRecord(objects).then((res) => {
      that.fetchBookList()
    }, (err) => {
      console.dir(err)
    });
  },

})