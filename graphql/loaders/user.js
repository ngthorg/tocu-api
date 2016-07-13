import DataLoader from 'dataloader';
import {
  User,
} from '../../models';


const userNameLoader = new DataLoader(names =>
  User.findAll({
    where: {
      userName: {
        $in: names,
      },
    },
  })
  // .then(users => {
  //   for (const user of users) {
  //
  //   }
  // })
);

export const userByIDLoader = new DataLoader(ids =>
  User.findAll({
    where: {
      id: {
        $in: ids,
      },
    },
  })
  .then(users => {
    for (const user of users) {
      userNameLoader.prime(user.userName, user);
    }

    return users;
  })
);

export const allUserLoader = new DataLoader(keys => {
  console.log(keys[0]);

  if (keys[0] !== 'allUsers' && typeof JSON.parse(keys[0]) === 'object') {
    return Promise.all([User.findAll({
      where: JSON.parse(keys[0]),
    })]);
  }
  return Promise.all([User.findAll()]);
});
