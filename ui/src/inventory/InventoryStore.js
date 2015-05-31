import request from 'superagent';
import Reflux from 'reflux';

function stripQuotes(str) {
  if (str.length === 0) {
    return str;
  }
  if (str.charAt(0) === "\"" && str.charAt(str.length - 1)) {
    return str.substring(1, str.length - 1);
  }
  return str;
}


function byName(a, b) {
  if (a.name === b.name) {
    return 0;
  }
  return a.name < b.name ? -1 : 1;
};


const re = /([^:]+):(.+)/;

export default Reflux.createStore({

  // Initial setup
  init: function() {
    request
      .get('/jimix/api/inventory')
      .end((err, res) => {
        let inventory = res.body;
        let domainMap = {};
        inventory.mbeans.forEach(function(mbean) {
          var match = re.exec(mbean.objectName);
          var domain = match[1];
          var name = match[2];
          mbean.name = name;
          var namePart = null;
          var typePart = null;
          var scopePart = null;
          var additionalKeys = 0;
          name.split(",").forEach(function(item) {
            var parts = item.split("=");
            var key = parts[0].toLowerCase();
            if (key === "type") {
              typePart = parts[1];
              return;
            }
            if (key === "name") {
              namePart = parts[1];
              return;
            }
            if (key === "scope") {
              scopePart = parts[1];
              return;
            }
            additionalKeys++;
          });
          if (additionalKeys <= 0) {
            if (typePart) {
              name = stripQuotes(typePart)
            }
            if (namePart) {
              if(typePart) {
                name += " - " + stripQuotes(namePart);
              } else {
                name = stripQuotes(namePart);
              }
            }
            if (scopePart) {
              name += " (" + stripQuotes(scopePart) + ")";
            }
            mbean.name = name;
          }
          domainMap[domain] = domainMap[domain] || {name: stripQuotes(domain), mbeans: []};
          domainMap[domain].mbeans.push(mbean);
        });
        var domains = [];
        for (var domain in domainMap) {
          domainMap[domain].expanded = true;
          domainMap[domain].mbeans.sort(byName);
          domains.push(domainMap[domain]);
        }
        domains.sort(byName);
        inventory.domains = domains;
        this.trigger(inventory);
      });

  }


});