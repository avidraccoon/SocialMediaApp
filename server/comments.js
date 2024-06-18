const uuid = require('uuid');

async function getComment(postId, id, client){
  const posts = await client.db("social").collection("Posts");
  const post = await posts.findOne({_id: postId});
  const comment = post.comments.find(comment => comment.id == id);
  return comment;
}

async function createComment(body, author, post, client){
  const id = uuid.v4();
  const posts = await client.db("social").collection("Posts");
  const post = await posts.findOne({_id: postId});
  const comment = {
    id: id,
    author: author,
    body: body
  }
  post.comments.push(comment);
}

async function deleteComment(postId, id, client){
  const posts = await client.db("social").collection("Posts");
  const users = await client.db("social").collection("Users");
  const post = await posts.findOne({id: id});
  const author = users.findOne({id: post.author});
  author.comments.splice(author.comments.indexOf(id), 1);
  await users.updateOne({id: post.author}, {$set: {posts: author.posts}});
  post.comments.splice(post.comments.indexOf(id), 1);
  await posts.updateOne({id: postId}, {$set: {comments: post.comments}});
}