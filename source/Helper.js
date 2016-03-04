
function Helper() {}

  Helper.app = "Trackee";

  Helper.vers = "0.0.2";

  // LocalStorage
  Helper.setItem = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  };

  Helper.getItem = function(key) {
    return JSON.parse(localStorage.getItem(key));
  };

  // Date manipulation
  Helper.getNewDate = function(today, shift) {
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + shift);
  };

  Helper.getDateFormat = function(d) {
    //~ var fmt = new enyo.g11n.DateFmt({
      //~ date: "short",
      //~ // locale: new enyo.g11n.Locale("en_us")
      //~ locale: enyo.g11n.currentLocale()
    //~ });
    //~ return fmt.format(d);
    if (enyo.g11n.currentLocale().getLocale().lastIndexOf("de", 0) === 0) {
      return  ((d.getDate()<10) ? '0'+d.getDate() : d.getDate()) + "." + (((d.getMonth()+1)<10) ? '0'+(d.getMonth()+1) : (d.getMonth()+1)) + "." + d.getFullYear();
    } else {
      return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
    }
  };

  Helper.makeDate = function(da) { // Localstorage gives us string intead of dates
    for (i in da) {
      da[i] = new Date(da[i]);
    }
    return da;
  };

  Helper.sortDates = function(da) {
    return da.sort(function(a, b){return b-a});
  };

  Helper.getButtonName = function(today, shift) {
    if (shift == 0) {
      return $L("Today");
    } else if (shift == -1) {
      return $L("Yesterday");
    } else if (shift <= -2) {
      var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + shift);
      if (shift >= -6) {
        var Wochentag = new Array($L("Sunday"), $L("Monday"), $L("Tuesday"), $L("Wednesday"), $L("Thursday"),$L("Friday"), $L("Saturday"));
        return Wochentag[d.getDay()];
      } else {
        return this.getDateFormat(d);
      };
    };
  };


/* ### Data model ###

{
  "data": [
    {
      "title": "Workout",
      "description": "Wie oft ich mein Workout gemacht habe",
      "color": "#558b2f",
      "dates": [list of date objects newest first]
    },
    {
      "title": "Blumen gießen",
      "description": "Wie oft ich meine Blumen gegossen habe",
      "color": "#558b2f",
      "dates": [list of date objects newest first]
    }
  ]
}

*/
