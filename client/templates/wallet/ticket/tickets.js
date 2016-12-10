import { Meteor } from 'meteor/meteor';
import { Tickets } from '../../../../lib/collections/ticket.js';
import './tickets.html';

Template.tickets.helpers({
  tickets() {
    return Tickets.find({});
  }
})
