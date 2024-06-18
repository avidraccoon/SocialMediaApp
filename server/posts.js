const uuid = require('uuid');

async function getPost(id, client){
  const posts = await client.db("social").collection("Posts");
  const post = await posts.findOne({_id: id});
  return post;
}

async function createPost(title, body, author, client){
  const id = uuid.v4();
  const post = {
    id: id,
    author: author,
    title: title,
    body: body,
    comments: [],
    likeCount: 0
  }
  const posts = await client.db("social").collection("Posts");
  await posts.insertOne(post);
}

async function getPostsByUser(author, client){
  const posts = await client.db("social").collection("Posts");
  const author = await client.db("social").collection("Users").findOne({id: author});
  const filteredPosts = [];
  author.posts.forEach(post => {
    const post = await getPost(post, client);
    filteredPosts.push(post);
  })
  return filteredPosts;
}

async function deletePost(id, client){
  const posts = await client.db("social").collection("Posts");
  const users = await client.db("social").collection("Users");
  const post = await posts.findOne({id: id});
  const author = users.findOne({id: post.author});
  author.posts.splice(author.posts.indexOf(id), 1);
  await users.updateOne({id: post.author}, {$set: {posts: author.posts}});
  await posts.deleteOne({id: id});
}

async function isPostLiked(postId, userId, client){
  const users = await client.db("social").collection("Users");
  const user = await users.findOne({id: userId});
  return user.likedPosts.includes(postId);
}

async function likePost(postId, userId, client){
  const users = await client.db("social").collection("Users");
  const user = await users.findOne({id: userId});
  const posts = await client.db("social").collection("Posts");
  const post = await posts.findOne({id: postId});
  if (await isPostLiked(postId, userId, client)){
    user.likedPosts.splice(user.likedPosts.indexOf(postId), 1);
    post.likeCount--;
  }else{
    user.likedPosts.push(postId);
    post.likeCount++;
  }
  await users.updateOne({id: userId}, {$set: {likedPosts: user.likedPosts}});
  await posts.updateOne({id: postId}, {$set: {likeCount: post.likeCount}});
}

