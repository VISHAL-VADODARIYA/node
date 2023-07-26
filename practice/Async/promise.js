//create
const p = new Promise((resolve, reject) => {
  //promise is in pending status when it created
  setTimeout(() => {
    resolve(1); // pending => resolved , fulfilled
    reject(new Error("message")); // rending => rejected
  }, 2000);
});

//comsume
p.then((result) => console.log("Result", result)).catch((err) =>
  console.log("Error", err.message)
);
