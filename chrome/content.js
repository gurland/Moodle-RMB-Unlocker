;(function() {
  function script() {
    setInterval(() => {
      const $ = window.$;

      var events = $._data(document.getElementsByTagName('body')[0], "events");
      var maliciousEvents = [...events.keydown, ...events.contextmenu];
      maliciousEvents.forEach(maliciousEvent => {
        maliciousEvent.handler = $.noop;
      }, 500);
    })
  }

  function inject(fn) {
    const script = document.createElement('script')
    script.text = `(${fn.toString()})();`
    document.documentElement.appendChild(script)
  }

  inject(script)
})()
