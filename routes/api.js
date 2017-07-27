var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

router.route('/posts')

//returns all posts
.get(function(req, res) {
    Post.find(function(err, data) {
        if (err) {
            return res.send(500, err);
        }

        return res.send(data);
    });
})

.post(function(req, res) {
    var post = new Post();
    post.message = req.body.message;
    post.username = req.body.username;
    post.save(function(err, post) {
        if (err) {
            return res.send(500, err);
        }
        return res.json(post);
    });
});

//post-specific commands. likely won't be used
router.route('/posts/:id')
    //gets specified post
    .get(function(req, res) {
        Post.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);
            res.json(post);
        });
    })
    //updates specified post
    .put(function(req, res) {
        Post.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);

            post.created_by = req.body.created_by;
            post.text = req.body.text;

            post.save(function(err, post) {
                if (err)
                    res.send(err);

                res.json(post);
            });
        });
    })
    //deletes the post
    .delete(function(req, res) {
        Post.remove({
            _id: req.params.id
        }, function(err) {
            if (err)
                res.send(err);
            res.json("deleted :(");
        });
    });

module.exports = router;