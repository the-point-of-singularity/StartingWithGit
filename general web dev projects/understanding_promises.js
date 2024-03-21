const posts=[
    {title:'Post 1',body:'This is post one'},
    {title:'Post 2',body:'This is post two'}
];
function getPosts() {
    setTimeout( () => {
        posts.forEach( (post) => {
            console.log(post.title);
        });
    },1000);
}
function createPost(post) {
    return new Promise( (resolve,reject) => {
        setTimeout( () => {
            posts.push(post);
            resolve();
        },2000);
    });
}
function updateLastUserActivityTime() {
    return new Promise( (resolve,reject) => {
        setTimeout(() => {
            const updatedTime = new Date();
            resolve(updatedTime);
        }, 1000);
    });
}
function deletePost(){
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            if(posts.length > 0){
                const poppedElement  = posts.pop();
                resolve(poppedElement);
            } else {
                reject("ERROR: ARRAY IS EMPTY")
            }
        }, 1000)
    })
}
createPost({ title: 'Post 3', body: 'This is post three' })
    .then(() => updateLastUserActivityTime())
    .then((updatedTime) => {
        console.log(`Updated last user activity time: ${updatedTime}`);
        getPosts();
    });

  
  





    
    
    
    
    
    