const { exec } = require("node:child_process");
function checkPostgre() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") == -1) {
      process.stdout.write(".");
      checkPostgre();
      return;
    }
    console.log("\n > Postgresql esta pronto para aceitar conexões\n");
  }
}
console.log(" > Esperando o postgres aceitar conexões\n");
checkPostgre();
