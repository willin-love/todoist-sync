const test = require('ava');
const sdk = require('../src/sdk');

test('sdk projects', async (t) => {
  const projects = await sdk.getProjects();
  t.is(projects.length > 0, true);
});

test('sdk sections', async (t) => {
  const sections = await sdk.getSections();
  t.is(sections.length > 0, true);
});

test('sdk labels', async (t) => {
  const labels = await sdk.getLabels();
  t.is(labels.length > 0, true);
});

test('sdk active tasks', async (t) => {
  const tasks = await sdk.getActiveTasks();
  t.is(tasks.length > 0, true);
});

test('sdk complete tasks', async (t) => {
  const tasks = await sdk.getCompletedTasks();
  t.is(tasks.length >= 0, true);
});
