const Rsync = require('rsync')


require('./dotenv')


sync('./secrets', '/var/www/crud-demo')

// ========================
// FUNÇÕES
// ========================
/**
 * 
 * @param {String} source
 * @param {String} destination
 * @param {Boolean} dryRun
 */
function sync (source, destination, dryRun = false) {
  const rsync = new Rsync()
    .shell('ssh')
    .set('stats')
    .flags('avz')
  
    .source(source)
    .destination(`${process.env.SSH_USER}@${process.env.SSH_HOST}:${destination}`)

  if (dryRun) rsync.flags('n')

  rsync.output(
    function (data) {
      
      const string = Buffer.from(data).toString()
      console.log(string)
    }, function (data) {
      
      console.log(data)
    }
  )

  
  rsync.execute(function (error, code, cmd) {
    if (error) console.error(error)
    console.log(cmd)
  })
}
