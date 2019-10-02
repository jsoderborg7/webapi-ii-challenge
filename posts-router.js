const express = require('express');

const Posts = require ('./data/db');

const router = express.Router();

router.get('/', (req, res) =>{
  Posts.find()
    .then(post =>{
      res.send(post);
    })
    .catch(err =>{
      res.status(500).json({error: "The posts information could not be retrieved."});
    })
});

router.post('/', (req, res) =>{
  const postData = req.body;
  if (!postData.title || !postData.contents){
    res.status(400).json({message: "Please provide title and contents for the post."});
  } else {
    Posts.insert(postData)
      .then(post =>{
        res.status(201).json({message: "Created"});
      })
      .catch(err =>{
        res.status(500).json({error: "There was an error while saving the post to the database."});
      });
  }
});

router.get('/:id', (req, res) =>{
  Posts.findById(req.params.id)
    .then(post =>{
      if (post[0]) {
        console.log(post);
        res.status(200).json(post);
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "Post information could not be retrieved."})
    });
});

router.delete('/:id', (req, res) =>{
  Posts.remove(req.params.id)
    .then(post =>{
      if (post) {
        console.log(post);
        res.status(200).json(post);
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res.status(500).json({message: "The post could not be removed"})
    });
});

router.put('/:id', (req, res) =>{
  if (!req.body.title || !req.body.contents){
    res.status(400).json({errorMessage: "Please provide title and contents for this post."})
  } else {
    Posts.update(req.params.id, req.body)
      .then(post =>{
        if (post){
          res.status(200).json({...req.body, id: req.params.id})
        } else {
          res.status(404).json({message: "The post with the specified ID does not exist."})
        }
      })
      .catch(err =>{
        res.status(500).json({error: "The post information could not be updated."})
      })
  }
});

router.get('/:id/comments', (req, res) =>{
  Posts.findPostComments(req.params.id)
    .then(post =>{
      if (post[0]){
        res.status(200).json(post)
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res.status(500).json({error: "The comments information could not be retrieved."})
    })
});

router.post('/:id/comments', (req, res) =>{
  const comment = {...req.body, post_id: req.params.id};
  Posts.findById(req.params.id)
    .then(post =>{
      if (!post[0]){
        res.status(404).json({message: "The post with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res.status(500).json({error: "There was an error while saving the comment to the database."})
    })
    if (!req.body.text){
      res.status(400).json({errorMessage: "Please provide text for the comment."})
    } else {
      Posts.insertComment(comment)
        .then(com =>{
          res.status(201).json(comment)
        })
        .catch(err =>{
          res.status(500).json({error: "There was an error while saving the comment to the database."})
        })
    }
});




module.exports = router;