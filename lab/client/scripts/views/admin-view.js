'use strict';

var app = app || {};

(function (module) {
  const adminView = {};

  adminView.initAdminPage = function (ctx, next) {
    $('.nav-menu').slideUp(350);
    $('.admin-view').show();

    $('#admin-form').on('submit', function(event) {
      event.preventDefault();
      let token = event.target.passphrase.value;

      // COMMENT-DONE: Is the token cleared out of local storage? Do you agree or disagree with this structure?
      // Yes, this get request is accompanied by the user entered passcode, and the server checks if it is the same as the token, which is being stored as an environment variable off of the client. It then calls the verify function below to check if login is true or false to show/hide main content.
      $.get(`${__API_URL__}/api/v1/admin`, {token})
        .then(res => {
          localStorage.token = true;
          page('/');
        })
        .catch(() => page('/'));
    })
  };

  adminView.verify = function(ctx, next) {
    if(!localStorage.token) $('.admin').addClass('admin-only');
    else $('.admin').show();
    next();
  }

  module.adminView = adminView;
})(app)