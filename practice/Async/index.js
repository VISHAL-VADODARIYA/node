console.log("Before");

getUser(1, getRepositories);

console.log("After");

function getRepositories(user) {
  getRepositories(user.name, getCommits);
}
function getCommits(repos) {
  getCommits(repo, displayCommits);
}
function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a data from database...");
    callback({ id: id, name: "vishal" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("calling github API");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
