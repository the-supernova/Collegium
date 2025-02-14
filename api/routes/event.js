var express = require("express");
var router = express.Router();
var { User, Tag, Event } = require("../model");
// contains all event related endpoints

router.get("/getEvent", (req, res) => {
  var now = new Date();
  Event.find(
    { when: { $gte: now } },
    "name when lastDate tags where",
    (err, events) => {
      if (err) {
        res.send(err);
      } else {
        res.send(events);
      }
    }
  );
});
router.get("/getEvent/:id", (req, res) => {
  {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        res.send(err);
      } else {
        res.send(event);
      }
    });
  }
});
router.get("/getEvent/college/:name", (req, res) => {
  Event.find({ college: req.params.name }, (err, events) => {
    if (err) {
      res.send(err);
    } else {
      res.send(events);
    }
  });
});
router.get("/getEvent/attendee/:id", (req, res) => {
  Event.find({ attendee: req.params.id }, (err, events) => {
    if (err) {
      res.send(err);
    } else {
      res.send(events);
    }
  });
});
router.post("/createEvent/:id", (req, res) => {
  const { name, message, when, lastDate, where, tags, imageurl }= req.body;
  const newEvent = new Event({
    name: name,
    message: message,
    coordinators: [req.params.id],
    when: new Date(when),
    lastDate: new Date(lastDate),
    where: where,
    tags: tags,
    imageurl: imageurl,
  });
  newEvent.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({
        id: newEvent._id,
        message: "Event Created Successfully!",
      });
    }
  });
});
router.post("updateEvent/:id", (req, res) => {
  const { name, message, coordinators, when, lastDate, where, tags, attendees, imageurl } = req.body;
  Event.updateOne(
    { _id: req.params.id },
    {
      name: name,
      message: message,
      coordinators: coordinators,
      when: new Date(when),
      lastDate: new Date(lastDate),
      where: where,
      tags: tags,
      imageurl: imageurl,
    
    }, (err) => {
      if (err) {
        res.send(err);
      }
      else {
        res.send({
          id: req.params.id,
          message:"Updated Successfuly!",
        })
      }
    }
  );
})

module.exports = router;
