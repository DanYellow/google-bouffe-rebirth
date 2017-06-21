import { gbapimanager as GBAPIManager } from './gb-apimanager.js'

fit('works with async/await', async () => {
  fetch.mockResponse(JSON.stringify({access_token: '12345' }))
  // expect.assertions(1);
  const data = await GBAPIManager.createSurvey(4);
  expect(data).toEqual({access_token: '12345' });
});