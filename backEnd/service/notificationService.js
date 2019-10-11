
    const cron = require('node-cron');

    const service = require('./notesService')

     cron.schedule('* * * * *', () =>  {
               console.log(' Its running ....');
    // setInterval( , 5000);
    service.notificationService()
           });
           
    
// module.exports = new NotificationService();
