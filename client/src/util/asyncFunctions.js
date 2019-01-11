import httpObservable from 'simplehttpobservable';

const getFetchObservable = (url, bodyObject = null, method = 'GET') => {
  const payload = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
  }

  if (method === 'POST') {
      payload.body = JSON.stringify(bodyObject);
  }

  return httpObservable(url, payload);
}

// const extendObservable = (observable$) => {
//   return observable$.pipe(tap(() => this.messages.push({
//         from: 'you',
//         msg: {
//           text: this.queryText
//         }
//       })),
//       debounceTime(1000),
//       exhaustMap(() => fetchData(this.queryText, cookies.get('userID'))))
// }

// const subscribeObservable = (observable$) => {
//   return observable$.subscribe((fetchRes) => {
//       if (fetchRes.fulfillmentText) {
//       let botResponse = {
//         from: 'bot',
//         msg: {
//           text: fetchRes.fulfillmentText,
//         }
//       };

//       this.messages.push(botResponse);
//       this.queryText = '';
//     }
//   });
// }

export { getFetchObservable };