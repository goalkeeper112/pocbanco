import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Withdrawals } from '../../../../lib/collections/withdrawal.js';
import './wallet-withdrawal.html';

Template.walletWithdrawal.helpers({
  deposits(){
    return Withdrawals.find();
  }
});

Template.walletWithdrawal.events({
  'click #createWithdrawal': () => {
    let params = {
        account: parseInt(document.getElementById('account').value),
        holder: document.getElementById('holder').value,
        amount: parseInt(document.getElementById('amount').value),
        identification: parseInt(document.getElementById('identification').value)
    };

    Meteor.call('createWithdrawal', params, (err, result) => {
      if(err){
        throw err;
      }else {
        return alert("Retiro: " + result);
      }
    })
  }
})
