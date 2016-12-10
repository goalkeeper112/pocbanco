import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './templates/index.html';
import './templates/users/login.html';
import './templates/wallet/wallet-operations.html';
import './templates/wallet/send/wallet-send.html';
import './templates/wallet/receive/wallet-receive.html';
import './templates/wallet/ticket/tickets.html';
import './templates/wallet/ticket/new/new-ticket.html';
import './templates/wallet/ticket/ticket/view-ticket.html';
import './templates/wallet/check/wallet-check.html';
import './templates/wallet/deposit/wallet-deposit.html';
import './templates/wallet/deposit/confirm/deposit-confirm.html';
import './templates/wallet/withdrawal/wallet-withdrawal.html';
import './templates/wallet/withdrawal/confirm/withdrawal-confirm.html';

FlowRouter.subscriptions = function() {
  this.register('wallet-user', Meteor.subscribe('wallet-user'));
};

FlowRouter.route('/', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
            FlowRouter.go('/wallet/operations');
        }else {
          BlazeLayout.render("index");
        }
      }, 1000);
    }
});

FlowRouter.route('/users/login', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
          FlowRouter.go('/');
        }else{
          BlazeLayout.render("login");
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/operations', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
          BlazeLayout.render("walletOperations");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/receive', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
          BlazeLayout.render("walletReceive");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/send', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
          BlazeLayout.render("walletSend");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/tickets', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
          Meteor.subscribe('myTickets', Meteor.userId())
          BlazeLayout.render("tickets");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/tickets/new', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
          BlazeLayout.render("newTicket");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/tickets/check', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
          BlazeLayout.render("ticketCheck");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/tickets/claim/:_id', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
          Meteor.subscribe("myTicket", params._id);
          BlazeLayout.render("ticketClaim");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/tickets/view/:_id', {
    action: function(params) {
      Meteor.subscribe('myTicket', params._id);
      setTimeout(() => {
        if(Meteor.user()){
          BlazeLayout.render("viewTicket");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/check', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
          BlazeLayout.render("walletCheck");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/deposit', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
          Meteor.subscribe('myDeposits', Meteor.userId());
          BlazeLayout.render("walletDeposit");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/deposits/view/:_id', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user().roles.__global_roles__[0] === "admin"){
          Meteor.subscribe('myDeposit', params._id);
          Session.set("id", params._id);
          BlazeLayout.render("depositConfirm");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});

FlowRouter.route('/wallet/withdrawal', {
    action: function(params) {
      setTimeout(() => {
        if(Meteor.user()){
          Meteor.subscribe('myWithdrawals', Meteor.userId());
          BlazeLayout.render("walletWithdrawal");
        }else{
          window.location = '/';
        }
      }, 1000);
    }
});
