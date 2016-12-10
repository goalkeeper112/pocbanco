import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Tickets } from '../../../../../lib/collections/ticket.js';
import './ticket-check.html';

Template.ticketCheck.onCreated = () => {
  return Session.setDefault("ticketID", null)
}

Template.ticketCheck.onRendered = () => {
  return Session.setDefault("ticketID", null)
}

Template.ticketCheck.helpers({
  ticketExist() {
    if(Session.get("ticketID")){
      return true;
    }else{
      return false;
    }
  },

  ticketID(){
    return Session.get("ticketID");
  },

  ticketValue(){
    if(Session.get("ticketID")){
      return Tickets.findOne({_id: Session.get("ticketID")}).amount;
    }
  }
});

Template.ticketCheck.events({
  'click #qr-open': () => {
    qrScanner.on('scan', (err, message) => {
      console.log("escaneando")
      if(message){
        Session.set("ticketID", message);
        Meteor.subscribe("myTicket", Session.get("ticketID"))
        $("#myModal").modal('hide');
        qrScanner.stopCapture()
      }
    });
  }
})
