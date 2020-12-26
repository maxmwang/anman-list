import firebase from 'firebase';
import sha256   from 'js-sha256';

firebase.initializeApp({
  apiKey: 'AIzaSyBeotHm7O-r4F2YUedhn9WMZrTI5U0Hs_M',
  authDomain: 'anman-list.firebaseapp.com',
  databaseURL: 'https://anman-list-default-rtdb.firebaseio.com',
  projectId: 'anman-list',
  storageBucket: 'anman-list.appspot.com',
  messagingSenderId: '763409917320',
  appId: '1:763409917320:web:6034f95cf87d62d8b9463d'
});
const db = firebase.database();


class server {
  newUser(username, password) {
    db.ref('passwords/').update({
      [username]: sha256(password)
    });
    return;
  }

  async userExists(username) {
    let exists;
    await db.ref(`passwords/${username}`).once('value', snapshot => {
      exists = snapshot.exists();
    });
    return exists
  }

  async verifyPassword(username, password) {
    let hash;
    await db.ref(`passwords/${username}`).once('value', snapshot => {
      hash = snapshot.val();
    });
    return sha256(password) === hash;
  }

  modifyPassword(username, oldPassword, newPassword) {
    return;
  }

  async generateToken(username) {
    let currentToken;
    await db.ref(`tokens/${username}`).once('value', snapshot => {
      currentToken = snapshot.val();
    });
    if (currentToken) {
      return currentToken;
    }

    let token = '';
    const key32 = window.crypto.getRandomValues(new Uint32Array(4));
		for (let i = 0; i < key32.length; i++) {
			token += (i > 0) ? '-' : '';
			token += key32[i].toString(16);
    }

    db.ref('tokens/').update({
      [username]: token
    });
    return token;
  }

  async verifyToken(username, token) {
    if (!username) {
      return false;
    }

    let realToken;
    await db.ref(`tokens/${username}`).once('value', snapshot => {
      realToken = snapshot.val();
    });

    return realToken === token;
  }

  destroyToken(username) {
    db.ref('tokens/').update({
      [username]: null
    });
  }

  newManga(username, {title, link, chapter}) {
    return
  }

  modifyManga(username, {title, link, chapter}) {
    return;
  }

  removeManga(username, title) {
    return;
  }

  newAnime(username, {title, link, season, episode}) {
    return;
  }

  modifyAnime(username, type, title, data) {
    db.ref(`${username}/animes/${type}/${title}`).update(data);
  }

  removeAnime(username, title) {
    return;
  }

  async getUserData(username) {
    let data;
    await db.ref(`${username}`).once('value', snapshot => {
      data = snapshot.val();
    });
    return data;
  }
}


const myServer = new server()
export default myServer;
