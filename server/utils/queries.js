const db = require("../models/models.js");

const queries = {};

// GET ALL EVENTS
queries.getAllEvents = `
SELECT * FROM events
`;

// GET ALL ATTENDEES FOR EVENT
queries.getEventAllAttendees = `
SELECT u.*, ue.eventid
FROM usersandevents ue
JOIN users u
ON u.userid = ue.userid
`;
//
// GET USER'S EVENTS
queries.userEvents = `
SELECT * FROM usersandevents WHERE userid=$1
`;

// let minchanuserid = [1];
// db.query(queries.userEvents, minchanuserid).then(data => console.log(data.rows));

// GET ALL USER'S PERSONAL INFO
queries.userInfo = `SELECT * FROM users WHERE username=$1`; // const values = [req.query.id]

// let minchanusername = ['minchanjun@gmail.com'];
// db.query(queries.userInfo, minchanusername).then(data => console.log(data.rows));


// QUERY TO ADD USER
queries.addUser = `
INSERT INTO users
  (username, firstname, lastname, profilephoto)
VALUES($1, $2, $3, $4)
RETURNING username
;
`;

// let addMinchan = ['minchanjun@gmail.com', 'minchan', 'jun', 'photo TBD'];
// db.query(queries.addUser, addMinchan).then(data => console.log(data.rows));

// let addMarc = ['marcaburnie@gmail.com', 'marc', 'burnie', 'photo TBD'];
// db.query(queries.addUser, addMarc).then(data => console.log(data.rows));




// QUERY FOR WHEN USER CREATES EVENT 
queries.createEvent = `
INSERT INTO events
  (eventtitle, eventdate, eventstarttime, eventendtime, eventlocation, eventdetails, eventownerid, eventownerusername, eventmessages)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING eventid
;
`;

// let minchanBirthday = ['minchan birthday', '9/15/2020', '06:00 PM', '09:00 PM', 'golf course', 'play minigolf birthday', 1, 'minchanjun@gmail.com', "{'hey when is it again', 'happy birthday!', 'sorry can\'t make it'}"]
// db.query(queries.createEvent, minchanBirthday).then(data => console.log(data.rows));

// let minchanWedding = ['minchan wedding', '10/1/2020', '02:00 PM', '03:00 PM', 'castle', 'attend wedding', 1, 'minchanjun@gmail.com', "{'so excited for your wedding!', 'loving the location', 'sorry can\'t make it'}"]
// db.query(queries.createEvent, minchanWedding).then(data => console.log(data.rows));

// let marcBirthday = ['marc birthday', '1/16/2021', '01:00 PM', '02:00 PM', 'dave n buster', 'arcade games', 2, 'marcaburnie@gmail.com', "{'congrats', 'happy bussdayyy', 'sorry don\'t think i make it'}"]
// db.query(queries.createEvent, marcBirthday).then(data => console.log(data.rows));



// ADDS ALL CURRENT EVENTS TO USERSANDEVENTS
queries.addNewEventToJoinTable = `
INSERT INTO usersandevents (userid, username, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation)
SELECT eventownerid, eventownerusername, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation FROM events
WHERE eventid=$1
RETURNING usersandevents;
`;
// ====================== FOR TESTING ONLY ======================
// ====================== FOR TESTING ONLY ======================
// ====================== FOR TESTING ONLY ======================
queries.addNewEventToUsersAndEvents = `
INSERT INTO usersandevents (userid, username, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation)
SELECT eventownerid, eventownerusername, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation FROM events
RETURNING usersandevents;
`;
// db.query(queries.addNewEventToUsersAndEvents).then(data => console.log(data.rows));


// USERS ADDS THEMSELVES TO OTHER PEOPLE'S EVENTS
queries.addUserToEvent = `INSERT INTO usersandevents
  (userid, username, eventid, eventtitle, eventdate, eventstarttime, eventendtime, eventdetails, eventlocation)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING eventid
;
`;
// let marcAttendingMinchanBirthday = [2, 'marcaburnie@gmail.com', 1, 'minchan birthday', '2020-09-15', '18:00:00', '21:00:00', 'play minigolf birthday', 'golf course'];
// db.query(queries.addUserToEvent, marcAttendingMinchanBirthday).then(data => console.log(data.rows));;


