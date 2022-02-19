import { Router } from 'express';
import Action from 'modules/Action/model';
import Order from 'modules/Order/model';
import Product from 'modules/Product/model';
import Role from 'modules/Role/model';
import config from './config';
import db from './db';
import User from  './modules/User/model';



db.sync({force: true}).then(
  () => {
    const d = User.create({
      login: 'test',
      password: 'test',
      role: 0,
    }).then((...t) => {
      console.log(t);
    }).catch((...e) => {
      console.log(e);
    });
  }
);





