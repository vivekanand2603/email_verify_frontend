const host = 'http://localhost:30003';

async function getLists() {
  const response = await fetch(`${host}/lists`);
  const data = await response.json();
  return data;
}

export { getLists };