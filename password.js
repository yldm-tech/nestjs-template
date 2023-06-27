const generate = async (password) => {
  return await require('bcrypt').hash(password, 10);
};

const prompt = require('prompt');

prompt.start();

prompt.get(['password'], function (err, result) {
  if (err) {
    return onErr(err);
  }
  generate(result.password).then((password) => {
    console.log('Command-line input received:');
    console.log('  password: ' + password);
  });
});

function onErr(err) {
  console.log(err);
  return 1;
}
