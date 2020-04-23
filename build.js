(async () => {
  const { exec } = require('child_process');

  let child;

  const node_env = process.env.NODE_ENV.trim();

  if(node_env === 'development') {
    child = exec('npm run build:dev');
  } 
  else if(node_env == 'production') {
    child = exec('npm run build:prod');
  } 
  else {
    throw new Error('NODE_ENV not correctly defined');
  }

  child.stdout.on('data', (data) => {
    console.log('[EXEC-INFO]', data);
  })

  child.stderr.on('data', (error) => {
    console.log('[EXEC-ERROR]', error)
  });

  child.on('close', (code) => {
    console.log(`[EXEC-END] child process exited with code ${code}`);
  });

})().catch((err) => {
  console.error('[BUILD-ERROR]', err);
});