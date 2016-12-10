import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';


import './wallet-send.html';

Template.walletSend.onCreated(() => {
  Session.set('balance', Meteor.user().wallet.balance.vef.total);
})

Template.walletSend.helpers({
  address: () => {
    return Meteor.user()._id;
  },

  balance: () => {
    setInterval(() => {
      Session.set("balance", Meteor.user().wallet.balance.vef.total);
      return Session.get("balance");
    }, 10000);
    return Session.get("balance");
  }
});

qrScanner.on('scan', (err, message) => {
  if(message){
    document.getElementById('address').value = message;
    $("#myModal").modal('hide');
  }
})

Template.walletSend.events({

  'click #sendMoney': () => {
    let params = {
      address: document.getElementById('address').value,
      //sendID: document.getElementById('sendID').value,
      amount: parseInt(document.getElementById('amount').value)
    }

    Meteor.call('sendMoney', params, (err, data) => {
      if(err){
        throw err;
      }else if(data){
        Session.set("balance", parseInt(Session.get("balance")) - params.amount)
        return alert("Envio exitoso");
      }
    });
  }
})
