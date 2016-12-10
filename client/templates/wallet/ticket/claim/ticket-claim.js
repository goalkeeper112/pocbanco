import { Meteor } from 'meteor/meteor';
import { Tickets } from '../../../../../lib/collections/ticket.js';

import './ticket-claim.html';


Template.ticketClaim.helpers({
  tickets(){
    return Tickets.find({});
  }
});
