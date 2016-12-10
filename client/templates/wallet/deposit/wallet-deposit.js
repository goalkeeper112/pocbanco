import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Deposits } from '../../../../lib/collections/deposit.js';
import './wallet-deposit.html';

Template.walletDeposit.helpers({
  deposits(){
    return Deposits.find({});
  },

  isAdmin: () => {
    if(Meteor.user().roles.__global_roles__[0] === "admin"){
      return true
    }else{
      return false;
    }
  }
});

Template.walletDeposit.events({
  'click #createDeposit': () => {
    let params = {
        account: parseInt(document.getElementById('account').value),
        amount: parseInt(document.getElementById('amount').value),
        reference: parseInt(document.getElementById('reference').value)
    };

    Meteor.call('createDeposit', params, (err, result) => {
      if(err){
        throw err;
      }else {
        return alert("Deposito: " + result);
      }
    })
  }
})