// GRAB EVENT'S ATTENDEES
// queries.selectEventAttendees = `SELECT * FROM usersandevents WHERE eventtitle=$1`;
queries.selectEventAttendees = `SELECT * FROM usersandevents WHERE eventtitle=$1`;

// let minchanBirthdayEventTitle = ['minchan birthday'];
// db.query(queries.selectEventAttendees, minchanBirthdayEventTitle).then(data => console.log(data.rows));


queries.addMessageToEvent = `
INSERT INTO eventsandmessages (userid, username, eventid, eventtitle, messagetext, messagedate, messagetime)
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING eventsandmessages
`;

// let marcCommentingOnMinchanBday = [2, 'marcaburnie@gmail.com', 1, 'minchan birthday', 'happy birthday dude, from marc', '2020-08-17', '05:00:01']
// db.query(queries.addMessageToEvent, marcCommentingOnMinchanBday)

// let minchanCommentingOnMinchanBday = [1, 'minchanjun@gmail.com', 1, 'minchan birthday', 'so excited to see everyone at my birthday', '2020-08-18', '10:00:01']
// db.query(queries.addMessageToEvent, minchanCommentingOnMinchanBday)

// let minchanCommentingOnMinchanWedding = [1, 'minchanjun@gmail.com', 2, 'minchan wedding', 'my wedding is gonna be LIT', '2020-10-18', '12:30:00']
// db.query(queries.addMessageToEvent, minchanCommentingOnMinchanWedding)

// let minchanCommentingOnMarcBday = [1, 'minchanjun@gmail.com', 3, 'marc birthday', 'happy birthday marc!', '2020-11-12', '14:30:00']
// db.query(queries.addMessageToEvent, minchanCommentingOnMarcBday)

// GET COMMENTS FOR EVENTS
queries.getEventMessages = `
SELECT u.userid, u.username, u.profilephoto, em.eventtitle, em.messagetext, em.messagedate, em.messagetime
FROM users u
JOIN eventsandmessages em
ON u.username=em.username
`;
// WHERE em.eventtitle=$1
// let minchanBirthdayEventTitle = ['Minchan Birthday'];
// db.query(queries.selectEventComments, minchanBirthdayEventTitle).then(data => console.log(data.rows));


// CLEAR ALL TABLES & DATA
queries.clearAll = `
DROP TABLE usersandevents;
DROP TABLE events;
DROP TABLE users;
`;

function getAllEventsUsersMessages() {
  const allEvents = async function (req, res, next) {
    try {
      const queryString1 = queries.getAllEvents;
      const queryString2 = queries.getEventAllAttendees;
      const queryString3 = queries.getEventMessages;
      const events = await db.query(queryString1)
      const attendees = await db.query(queryString2)
      const messages = await db.query(queryString3)

      console.log('========> events.rows: ', events.rows);
      console.log('========> attendees.rows: ', attendees.rows);
      console.log('========> messages.rows: ', messages.rows);

      events.rows.forEach((eventObj, i) => {
        const eventAttendeeList = attendees.rows.filter(userObj => userObj.eventid == eventObj.eventid);
        console.log('eventAttendeeList: ', eventAttendeeList)
        eventObj.attendees = eventAttendeeList;
        console.log('eventObj: ', eventObj)

        const eventMessageList = messages.rows.filter(messageObj => messageObj.eventtitle == eventObj.eventtitle);
        console.log('eventMessageList: ', eventMessageList)
        eventObj.content = eventMessageList
        console.log('eventObj: ', eventObj)
      })

      console.log('events after insertion of attendees & messages: ', events.rows);
      // res.locals.allEventsInfo = events.rows;
      // console.log("res.locals.allEventsInfo", res.locals.allEventsInfo)
      return events.rows;
    } catch (err) {
      console.log(err);
    };
  }
  allEvents();
}

getAllEventsUsersMessages();


module.exports = queries;