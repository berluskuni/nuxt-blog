const Post = require('../models/post.model')
const multiparty = require("multiparty")



module.exports = {
  getAll: async (reg, res) => {
    try {
      const posts = await Post.find().sort({date: -1})
      res.json(posts)
    } catch (e) {
      res.status(500).json(e)
    }

  },
  getByID: async (reg, res) => {
    try {
      await Post.findById(reg.params.id).populate('comments').exec((error, post
      ) => {
        res.json(post)
      })
    } catch (e) {
      res.status(500).json(e)
    }
  },
  create: async (req, res) => {
    // const parse = function (req) {
    //   return new Promise(function(resolve, reject) {
    //       const form = new multiparty.Form()
    //       form.parse(req, function(err, fields, files) {
    //           !err ? resolve([fields, files]) : reject(err)
    //       })
    //   })
    // }
    // const body = await parse(req)
    // const post = new Post({
    //   title: body[0].title[0],
    //   text: body[0].text[0],
    //   imageUrl: `/${body[1].image[0].originalFilename}`
    // })
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      imageUrl: `/${req.file.filename}`
    })
    try {
     await post.save()
     res.status(201).json(post)
    } catch (e) {
      res.status(500).json(e)
    }
  },
  update: async (req, res) => {
    const $set = {
      text: req.body.text
    }
   try {
     const post = await Post.findOneAndModify({
       _id: req.params.id
     }, {$set}, {new: true})
     res.json(post)
   } catch (e) {
     res.status(500).json(e)
   }
  },
  remove: async (req, res) => {
    try {
      await Post.deleteOne({_id: req.params.id})
      res.json({message: 'Пост удалён'})
    } catch  (e) {
      res.status(500).json(e)
    }
  },
  addView: async (req, res) => {
    const $set = {
      views: ++req.body.views
    }
    try {
      await Post.findOneAndUpdate({_id: req.params.id}, {$set})
      res.status(204).json()
    } catch (e) {
      res.status(500).json(e)
    }
  },
  getAnalytics: async (req, res) => {
    try {

      const posts = await Post.find()

      const labels = posts.map(post => post.title)
      const json = {
        comments: {
          labels,
          data: posts.map(post => post.comments.length)
        },
        views: {
          labels,
          data: posts.map(post => post.views)
        }
      }

      res.json(json)

    } catch (e) {
      res.status(500).json(e)
    }
  }
}

