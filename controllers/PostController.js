import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const sortBy = req.query.category;
    const user = req.query.user;
    const page = req.query.page || 1;

    const limit = 5;
    const startIndex = (Number(page) - 1) * limit;
    // const total = await PostModel.countDocuments({});
    let total;
    let posts;

    if (!user && !sortBy) {
      total = await PostModel.countDocuments({});
      posts = await PostModel.find().populate('user').populate('comments.user');
      return res.json(posts);
    }

    if (user && !sortBy) {
      posts = await PostModel.find({ user: user })
        .skip(startIndex)
        .limit(limit)
        .populate('user')
        .populate('comments.user');

      total = await PostModel.countDocuments({ user: user });

      return res.json({
        posts,
        currentPage: Number(page),
        countOfPage: Math.ceil(total / limit),
      });
    }
    if (sortBy === 'top') {
      posts = await PostModel.find()
        .skip(startIndex)
        .sort({ viewsCount: -1 })
        .limit(limit)
        .populate('user')
        .populate('comments.user');

      total = await PostModel.countDocuments({});

      // return res.json(posts);
      return res.json({
        posts,
        currentPage: Number(page),
        countOfPage: Math.ceil(total / limit),
      });
    }
    if (sortBy === 'new') {
      posts = await PostModel.find()
        .skip(startIndex)
        .limit(limit)
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('user')
        .populate('comments.user');

      total = await PostModel.countDocuments({});

      return res.json({
        posts,
        currentPage: Number(page),
        countOfPage: Math.ceil(total / limit),
      });
    }
    if (sortBy === 'webdev') {
      posts = await PostModel.find({ tags: '#разработка' })
        .skip(startIndex)
        .limit(limit)
        .sort({ viewsCount: -1 })
        .limit(limit)
        .populate('user')
        .populate('comments.user');

      total = await PostModel.countDocuments({ tags: '#разработка' });

      return res.json({
        posts,
        currentPage: Number(page),
        countOfPage: Math.ceil(total / limit),
      });
    }
    if (sortBy === 'sport') {
      posts = await PostModel.find({ tags: '#спорт' })
        .skip(startIndex)
        .limit(limit)
        .sort({ viewsCount: -1 })
        .limit(limit)
        .populate('user')
        .populate('comments.user');

      total = await PostModel.countDocuments({ tags: '#спорт' });

      return res.json({
        posts,
        currentPage: Number(page),
        countOfPage: Math.ceil(total / limit),
      });
    }

    // posts = await PostModel.find({ tags: sortByTag }).populate('user');
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: 'Не удалось получить статью',
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.json(doc);
      }
    )
      .populate('comments.user')
      .populate('user');
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
      likes: [],
      comments: [],
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};
export const remove = (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete({ _id: postId }, (err, doc) => {
      if (err) {
        return res.status(500).json({
          message: 'Не удалось удалить статью',
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: 'Статья не найдена',
        });
      }
      res.json({
        success: true,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Не удалось удалить статью',
    });
  }
};
export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
};

export const likes = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;

  const post = await PostModel.findById(postId);
  const isLiked = post.likes.includes(userId);

  try {
    if (!isLiked) {
      const addLikePost = await PostModel.findByIdAndUpdate(
        postId,
        { $push: { likes: userId } },
        { new: true }
      );
      return res.status(200).json(addLikePost);
    } else {
      const addLikePost = await PostModel.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
      );
      return res.status(200).json(addLikePost);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось поставить лайк',
    });
  }
};

export const comment = async (req, res) => {
  const postId = req.params.id;
  const user = req.userId;
  const doc = { comment: req.body.comment, user };

  await PostModel.findByIdAndUpdate(
    postId,
    { $push: { comments: doc } },
    { new: true }
  )
    .populate('comments.user')
    .populate('user')
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    });
};

export const uncomment = async (req, res) => {
  const postId = req.params.id;
  const user = req.userId;
  const doc = { comment: req.body.comment, user };

  await PostModel.findByIdAndUpdate(
    postId,
    { $pull: { comments: doc } },
    { new: true }
  )
    .populate('comments.user')
    .populate('user')
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    });
};
