import { each } from 'async';
import { District } from '../models';
import districts from './districts.json';

District.sync({ force: true })
  .then(() => {
    each(districts, (district, callback) => {
      District.create(district)
      .then(result => {
        console.log(result);
        callback();
      })
      .catch(console.error);
    }, err => {
      if (err) console.log(err);
    });
  });
