import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './new-ticket.html';

Template.newTicket.helpers({
  ticket: () => {
    return Session.get('ticket');
  }
});

Template.newTicket.events({
  'click #createTicket': () => {
    let params = {
      userId: Meteor.userId(),
      amount: parseInt(document.getElementById('amount').value),
      password: document.getElementById('password').value,
      dateExpire: document.getElementById('dateExpire').value
    };

    Meteor.call('createTicket', params, (err, result) => {
      if(err){
        throw err;
      }else {
        return Session.set('ticket', result);
      }
    });
  }
});
