import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tickets } from '../../../../../lib/collections/ticket.js';

import './view-ticket.html';

Template.viewTicket.helpers({
  ticket() {
    return Tickets.find();
  }
})
