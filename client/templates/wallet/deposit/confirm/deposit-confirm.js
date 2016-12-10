import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Deposits } from '../../../../../lib/collections/deposit.js'
import './deposit-confirm.html';

Template.depositConfirm.helpers({
  deposits(){
    return Deposits.find({}, {});
  },

  isAdmin: () => {
    if(Meteor.user().roles.__global_roles__[0] === "admin"){
      return true
    }else{
      return false;
    }
  }
});

Template.depositConfirm.events({
  'click #confirm': () => {
    Meteor.call('confirmDeposit', Session.get("id"), (err, result) => {
      if(err){
        throw err;
      }else{
        return alert(result);
      }
    });
  }
});
