enyo.setLogLevel(0); // The default log level is 99. enyo.log/this.log will output if the level is 20 or above, enyo.warn at 10, and enyo.error at 0.

enyo.kind({
  name: "Trackee",
  kind: "FittableRows",
  fit: true,
  classes: "trackee-background",
  today: Helper.getNewDate(new Date(), 0),
  shift: 0,
  current: undefined,
  count: undefined,
  data: [],
  olddata: [],
  components:[
    {name: "main", kind: "FittableRows", fit: true, /* ondragover: "DragFinish",*/ components: [
      {name: "settings", kind: "onyx.Drawer", open: false, classes: "settings", components: [
        {kind: "FittableColumns", fit: true, style: "margin: 0 0 .5rem; text-align: center;", components: [
          {kind: "FittableRows", classes: "icon-div", style: "float: left;", ontap: "infoTapped", components: [
            {kind: "onyx.Icon", src: "assets/info.png", classes:"icon"},
            {content: "Info", classes: "icon-text"}
          ]},
          {kind: "FittableRows", classes: "icon-div", ontap: "newTapped", components: [
            {kind: "onyx.Icon", src: "assets/add.png", classes:"icon"},
            {content: $L("Add new"), classes: "icon-text"}
          ]},
          {kind: "FittableRows", classes: "icon-div", style: "float: right;", ontap: "editTapped", components: [
            {kind: "onyx.Icon", src: "assets/edit.png", classes:"icon"},
            {content: $L("Edit"), classes: "icon-text"}
          ]}
        ]}
      ]},
      {name: "undoDrawer", kind: "onyx.Drawer", open: false, classes: "settings", ontap: "undodo", components: [
        {kind: "FittableColumns", fit: true, style: "text-align: center; padding: .5rem;", components: [
          {kind: "onyx.Icon", src: "assets/undo.png", style: "height: 2.26rem; margin-right: .5rem;"},
          {name: "undoText", style: "vertical-align: middle;" }
        ]}
      ]},
      {name:"arranger", kind: "enyo.Panels", arrangerKind: "LeftRightArranger", margin: 0, fit: true, realtimeFit: true,
        /*draggable: false,*/ onTransitionFinish: "currentPanel",},
      {kind: "FittableColumns", classes: "onyx-toolbar-inline button-fittable", style: "z-index: 120;", components: [
        {kind: "michote.FlatButton", content: "-", classes: "flat left", ontap: "addminus"},
        {name: "datebutton", kind: "michote.FlatButton", content: $L("Today"), classes: "flat middle", ontap: "adddo"},
        {name: "plus", kind: "michote.FlatButton", content: "+", disabled: true,classes: "flat right",  ontap: "addplus"}
      ]},
      {name: "editTracker", kind: "onyx.Drawer", open: false, classes: "settings", components: [
        {kind: "FittableRows", fit: true, components: [
          {kind: "onyx.Groupbox", components:[
            {kind: "onyx.GroupboxHeader", content: $L("title")},
            {kind: "onyx.InputDecorator", components: [
              {name: "titleInput", kind: "onyx.Input", style: "width: 100%; color: white;",
                placeholder: $L("Enter title here"), oninput: "titleChanged"}
            ]},
          ]},
          {kind: "onyx.Groupbox", components:[
            {kind: "onyx.GroupboxHeader", content: $L("description")},
            {kind: "onyx.InputDecorator", components: [
              {name: "descriptionInput", kind: "onyx.Input", style: "width: 100%; color: white;",
                placeholder: $L("Enter description here"), oninput: "descriptionChanged"}
            ]}
          ]},
          {kind: "onyx.Groupbox", components:[
            {kind: "onyx.GroupboxHeader", content: $L("color")},
            {name: "colorGroup", kind: "Group", onActivate:"colorSelected", classes:"group", style: "padding: 0.5rem 1.25rem 2rem", components: [
              {name: "#558b2f", kind: "michote.FlatButton", classes: "circle", color: "#558b2f", ontap: "circleTap", active: true},
              {name: "#3F51B5", kind: "michote.FlatButton", classes: "circle", color: "#3F51B5", ontap: "circleTap"},
              {name: "#D50000", kind: "michote.FlatButton", classes: "circle", color: "#D50000", ontap: "circleTap"},
              {name: "#087099", kind: "michote.FlatButton", classes: "circle", color: "#087099", ontap: "circleTap"},
              {name: "#E65100", kind: "michote.FlatButton", classes: "circle", color: "#E65100", ontap: "circleTap"},
              {name: "#AD1457", kind: "michote.FlatButton", classes: "circle", color: "#AD1457", ontap: "circleTap"}
            ]}
          ]},
          {style: "width: 100%;", components: [
            {name: "editbutton", kind: "michote.FlatButton" , classes: "button-drawer", style: "border-width: .0625rem .0625rem 0 0;",
              content: $L("Save Tracker"), ontap: "saveTracker"},
            {name: "deletebutton", kind: "michote.FlatButton" , classes: "button-drawer", color: "#C51616",
              content: $L("Discard Tracker"), ontap: "confirmPopup"}
          ]},
        ]}
      ]},
      {name: "about", kind: "onyx.Drawer", open: false, classes: "settings", components: [
        {kind: "onyx.Icon", src: "assets/clear.png", classes:"icon", style: "position: absolute; right: .25rem; z-index: 20;", ontap: "closeAbout"},
        {kind: "FittableRows", fit: true, style: "margin:.5rem; text-align: center;", components: [
          {content: '<span style="color: #dcd427; font-weight: bold;">'+Helper.app+' &ndash; v. '+Helper.vers +'</span><br>'
            + '&copy; 2016: <a href="mailto:reischuck.micha@googlemail.com">Micha Reischuck</a>, '
            + '(<a href="http://de.m.wikipedia.org/wiki/MIT-Lizenz#Lizenztext">MIT</a> ' + $L('License')
            + ')<br><br>' + $L("This is just a hobby-project. If you find any bugs or have feature requests, please drop me a mail."), allowHtml: true}
        ]}
      ]}
    ]},
    {name: "popup", classes: "trackee-popup", kind: "onyx.Popup", centered: true, modal: true, scrim: true, floating: true,
      onHide: "closePopup", components: [
      {name: "popuptext", content: $L("Discard this Tracker and all its data?"), style: "font-size: 1.25rem; width: 18rem; padding: 1rem;"},
      {kind: "michote.FlatButton", content: $L("Back"), classes: "button-popup", color: "#F1F1F1", ontap: "closePopup"},
      {name: "popupbutton", kind: "michote.FlatButton", content: $L("Proceed"), classes: "button-popup", color: "#F1F1F1", ontap: "removeTracker"}
    ]},
    {name: "popup2", classes: "trackee-popup", kind: "onyx.Popup", centered: true, modal: true, scrim: true, floating: true,
      onHide: "closePopup", components: [
      {content: $L("Please save your Tracker first"), style: "font-size: 1.25rem;width: 14rem; padding: 1rem;"},
      {kind: "michote.FlatButton", content: $L("Back"), classes: "button-popup", color: "#F1F1F1", style: "width: 16rem;", ontap: "closePopup"},
    ]}
  ],

  create: function () {
    this.inherited(arguments);
    enyo.asyncMethod(this, "getSettings");
  },

  getSettings: function () {
    if (Helper.getItem('data').length) {
      this.data = Helper.getItem('data');
      this.showData();
    } else {
      this.getStarted();
    }
  },

  // ### navigation ###
  openMenu: function() {
    this.log();
    if (!this.$.editTracker.open) {
      this.$.settings.setOpen(true);
    } else {
      this.pleaseSave();
    }
  },

  vDragFinish: function(sender, event) {
    if (+event.dy > 60) {
      this.openMenu();
    }
    if (+event.dy < -60) {
      this.$.settings.setOpen(false);
    }
  },

  //~ hDragFinish: function(sender, event) {
    //~ if (this.$.editTracker.getOpen()) {
      //~ this.pleaseSave();
    //~ } else if (this.$.undoDrawer.getOpen()) {
        //~ return;
    //~ } else {
      //~ if (+event.dx > 120) {
        //~ if (this.current === 0) {
          //~ this.current = this.data.length-1;
        //~ } else  {
          //~ this.current--;
          //~ this.$.arranger.setIndex(this.current);
        //~ }
      //~ }
      //~ if (+event.dx < -120) {
        //~ if (this.current === this.data.length-1) {
          //~ this.current = 0;
        //~ } else  {
          //~ this.current++;
          //~ this.$.arranger.setIndex(this.current);
        //~ }
      //~ }
    //~ }
  //~ },

  //~ currentPanel: function(sender, event) {
    //~ if (typeof this.current !== "undefined") {
      //~ this.current = event.toIndex;
      //~ this.log(this.current, "toIndex");
    //~ }
  //~ },

  closeAll: function() {
    this.log();
    this.$.settings.setOpen(false);
    this.$.editTracker.setOpen(false);
    this.$.popup.hide();
    if (!this.$.arranger.draggable) {
      this.$.arranger.setDraggable(true);
    }
    this.clearEdit();
  },

  // ### About ###
  infoTapped: function() {
    this.$.settings.setOpen(false);
    this.$.about.setOpen(true);
  },

  closeAbout: function() {
    this.$.about.setOpen(false);
  },

  // ### DateAddButton ###
  addminus: function() {
    this.shift -= 1;
    this.setButtons();
  },

  addplus: function() {
    this.shift += 1;
    this.setButtons();
  },

  setButtons: function() {
    //~ this.log(this.shift);
    if (this.shift == 0) {
      this.$.plus.setDisabled(true);
    } else {
      this.$.plus.setDisabled(false);
    }
    this.$.datebutton.setContent(Helper.getButtonName(this.today, this.shift));
  },

  adddo: function() {
    this.current = this.$.arranger.getIndex();
    this.log(Helper.getDateFormat(Helper.getNewDate(this.today, this.shift)));
    if (!this.data[this.current]) {
      this.pleaseSave();
    } else {
      var d = this.data[this.current].dates
      for (i in d) {
        this.olddata.push(d[i]);
      };
      d.push(Helper.getNewDate(this.today, this.shift));
      d = Helper.sortDates(d);
      Helper.setItem('data', this.data);
      //~ this.log("sorted data: ", d);
      this.openUndo();
      this.calcStats(this.current);
    }
  },

  openUndo: function() {
    this.$.settings.setOpen(false);
    this.$.undoText.setContent(Helper.getButtonName(this.today, this.shift) + ": " + this.data[this.current].title + $L(" added. Tap to undo!"));
    this.$.undoDrawer.setOpen(true);
    this.$.datebutton.setDisabled(true);
    this.$.arranger.setDraggable(false);
    var c = enyo.bind(this, this.closeUndo);
    setTimeout(c, 3000);
  },

  closeUndo: function() {
    this.$.undoDrawer.setOpen(false);
    this.olddata = [];
    this.$.undoText.applyStyle("color", "white");
    this.$.arranger.setDraggable(true);
    this.$.datebutton.setDisabled(false);
  },

  undodo: function() {
    //~ this.log("olddata: ", this.olddata);
    this.$.undoText.setContent(Helper.getButtonName(this.today, this.shift) + ": " + this.data[this.current].title + $L(" removed!"));
    this.$.undoText.applyStyle("color", "red");
    this.data[this.current].dates = this.olddata;
    this.olddata = [];
    this.calcStats(this.current);
    Helper.setItem('data', this.data);
  },

  // ### show something ###
  getStarted: function() {
    this.log();
    var p = this.$.arranger;
    var c = p.createComponent(
      {kind: "FittableRows", style: "background: #558b2f;", components: [
        {kind: "onyx.Icon", src: "assets/ecke.png", classes:"icon", ontap: "openMenu", owner: this},
        {kind: "FittableRows", fit: true, components: [
          {kind: "onyx.Icon", src: "assets/pfeil.png", classes:"icon", style: "margin: 0 1rem 0 2rem", ontap: "openMenu", owner: this},
          {content: $L("Tap here to create your first Tracker"), classes: "trackee-text", style: "margin: -1rem 0 0 5rem"}
        ]},
      ]}
    );
    c.render();
  },

  showData: function() {
    this.$.arranger.destroyClientControls();
    this.count = undefined;
    this.log(this.data.length)
    for (i in this.data) {
      this.log(JSON.stringify(this.data[i]));
      this.addTracker(true);
      this.$["header_"+i].setContent(this.data[i].title);
      this.$["description_"+i].setContent(this.data[i].description);
      this.$["bg_"+i].applyStyle("background-color", this.data[i].color);
      if (typeof this.data[i].dates[0] === "string") {
        this.data[i].dates = Helper.makeDate(this.data[i].dates);
      }
    }
    this.$.arranger.render();
    this.$.arranger.reflow();
    this.$.arranger.setIndex(0);
    for (i in this.data) {
      this.calcStats(i, true);
    }
  },

  calcStats: function(current, versteckt) {
    var d = this.data[current].dates;
    this.log(JSON.stringify(d));
    var a = 0;
    for (i in d) {
      if (((this.today-d[i])/86400000) >= 7) { break; }
      a++;
    }
    this.$["trackee7_"+current].setContent("<b>"+ a + $L("x</b> in the last <b>7 days</b>"));
    var seven = Math.round(a*100/7);
    this.$["trackee7bar_"+current].setProgress(seven);
    this.$["trackee7perc_"+current].setContent(seven+"%");
    a = 0;
    for (j in d) {
      if (((this.today-d[j])/86400000) >= 30) { break; }
      a++;
    }
    this.$["trackee30_"+current].setContent("<b>"+ a + $L("x</b> in the last <b>30 days</b>"));
    var thirty = Math.round(a*100/30);
    this.$["trackee30bar_"+current].setProgress(thirty);
    this.$["trackee30perc_"+current].setContent(thirty+"%");
    var start = (typeof d[d.length-1] !== "undefined") ? Helper.getDateFormat(d[d.length-1]) : Helper.getDateFormat(this.today);;
    this.$["trackeeAll_"+current].setContent("<b>"+ d.length + $L("x</b> since <b>") + start + "</b>");
    var all = (this.today-d[d.length-1] >= 0) ? Math.round(d.length*100/(((this.today-d[d.length-1])/86400000)+1)) : 0;
    this.$["trackeeAllbar_"+current].setProgress(all);
    this.$["trackeeAllperc_"+current].setContent(all+"%");
    if (!versteckt) {
      this.$.arranger.setIndexDirect(current);
      this.$.arranger.setDraggable(true);
    }
  },

  // ### Tracker Menu ###
  newTapped: function() {
    this.$.settings.setOpen(false);
    this.$.arranger.setDraggable(false);
    this.$.popuptext.setContent($L("Discard this Tracker and all its data?"));
    if (this.$.editTracker.open) {
      this.confirmPopup();
    } else {
      this.$.editTracker.setOpen(true);
      this.$.deletebutton.setContent($L("Discard Tracker"));
      this.$.titleInput.focus()
      this.addTracker();
    }
  },

  editTapped: function() {
    this.current = this.$.arranger.getIndex();
    this.$.settings.setOpen(false);
    this.$.arranger.setDraggable(false);
    this.$.editTracker.setOpen(true);
    this.$.deletebutton.setContent($L("Delete Tracker"));
    this.$.popuptext.setContent($L("Permanently delete this Tracker and all its data?"));
    this.$.titleInput.setValue(this.data[this.current].title);
    this.$.descriptionInput.setValue(this.data[this.current].description);
    this.$.colorGroup.setActive(this.$[this.data[this.current].color]);
  },

  addTracker: function(versteckt) {
    var a = this.$.arranger;
    if (typeof this.current === "undefined") {
      a.destroyClientControls();
      this.current = 0;
      this.count = 0;
    } else {
      this.count++;
      this.current = this.count;
    };
    this.log("current: ", this.current, " - count: ", this.count);
    var c = a.createComponent(
      {name: "bg_" + this.count, style: "background: #558b2f;", /*ondragover: "hDragFinish",*/ owner: this, components: [
        {ondragover: "vDragFinish", owner: this, components: [
          {kind: "onyx.Icon", src: "assets/ecke.png", classes:"icon", style: "position: absolute;", ontap: "openMenu", owner: this},
          {name: "header_" + this.count, content: $L("new Tracker"), classes: "trackee-header", owner: this},
          {name: "description_" + this.count, content: $L("new description"), classes: "trackee-description", owner: this},
          {classes: "divider"}
        ]},
        //~ {kind: "enyo.Scroller", fit: true, components: [
          {classes: "trackee-content", fit: true, owner: this, components: [
              {tag: "br"},
            {name: "trackee7_" + this.count, content: "<b>"+ 0 + $L("x</b> in the last <b>7 days</b>"),
              classes: "trackee-caption", allowHtml: true, owner: this},
              {name: "trackee7bar_" + this.count, kind: "onyx.ProgressBar", showStripes: false, barClasses: "onyx-dark",
                owner: this, components: [
                {name: "trackee7perc_" + this.count, content: "0%", style: "float: right;", owner: this}
              ]},
              {tag: "br"},
            {name: "trackee30_" + this.count, content: "<b>"+ 0 + $L("x</b> in the last <b>7 days</b>"),
              classes: "trackee-caption", allowHtml: true, owner: this},
              {name: "trackee30bar_" + this.count, kind: "onyx.ProgressBar", showStripes: false, barClasses: "onyx-dark",
                owner: this, components: [
                {name: "trackee30perc_" + this.count, content: "0%", style: "float: right;", owner: this}
              ]},
              {tag: "br"},
            {name: "trackeeAll_" + this.count, content: "<b>"+ 0 + $L("x</b> since <b>")+ $L("Today") + "</b>",
              classes: "trackee-caption", allowHtml: true, owner: this},
              {name: "trackeeAllbar_" + this.count, kind: "onyx.ProgressBar", showStripes: false, barClasses: "onyx-dark",
                owner: this, components: [
                {name: "trackeeAllperc_" + this.count, content: "0%", style: "float: right;", owner: this}
              ]}
          ]}
        //~ ]}
      ]}
    );
    if (!versteckt) {
      c.render();
      a.reflow();
      a.setIndex(this.current);
    }
  },

  removeTracker: function() {
    this.closeAll();
    this.count--;
    this.current = this.$.arranger.getIndex();
    if (this.data[this.current]) { // delete
      this.log(this.data[this.current]);
      this.data.splice(this.current, 1);
      this.log(this.data.length);
      Helper.setItem('data', this.data);
      if (this.data.length === 0) {
        this.current = undefined;
        this.$["bg_"+this.current].destroy();
        this.getStarted();
      } else {
        this.current = 0
        this.showData();
      }
    } else { // discard
      this.$["bg_"+this.current].destroy();
    }
  },

  saveTracker: function() {
    this.current = this.$.arranger.getIndex();
    this.log();
    if (this.data[this.current]) { //change
      this.data[this.current].title = this.$.titleInput.getValue();
      this.data[this.current].description = this.$.descriptionInput.getValue();
      this.data[this.current].color = this.$.colorGroup.getActive().color;
    } else { // create
      this.data[this.current] = {title:this.$.titleInput.getValue(), description:this.$.descriptionInput.getValue(),
        color:this.$.colorGroup.getActive().color, dates:[]};
    }
    this.log(JSON.stringify(this.data));
    this.$.arranger.setDraggable(true);
    this.closeAll();
    Helper.setItem('data', this.data);
  },

  titleChanged: function(inSender) {
    //~ this.log(inSender.getValue());
    this.$["header_"+this.$.arranger.index].setContent(inSender.getValue());
  },

  descriptionChanged: function(inSender) {
    //~ this.log(inSender.getValue());
    this.$["description_"+this.$.arranger.index].setContent(inSender.getValue());
  },

  colorSelected: function(inSender, inEvent) {
    if (inEvent.originator.getActive() && (typeof this.current !== "undefined")) {
      this.log(inEvent.originator.color + " selected.");
      this.$["bg_"+this.$.arranger.index].applyStyle("background-color", inEvent.originator.color);
    }
  },

  confirmPopup: function() {
    //~ this.log();
    this.$.popup.show();
  },

  pleaseSave: function() {
    //~ this.log();
    this.$.popup2.show();
  },

  closePopup: function() {
    //~ this.log();
    this.$.popup2.hide();
    this.$.popup.hide();
  },

  clearEdit: function() {
    this.$.titleInput.setValue("");
    this.$.descriptionInput.setValue("");
    this.$.colorGroup.setActive(this.$["#558b2f"]);
  },

});

enyo.kind({
  name: "michote.FlatButton",
  kind: enyo.GroupItem,
  tag: "button",
  attributes: {
    type: "button"
  },
  published: {
      color: "black",
      disabled: false
  },
  create: function() {
    this.inherited(arguments);
    this.colorChanged();
    this.disabledChanged();
  },
  colorChanged: function() {
      this.applyStyle("background-color", this.color);
  },
  disabledChanged: function() {
    this.setAttribute("disabled", this.disabled);
  },
  tap: function() {
    if (this.disabled) {
      return true;
    } else {
      this.setActive(true);
    }
  }
});
