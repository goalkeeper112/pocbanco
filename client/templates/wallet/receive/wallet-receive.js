import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './wallet-receive.html';

Template.walletReceive.helpers({
  address: () => {
    return Meteor.user()._id;
  },
  balance() {
    setInterval(() => {
      Session.set("balance", Meteor.user().wallet.balance.vef.total);
      return Session.get("balance")
    }, 10000);
    return Session.get("balance");
  }
});
