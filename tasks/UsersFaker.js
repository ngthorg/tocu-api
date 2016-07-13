/* eslint max-len:0 */
import _ from 'lodash';
import Randexp from 'randexp';
import faker from 'faker';
import { User } from '../models';
import districts from './districts.json';

faker.locale = 'vi';


User.sync({ force: true })
  .then(() =>
    _.times(50, () => {
      const districtObj = faker.random.arrayElement(districts);
      return User.create({
        userName: faker.internet.userName(),
        password: '123456',
        name: faker.name.findName(),
        mobilePhone: new Randexp(/^(091|094|0123|0125|0127|0129|090|093|0122|0126|0128|0121|0120|098|097|096|0169|0168|0167|0166|0165|0164|0163|0162|092|0186|0188|0199|099|095)\d{7}$/).gen(),
        email: faker.internet.email(),
        isVerifyEmail: faker.random.arrayElement([true, false]),
        isVerifyMobilePhone: faker.random.arrayElement([true, false]),
        avatarUrl: faker.image.avatar(),
        level: faker.random.number({
          min: 1,
          max: 100,
        }),
        address: faker.address.streetAddress(),
        district: districtObj.name,
        province: districtObj.province,
      });
    })
  );

// let random = faker.random.number({
//   'min': 10,
//   'max': 50
// });
// console.log(random);

// let rand = new Randexp(/^(091|094|0123|0125|0127|0129|090|093|0122|0126|0128|0121|0120|098|097|096|0169|0168|0167|0166|0165|0164|0163|0162|092|0186|0188|0199|099|095)\d{7}$/).gen();
// console.log(rand);

// User.findAll()
// .then(result => {
//   console.log(result);
// });
