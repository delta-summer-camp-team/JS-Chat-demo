/*
  Инициализация чата, вывод предыдущих сообщений из базы
 */
function initChat() {
  let postsRef = firebase.database().ref('posts');
  postsRef.on('value', (snapshot)=>{
    console.log(snapshot.val());
  })
}