import Router from 'koa-router';

export default (db) => new Router()
  .get('/user', function* getUsers(next) {
    this.body = {
      users: Object.keys(db.users),
    };
    yield next;
  })
  .post('/user', function* postUser(next) {
    const { userName } = this.request.body;
    if(!userName) {
      this.status = 400;
      this.body = 'Expected { userName }.';
      yield next;
      return;
    }
    if(db.users[userName]) {
      this.status = 403;
      this.body = `User ${userName} already exists.`;
      yield next;
      return;
    }
    db.users[userName] = {
      items: [],
    };
    this.body = db.users[userName];
    yield next;
  })
  .get('/user/:userName', function* getUser(next) {
    const { userName } = this.params;
    if(!db.users[userName]) {
      this.status = 404;
      this.body = `User ${userName} doesn't exist.`;
      yield next;
      return;
    }
    this.body = db.users[userName];
    yield next;
  })
  .post('/user/:userName', function* postItem(next) {
    const { item } = this.request.body;
    const { userName } = this.params;
    if(!item || !userName) {
      this.status = 400;
      this.body = 'Expected { item, userName }.';
      yield next;
      return;
    }
    if(!db.users[userName]) {
      this.status = 404;
      this.body = `User ${userName} doesn't exist.`;
      yield next;
      return;
    }
    db.users[userName].items.push(item);
    this.body = db.users[userName];
    yield next;
  })
  .del('/user/:userName', function* delUser(next) {
    const { userName } = this.params;
    if(!userName) {
      this.status = 400;
      this.body = 'Expected { userName }.';
      yield next;
      return;
    }
    if(!db.users[userName]) {
      this.status = 404;
      this.body = `User ${userName} doesn't exist.`;
      yield next;
      return;
    }
    delete db.users[userName];
    this.body = {
      users: Object.keys(db.users),
    };
    yield next;
  })
  .del('/user/:userName/:itemId', function *delItem(next) {
    const { userName, itemId } = this.params;
    if(!userName || itemId === void 0) {
      this.status = 400;
      this.body = 'Expected { userName, itemId }';
      yield next;
      return;
    }
    if(!db.users[userName]) {
      this.status = 404;
      this.body = `User ${userName} doesn't exist.`;
      yield next;
      return;
    }
    const itemKey = parseInt(itemId);
    if(!db.users[userName].items[itemKey]) {
      this.status = 404;
      this.body = `Item ${itemKey} doesn't exist.`;
      yield next;
      return;
    }
    db.users[userName].items.splice(itemKey, 1);
    this.body = db.users[userName];
    yield next;
  });
