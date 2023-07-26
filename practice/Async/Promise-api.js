//its is used during unit testing while promise is already resolved or rejected

// // 1) RESOLVE
// const P = Promise.resolve({ id: 1 });
// P.then((result) => console.log(result));

// // 2) REJECT
// const Q = Promise.reject(new Error("reason for Rejection..."));
// Q.catch((error) => console.log(error));

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async Operation 1....");
    resolve(1);
  }, 2000);
});
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async Operation 2....");
    resolve(2);
  }, 2000);
});

Promise.race([p1, p2])  // .all is for wait until all promise is fulfill .race is return answer when any one of then is fulfilled first 
  .then((result) => console.log(result))
  .catch((err) => console.log("Error", err.message));
