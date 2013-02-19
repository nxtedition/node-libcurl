// Generated by ToffeeScript 1.4.0
(function() {
  var Curl, m, p;

  try {
    Curl = require(__dirname + '/../build/Release/node-curl').Curl;
  } catch (e) {
    Curl = require(__dirname + '/../build/default/node-curl').Curl;
  }

  Curl.prototype.setopt_user_ = function(option_id, value) {
    return this.options[option_id] = value;
  };

  Curl.prototype.setopt = function(ooption, value) {
    var option, option_id;
    option = ooption.toUpperCase();
    if ((option_id = Curl.user_options[option]) != null) {
      this.setopt_user_(option_id, value);
    } else if ((option_id = Curl.slist_options[option]) != null) {
      this.setopt_slist_(option_id, value);
    } else if ((option_id = Curl.integer_options[option]) != null) {
      this.setopt_int_(option_id, value >> 0);
    } else if ((option_id = Curl.string_options[option]) != null) {
      this.setopt_str_(option_id, value.toString());
    } else {
      throw new Error("unsupported option " + option);
    }
    return this;
  };

  Curl.prototype.getinfo = function(oinfo) {
    var info, info_id;
    info = oinfo.toUpperCase();
    if ((info_id = Curl.slist_infos[info]) != null) {
      return this.getinfo_slist_(info_id);
    } else if ((info_id = Curl.integer_infos[info]) != null) {
      return this.getinfo_int_(info_id);
    } else if ((info_id = Curl.string_infos[info]) != null) {
      return this.getinfo_str_(info_id);
    } else if ((info_id = Curl.double_infos[info]) != null) {
      return this.getinfo_double_(info_id);
    } else {
      throw new Error("unsupported info " + oinfo);
    }
  };

  Curl.user_options = {
    RAW: 'RAW',
    DEBUG: 'DEBUG'
  };

  Curl.prototype.on = function(event, callback) {
    switch (event) {
      case 'data':
        this.on_write = callback;
        break;
      case 'error':
        this.on_error = callback;
        break;
      case 'end':
        this.on_end = callback;
        break;
      default:
        throw new Error("invalid event type " + event);
    }
    return this;
  };

  Curl.prototype.perform = function() {
    this.perform_();
    Curl.process();
    return this;
  };

  m = 0;

  p = console.log;

  Curl.process = function() {
    var once;
    if (Curl.in_process) {
      return;
    }
    return (once = function() {
      var n, w;
      n = Curl.process_();
      if (n > 0) {
        Curl.in_process = true;
        if (n > 8192 && m < 10) {
          ++m;
          return process.nextTick(once);
        } else {
          m = 0;
          w = (8192 - n) * 80 / 8192;
          if (w < 0) {
            w = 0;
          }
          return setTimeout(once, w);
        }
      } else {
        return Curl.in_process = false;
      }
    })();
  };

  module.exports = Curl;

}).call(this);