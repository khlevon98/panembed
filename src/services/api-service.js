class ApiService {
  constructor(firestore, firebase) {
    this._firestore = firestore;
    this._firebase = firebase;
  }

  getProjects = async () => {
    const resp = await this._firestore.collection('projects').get();

    return resp.data();
  };

  getProject = async (id = null) => {
    const resp = await this._firestore
      .collection('projects')
      .doc(id)
      .get();

    return resp.data();
  };

  createProject = async (data = {}) => {
    return this._firestore.collection('projects').add(data);
  };

  deleteProject = async (id = null) => {
    return this._firestore
      .collection('projects')
      .doc(id)
      .delete();
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
