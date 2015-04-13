var signup = function(){

  var that = this;

  this.currentUser = {};
  this.xhr = new xhrHandler();



  this.createUser = function(user){

    this.xhr.request('signup','POST',user).then(function(res){
      that.currentUser = res;
      window.location = "/fewd-xhr/index.html";
    });

  };

  this.init = function(){
    console.log('signup form is online.');
    var submit = document.getElementById('sf-submit');
    submit.addEventListener("mousedown",function(ev){

      ev.preventDefault();

      var user = {
        email: document.getElementById('sf-email').value,
        firstName: document.getElementById('sf-fname').value,
        lastName: document.getElementById('sf-lname').value,
        username: document.getElementById('sf-username').value,
        password: document.getElementById('sf-password').value
      }

      that.createUser(user);


      return false;
    });

  };

};


var signupForm = document.getElementById('signup-form');
if(signupForm){
  signup.call(signupForm);
  signupForm.init();
}



var login = function(){

  var that = this;

  this.currentUser = {};




  this.init = function(){
    console.log('login form is online.');
    var that = this;


    var submit = document.getElementById('lf-submit');
    submit.addEventListener("mousedown",function(ev){
      var xhr = new xhrHandler();
      ev.preventDefault();

      var user = {
        username: document.getElementById('lf-username').value,
        password: document.getElementById('lf-password').value
      }


      xhr.request('login','POST',user).then(function(res){
        console.log(res);
        window.location = "/fewd-xhr/welcome.html";
      });


      return false;
    });

  };

};

var loginForm = document.getElementById('login-form');
if(loginForm){
  login.call(loginForm);
  loginForm.init();
}



var logoutButton = document.getElementById('logout');
if(logoutButton){
  logoutButton.addEventListener("mousedown",function(ev){
      var xhr = new xhrHandler();
      xhr.request('logout','GET').then(function(res){
        window.location = "/fewd-xhr/index.html";
      });
    });
}


var xhr = new xhrHandler();
xhr.request('user','GET').then(function(res){
  console.log(res);
});
