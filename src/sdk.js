const sdk = require('sdk0');

const token = process.env.TODOIST_TOKEN || '';

const client = sdk({
  baseURL: 'https://api.todoist.com',
  headers: {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/x-www-form-urlencoded'
  }
});

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

const getProjects = () =>
  client.get('/rest/v1/projects').then(({ data }) =>
    data
      .filter((p) => p.shared)
      .map((p) => {
        Object.assign(p, {
          color: colors[p.color],
          sync_id: undefined,
          comment_count: undefined,
          parent: undefined,
          shared: undefined,
          favorite: undefined
        });
        return p;
      })
  );

const getSections = () => client.get('/rest/v1/sections').then(({ data }) => data);

const getLabels = () =>
  client.get('/rest/v1/labels').then(({ data }) =>
    data.map((l) => {
      Object.assign(l, {
        color: colors[l.color],
        favorite: undefined
      });
      return l;
    })
  );

const getActiveTasks = () =>
  client.get('/rest/v1/tasks').then(({ data }) =>
    data.map((t) => {
      Object.assign(t, {
        comment_count: undefined,
        url: undefined
      });
      return t;
    })
  );

const getCompletedTasks = async (page = 0) => {
  const { data: { items = [] } = {} } = await client.get('/sync/v8/completed/get_all', {
    params: {
      limit: 200,
      offset: page * 200,
      since: '2020-8-1T00:00'
    }
  });
  if (items.length === 200) {
    return [...items, await getCompletedTasks(page + 1)];
  }
  return items.map((t) => {
    const { user_id, content, completed_date, project_id, task_id } = t;
    return {
      id: task_id,
      assignee: user_id,
      section_id: 0,
      project_id,
      content,
      completed: true,
      completed_date
    };
  });
};

module.exports = {
  colors,
  getProjects,
  getSections,
  getLabels,
  getActiveTasks,
  getCompletedTasks
};
