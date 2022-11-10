(function(global) {
  var is_worker = !this.document;
  var script_path = is_worker ? null : (function() {
      // append random number and time to ID
      var id = (Math.random()+''+new Date()).substring(2);
      document.write('<script id="wts' + id + '"></script>');
      return document.getElementById('wts' + id).previousSibling.src;
  })();
  function onmessageParent(e) {
      // event handler for parent -> worker messages
      console.log("In onmessageParent");
      console.log(e);
  }
  function onmessageWorker(e) {
      // event handler for worker -> parent messages
      console.log("In onmessageWorker");
      console.log(e);
  }
  function new_worker() {
      var w = new Worker(script_path);
      w.addEventListener('message', onmessageWorker, false);
      return w;
  }

  if (is_worker){
    console.log("is_worker", is_worker);
    global.addEventListener('message', onmessageParent, false)
    postMessage("From worker...")
  }
  else{
    console.log("is_worker", is_worker);
    const worker = new_worker()
    worker.postMessage("From parent...")
  }

  // put the rest of your library here
  // to spawn a worker, use new_worker()
})(this);
