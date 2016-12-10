import { Meteor } from 'meteor/meteor';
import { Tickets } from '../lib/collections/ticket.js';
import { Deposits } from '../lib/collections/deposit.js';
import { Withdrawals } from '../lib/collections/withdrawal.js';

Meteor.startup(() => {
  Meteor.publish('wallet-user', function() {
    if(this.userId){
      return Meteor.users.find({
          _id: this.userId
      }, {
          fields: {
              'wallet': 1
          }
      });
    }
  });

  Meteor.publish('myTickets', function(userId) {
    return Tickets.find({}, {userId: userId});
  });

  Meteor.publish('myTicket', function(ticket) {
    return Tickets.find({_id: ticket}, {});
  });

  Meteor.publish('myDeposits', function(userId) {
    if(Meteor.users.findOne({_id: userId}).emails[0].address === "admin@admin.com"){
      return Deposits.find({}, {});
    }else {
      return Deposits.find({}, {userId: userId});
    }
  });

  Meteor.publish('myDeposit', function(deposit) {
    return Deposits.find({_id: deposit}, {});
  });

  Meteor.publish('myWithdrawals', function(userId) {
    return Withdrawals.find({}, {userId: userId});
  });

  Meteor.publish('myWitdrawal', function(withdrawal) {
    return Withdrawals.find({_id: withdrawal}, {});
  });
});
