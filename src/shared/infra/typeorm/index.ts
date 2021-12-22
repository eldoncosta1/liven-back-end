import { createConnections } from 'typeorm';

createConnections()
  .then(connection => {
    console.log('>>> connected to database <<<');
  })
  .catch(error => {
    console.log('error to connect database');
    console.log(error);
  })