const { google } = require('googleapis');

module.exports.listEvents = function (auth, cb) {
    const youtube = google.youtube({version: 'v3', auth});
  
    youtube.subscriptions.list({
      mine: true,
      part: 'snippet',
      order: 'alphabetical',
      maxResults: 1000
    }, (err, res) => {
      if (err) return cb({error:'The API returned an error: ' + err});
      const events = res.data.items;
      if (events.length) {
        cb(events)
       
      } else {
        console.log('No upcoming events found.');
      }
    });
  }