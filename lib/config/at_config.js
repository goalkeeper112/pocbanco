import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/kadira:flow-router';

T9n.setLanguage("es")

AccountsTemplates.configureRoute('signIn', {
  redirect: '/wallet/operations',
});

AccountsTemplates.configure({
  // Behavior
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: false,
  lowercaseUsername: false,
  focusFirstInput: true,

  // Appearance
  showAddRemoveServices: false,
  showForgotPasswordLink: false,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: false,

  // Client-side Validation
  continuousValidation: false,
  negativeFeedback: false,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,

  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',

  // Redirects
  homeRoutePath: '/',
  redirectTimeout: 1000,

  // Hooks
  //onLogoutHook: myLogoutFunc,
  //onSubmitHook: mySubmitFunc,
  //preSignUpHook: myPreSubmitFunc,
  postSignUpHook: (userId, info) => {
    console.log(userId, info)

    if(info.email === "admin@admin.com"){
      Roles.addUsersToRoles(userId, 'admin', Roles.GLOBAL_GROUP);
    } else{
      Roles.addUsersToRoles(userId, 'user', Roles.GLOBAL_GROUP);
    }
    Meteor.call('createWallet', userId);
    FlowRouter.go('/wallet/operations');
  },

  // Texts
  /*texts: {
    button: {
        signUp: "Register Now!"
    },
    socialSignUp: "Register",
    socialIcons: {
        "meteor-developer": "fa fa-rocket"
    },
    title: {
        forgotPwd: "Recover Your Password"
    },
  },*/
});
