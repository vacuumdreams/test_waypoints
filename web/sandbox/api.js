const path = require('path')
const OpenApiMocker = require('open-api-mocker');

module.exports = async () => {
  const mocker = new OpenApiMocker({
    port: 8001,
    schema: path.join(__dirname, '..', '..', 'http.yaml'),
  });

  await mocker.validate();
  await mocker.mock();
}
