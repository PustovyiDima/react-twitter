// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { Post } = require('../class/post')

router.post('/post-create', function (req, res) {
  try {
    const { username, text, postId } = req.body

    if (!username || !text) {
      return res.status(400).json({
        message:
          'Потрібно передати всі дані для створення поста',
      })
    }

    let post = null

    console.debug('postID', postId)

    if (postId) {
      post = Post.getById(postId)

      console.log('post', post)
      if (!post) {
        return res.status(400).json({
          message: 'Пост з таким id не існує',
        })
      }
    }

    const newPost = Post.create(username, text, post)

    return res.status(200).json({
      post: {
        id: newPost.id,
        text: newPost.text,
        username: newPost.username,
        date: newPost.date,
      },
    })

    // ===
  } catch (error) {
    return res.status(400).json({ message: e.message })
  }
})

router.get('/post-list', function (req, res) {
  try {
    const list = Post.getList()

    if (list.length === 0) {
      return res.status(200).json({ list: [] })
    }
    return res.status(200).json({
      list: list.map(({ id, username, text, date }) => ({
        id,
        username,
        text,
        date,
      })),
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/post-item', function (req, res) {
  try {
    const { id } = req.query
    if (!id) {
      res
        .status(400)
        .json({ message: 'post ID not sended ' })
    }

    const post = Post.getById(Number(id))

    if (!post) {
      return res.status(400).json({
        message: 'Пост з таким id не існує',
      })
    }

    return res.status(200).json({
      post: {
        id: post.id,
        username: post.username,
        text: post.text,
        date: post.date,

        reply: post.reply.map((reply) => ({
          id: reply.id,
          username: reply.username,
          text: reply.text,
          date: reply.date,
        })),
      },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
// Експортуємо глобальний роутер
module.exports = router
