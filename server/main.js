import {
    Meteor
} from 'meteor/meteor';
import {
    check
} from 'meteor/check';

import {
    Tickets
} from '../lib/collections/ticket.js';
import {
    Deposits
} from '../lib/collections/deposit.js';
import {
    Withdrawals
} from '../lib/collections/withdrawal.js';

const bcrypt = require('bcrypt');

import Future from 'fibers/future';
//import Async from 'meteor/async';

Meteor.startup(() => {

    Meteor.methods({
        createWallet: (userId) => {
            console.log(userId);

            Meteor.users.update(userId, {
                $set: {
                    wallet: {
                        balance: {
                            vef: {
                                total: 0
                            }
                        },
                        transactions: []
                    }
                }
            }, (err, data, user) => {
                if (err) {
                    throw err
                }

                if (data) {
                    Meteor.publish('wallet-user', function() {
                        if (userId) {
                            return Meteor.users.find({
                                _id: userId
                            }, {
                                fields: {
                                    'wallet': 1
                                }
                            });
                        }
                    });
                };
            });
        },

        sendMoney: (params) => {
            check(params.address, String);
            check(params.amount, Number);


            if (Meteor.user().wallet.balance.vef.total > params.amount) {
                let userFrom = Meteor.users.update({
                    _id: Meteor.userId()
                }, {
                    $set: {
                        wallet: {
                            balance: {
                                vef: {
                                    total: Meteor.user().wallet.balance.vef.total - params.amount
                                }
                            }
                        }
                    }
                });

                let userTo = Meteor.users.update({
                    _id: params.address
                }, {
                    $set: {
                        wallet: {
                            balance: {
                                vef: {
                                    total: Meteor.users.findOne({_id: params.address}).wallet.balance.vef.total + params.amount
                                }
                            }
                        }
                    }
                }, (err, data) => {
                  if(err){
                    throw err;
                  }
                });

                return true;
            } else {
                return "Saldo insuficiente";
            }
        },

        createDeposit: (params, cb) => {
            check(params.account, Number);
            check(params.amount, Number);
            check(params.reference, Number);

            //console.log(Deposits)

            let depositID = Deposits.insert({
                account: params.account,
                amount: params.amount,
                reference: params.reference,
                userId: Meteor.userId(),
                confirmed: false
            });

            return depositID
        },

        confirmDeposit: (depositID, cb) => {
            check(depositID, String);

            Deposits.update({
                _id: depositID
            }, {
                $set: {
                    confirmed: true
                }
            });

            Meteor.users.update({
                _id: Deposits.findOne({ _id: depositID }).userId
            }, {
                $set: {
                    wallet: {
                        balance: {
                            vef: {
                                total: Meteor.users.findOne({_id: Deposits.findOne({ _id: depositID }).userId}).wallet.balance.vef.total + Deposits.findOne({_id: depositID}).amount
                            }
                        }
                    }
                }
            });

            return true;
        },

        createWithdrawal: (params) => {
            check(params.holder, String);
            check(params.identification, String);
            check(params.account, Number);
            check(params.amount, Number);

            let withdrawalID = Withdrawals.insert({
                holder: params.holder,
                identification: params.identification,
                account: params.account,
                amount: params.amount,
                userId: Meteor.userId(),
                confirmed: false
            });

            return withdrawalID;
        },

        confirmWithdrawal: (withdrawalID, cb) => {
            check(withdrawalID, String);

            Withdrawals.update({
                _id: withdrawalID
            }, {
                $set: {
                    confirmed: true
                }
            });

            return true;
        },

        createTicket: (params, cb) => {
            check(params.userId, String);
            check(params.amount, Number);
            check(params.password, String);
            let ticketID, crypt;

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(params.password, salt, (err, hash) => {
                    crypt = hash;
                });
            });

            ticketID = Tickets.insert({
                userId: params.userId,
                amount: params.amount,
                password: crypt,
                dateExpire: params.dateExpire,
                userTo: null
            });

            return ticketID;
        },

        useTicket: () => {

        },

        destroyTicket: () => {

        }
    });
});
