function auth() {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  firebase.auth().onAuthStateChanged(user => {
    if (user == null) {
      // show login form
      document.querySelector('#loginBlock').style.display = 'block';
    } else {
      document.querySelector('#loginBlock').style.display = 'none';
      document.querySelector('#registerBlock').style.display = 'none';
      console.log('Ready to chat');
    }
  });
}

function logoff() {
  firebase.auth().signOut();
}

function login() {
  const email = document.querySelector('#email').value;
  const passwd = document.querySelector('#password').value;

  if (email == null || email.length === 0 || passwd == null || passwd.length === 0) {
    alert('Пожалуйста заполните все поля формы');
    return false;
  } else {
    firebase.auth().signInWithEmailAndPassword(email, passwd)
      .catch((error)=> {
        alert(error.message);
        document.querySelector('#password').value = '';
        return false;
      });
  }
}
function showRegister() {
  document.querySelector('#loginBlock').style.display = 'none';
  document.querySelector('#registerBlock').style.display = 'block';
}
function register() {
  const email = document.querySelector('#regEmail').value;
  const nikname = document.querySelector('#regNikname').value;
  const passwd = document.querySelector('#regPassword').value;
  const passwd2 = document.querySelector('#regPassword2').value;

  if (email == null || email.length === 0 || passwd == null || passwd.length === 0
    || nikname == null || nikname.length === 0 || passwd2 == null || passwd2.length === 0) {
    alert('Пожалуйста заполните все поля формы');
    return false;
  } else if (passwd !== passwd2) {
    alert('Пароли не совпадают!');
    document.querySelector('#regPassword').value = '';
    document.querySelector('#regPassword2').value = '';
    return false;
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, passwd)
      .then(()=>{
        let user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: nikname
        })
      })
      .catch((error)=> {
        alert(error.message);
        document.querySelector('#password').value = '';
        return false;
      });
  }
}