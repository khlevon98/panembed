import { getExtension, getPathFromUrl, makeId } from '../utils';

class ApiService {
  constructor(firestore, firebase) {
    this._firestore = firestore;
    this._firebase = firebase;
  }

  getProjects = async (query = []) => {
    let resp = this._firestore.collection('projects');
    query.forEach(value => {
      resp = resp.where(...value);
    });

    resp = await resp.get();

    return resp.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  };

  getProject = async (id = null) => {
    const resp = await this._firestore
      .collection('projects')
      .doc(id)
      .get();

    return resp.data();
  };

  createProject = async ({ title, description, image, ownerId, ownerName } = {}) => {
    const fileName = `${ownerId}_${makeId(10)}.${getExtension(image.name)}`;

    let resp = await this._firebase.uploadFile('/panoramas', image, undefined, {
      name: fileName,
    });

    const imgUrl = await resp.uploadTaskSnapshot.ref.getDownloadURL();

    const thumbUrl = imgUrl.replace(fileName, `thumb-400-${fileName}`);

    resp = await this._firestore.collection('projects').add({
      createDate: new Date(),
      image: `${getPathFromUrl(imgUrl)}?alt=media`,
      thumb: `${getPathFromUrl(thumbUrl)}?alt=media`,
      title,
      description,
      ownerId,
      ownerName,
      fileName,
    });

    return resp;
  };

  deleteProject = async (id = null) => {
    const doc = await this._firestore.collection('projects').doc(id);

    let resp = await doc.get();

    resp = resp.data();

    await this._firebase.deleteFile(`panoramas/${resp.fileName}`);
    await this._firebase.deleteFile(`panoramas/thumb-400-${resp.fileName}`);

    resp = await doc.delete();

    return resp;
  };

  getUser = async (id = null) => {
    const resp = await this._firestore
      .collection('users')
      .doc(id)
      .get();
    return resp.data();
  };

  createUser = async ({ email, password, firstName, lastName } = {}) => {
    let resp = await this._firebase.auth().createUserWithEmailAndPassword(email, password);

    resp = await this._firestore
      .collection('users')
      .doc(resp.user.uid)
      .set({ firstName, lastName });
    return resp;
  };

  authenticateUser = async (data = {}) => {
    return this._firebase.auth().signInWithEmailAndPassword(data.email, data.password);
  };

  unAuthenticateUser = async () => {
    return this._firebase.auth().signOut();
  };
}

export default ApiService;
