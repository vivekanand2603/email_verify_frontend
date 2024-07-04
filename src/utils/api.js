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
  const response = await fetch(`${host}/lists/${id}/leads/count/email_verified`);
  const data = await response.json();
  return data;
}

async function downloadVerifiedList(id) {
  // /lists/:id/leads/csv click on link to download the url returns file no response body
  const element = document.createElement('a');
  element.setAttribute('href', `${host}/lists/${id}/leads/csv`);
  element.setAttribute('download', `${id}.csv`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
}

async function createList(name) {
  const response = await fetch(`${host}/lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  return data;
}

async function uploadCsv(id, file) {
  // POST	/lists/:id/leads/csv	Upload leads from CSV to a list	CSV file	None
  const formData = new FormData();
  formData.append('csvfile', file);
  const response = await fetch(`${host}/lists/${id}/leads/csv`, {
    method: 'POST',
    body: formData,
  });
  return response;
}

async function isListInQueue(id) {
  const response = await fetch(`${host}/lists/${id}/queue`);
  const data = await response.json();
  return data;
}

async function addListToQueue(id) {
  // POST	/lists/:id/queue	Add a list to the queue	None	None
  const response = await fetch(`${host}/lists/${id}/queue`, {
    method: 'POST',
  });
  return response;
}

async function processQueue() {
  // POST	/queue/process	Process the queue	None	None
  const response = await fetch(`${host}/processQueue`);
  return response
}

// get leads count

// get leads count with email_verified

async function getLeadsCount(email_is_valid) {
  const response = await fetch(`${host}/count_all?email_is_valid=${email_is_valid}`);
  const data = await response.json();
  return data;
}

export { 
  getLists, 
  getListCount, 
  getListVerifiedCount,
  downloadVerifiedList,
  createList,
  uploadCsv,
  isListInQueue,
  addListToQueue,
  processQueue,
  getLeadsCount
};