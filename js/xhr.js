var xhrHandler = function(){

   this.request = function(path,verb,options){

    return new Promise(function(resolve,reject){

      var xhr = new XMLHttpRequest();
      var params = {};
      var hasParams = false;

      xhr.open(verb, "http://localhost:5555/api/"+path, true);
      xhr.setRequestHeader("Content-Type", "application/json");


      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          // JSON.parse does not evaluate the attacker's scripts.
          if(xhr.status === 401){
            resp = xhr.responseText;
            resolve(resp);
          }
          if (xhr.status === 200) {
            try{
              var resp = JSON.parse(xhr.responseText);
            }
            catch(error){
              resp = xhr.responseText;
            }
            resolve(resp);
          }
          else{
            resolve(xhr);
          }
        }
      };

      // Handle network errors
      xhr.onerror = function() {
        reject(Error("Network Error"));
      };


      if(options !== undefined && options.constructor.name === 'Object'){
        params = {};
        for (var property in options) {
          if (options.hasOwnProperty(property)) {
            params[property] = options[property];
            hasParams = true;
          }
        }
      }

      if(hasParams === true){
        xhr.send(JSON.stringify(params));
      }
      else{
        xhr.send();
      }

    });

  };

};


window.request = xhrHandler.request;
