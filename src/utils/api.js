const host = 'http://localhost:30003';

async function getLists() {
  const response = await fetch(`${host}/lists`);
  const data = await response.json();
  return data;
}

async function getListCount(id) {
  const response = await fetch(`${host}/lists/${id}/leads/count`);
  const data = await response.json();
  return data;
}

async function getListVerifiedCount(id) {
  const response = await fetch(`${host}/lists/${id}/leads/count`);
  const data = await response.json();
  return data;
}

export { 
  getLists, 
  getListCount, 
  getListVerifiedCount
 
};