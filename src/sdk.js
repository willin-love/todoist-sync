const sdk = require('sdk0');

const token = process.env.TODOIST_TOKEN || '';

const client = sdk({
  baseURL: 'https://api.todoist.com',
  headers: {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/x-www-form-urlencoded'
  }
});

const getProjects = () => client.get('/rest/v1/projects').then(({ data }) => data);

const getSections = () => client.get('/rest/v1/sections').then(({ data }) => data);

const getLabels = () => client.get('/rest/v1/labels').then(({ data }) => data);

const getActiveTasks = () => client.get('/rest/v1/tasks').then(({ data }) => data);

const getCompletedTasks = async (page = 0) => {
  const { data: { items = [] } = {} } = await client.get('/sync/v8/completed/get_all', {
    params: {
      limit: 200,
      offset: page * 200
    }
  });
  if (items.length === 200) {
    return [...items, await getCompletedTasks(page + 1)];
  }
  return items;
};

const colors = {
  30: '#b8256f',
  31: '#db4035',
  32: '#ff9933',
  33: '#fad000',
  34: '#afb83b',
  35: '#7ecc49',
  36: '#299438',
  37: '#6accbc',
  38: '#158fad',
  39: '#14aaf5',
  40: '#96c3eb',
  41: '#4073ff',
  42: '#884dff',
  43: '#af38eb',
  44: '#eb96eb',
  45: '#e05194',
  46: '#ff8d85',
  47: '#808080',
  48: '#b8b8b8',
  49: '#ccac93'
};

module.exports = {
  colors,
  getProjects,
  getSections,
  getLabels,
  getActiveTasks,
  getCompletedTasks
};
