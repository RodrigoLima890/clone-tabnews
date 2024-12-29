import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <DatabaseStatus />
    </>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 3000,
  });
  let updatedAtText = "Carregando...";
  let connections_opened = "Carregando ...";
  let max_connections = "Carregando ...";
  let database_version = "Carregando ...";
  if (!isLoading && data) {
    updatedAtText = new Date(data.update_at).toLocaleString("pt-BR");
    connections_opened = data.dependencies.database.opened_connections;
    max_connections = data.dependencies.database.max_connections;
    database_version = data.dependencies.database.version;
  }

  return (
    <>
      <div>Última atualização: {updatedAtText}</div>
      <div>Versão do Postgres: {database_version}</div>
      <div>Conexões Abertas: {connections_opened}</div>
      <div>Máximo de Conexões: {max_connections}</div>
    </>
  );
}
