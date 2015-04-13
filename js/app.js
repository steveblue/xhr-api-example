var showLogin = function(){
  document.getElementById('login-form').style.display='block';
  document.getElementById('signup-form').style.display='none';
  document.getElementById('welcome').style.display='none';
  document.getElementById('logout').style.display='none';
  if(document.body.classList.contains('welcome-page')){
    document.body.classList.remove('welcome-page');
  }
};

var showHome = function(){
  document.getElementById('login-form').style.display='none';
  document.getElementById('signup-form').style.display='none';
  document.getElementById('welcome').style.display='block';
  document.getElementById('logout').style.display='block';
  document.body.classList.toggle('welcome-page');
};


var showSignup = function(){
  document.getElementById('login-form').style.display='none';
  document.getElementById('signup-form').style.display='block';
  document.getElementById('welcome').style.display='none';
  document.getElementById('logout').style.display='none';
  if(document.body.classList.contains('welcome-page')){
    document.body.classList.remove('welcome-page');
  }
};

var signup = function(){

  var that = this;

  this.currentUser = {};
  this.xhr = new xhrHandler();



  this.createUser = function(user){

    this.xhr.request('signup','POST',user).then(function(res){
      that.currentUser = res;
      showLogin();
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
document.getElementById('sf-link').addEventListener('mousedown',showLogin);




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
        showHome();
        document.getElementById('lf-username').value = "";
        document.getElementById('lf-password').value = "";
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
document.getElementById('lf-link').addEventListener('mousedown',showSignup);



var logoutButton = document.getElementById('logout');
if(logoutButton){
  logoutButton.addEventListener("mousedown",function(ev){
      var xhr = new xhrHandler();
      xhr.request('logout','GET').then(function(res){
        showLogin();
      });
    });
}


var xhr = new xhrHandler();
xhr.request('user','GET').then(function(res){
  console.log(res);
});


showLogin();
