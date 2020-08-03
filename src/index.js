const fs = require('fs');
const path = require('path');
const rmrf = require('rimraf');
const cp = require('child_process');
const sdk = require('./sdk');

const DIR = path.resolve(process.cwd(), './assets/data');

module.exports = async () => {
  // DELETE previous data
  rmrf.sync(DIR);
  fs.mkdirSync(DIR, { recursive: true });
  const projects = await sdk.getProjects();
  fs.writeFileSync(path.join(DIR, 'projects.js'), `export default ${JSON.stringify(projects, null, 2)}`);
  const sections = await sdk.getSections();
  fs.writeFileSync(path.join(DIR, 'sections.js'), `export default ${JSON.stringify(sections, null, 2)}`);
  const labels = await sdk.getLabels();
  fs.writeFileSync(path.join(DIR, 'labels.js'), `export default ${JSON.stringify(labels, null, 2)}`);
  const active_tasks = await sdk.getActiveTasks();
  fs.writeFileSync(path.join(DIR, 'tasks_active.js'), `export default ${JSON.stringify(active_tasks, null, 2)}`);
  const completed_tasks = await sdk.getCompletedTasks();
  fs.writeFileSync(path.join(DIR, 'tasks_completed.js'), `export default ${JSON.stringify(completed_tasks, null, 2)}`);
  cp.execSync('npm run lint');
};
