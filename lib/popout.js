Helpers = {}; 
Template.registerHelper('Popout', Helpers);
Helpers.Remove = Template._popout_remove;
Helpers.Duplicate = Template._popout_duplicate;

Template._popout_remove.helpers({
    check : function() {
        if (this.template == undefined) throw new Meteor.Error(502, 'Must define the "template" argument to Popout.Remove');
        if (this.on == undefined)       throw new Meteor.Error(502, 'Must define the "on" argument to Popout.Remove');
        
        if (this.win == undefined && this.tab == undefined) throw new Meteor.Error(502, 'Must specify either "win" or "tab" parameter');

        if (this.win != undefined) {
            if (this.height == undefined)   this.height = 400;
            if (this.width == undefined)    this.width = 400;
            this.dimensions = 'height=' + this.height + ',width=' + this.width;
        }

        if (this.url == undefined)  this.url = 'about:blank';
        if (this.name == undefined) this.name = '';

        this.newWindow = undefined;

        return this;
    },

    popout : function() {
        return Session.get(this.on);
    },

    getTemplate : function() {
        return Template[this.template];
    },

    newWindow : function() {
        var self = this;
        if (this.win != undefined) {
            this.newWindow = window.open(this.url, this.name, this.dimensions);
        } else {
            this.newWindow = window.open(this.url);
        }
        this.newWindow.document.title = this.name;
        this.newWindow.onbeforeunload = function() {
            Session.set(self.on, false);
        }
        Blaze.renderWithData(Template[this.template], {}, this.newWindow.document.body);
    },

    closeNewWindow : function() {
        if (this.newWindow == undefined)    return;
        else                                this.newWindow.close();
    }
});

Template._popout_duplicate.helpers({
    check : function() {
        if (this.template == undefined) throw new Meteor.Error(502, 'Must define the "template" argument to Popout.Remove');
        if (this.on == undefined)       throw new Meteor.Error(502, 'Must define the "on" argument to Popout.Remove');
        
        if (this.win == undefined && this.tab == undefined) throw new Meteor.Error(502, 'Must specify either "win" or "tab" parameter');

        if (this.win != undefined) {
            if (this.height == undefined)   this.height = 400;
            if (this.width == undefined)    this.width = 400;
            this.dimensions = 'height=' + this.height + ',width=' + this.width;
        }

        if (this.url == undefined)  this.url = 'about:blank';
        if (this.name == undefined) this.name = '';

        this.newWindow = undefined;

        return this;
    },

    popout : function() {
        return Session.get(this.on);
    },

    getTemplate : function() {
        return Template[this.template];
    },

    newWindow : function() {
        var self = this;
        if (this.win != undefined) {
            this.newWindow = window.open(this.url, this.name, this.dimensions);
        } else {
            this.newWindow = window.open(this.url);
        }
        this.newWindow.document.title = this.name;
        this.newWindow.onbeforeunload = function() {
            Session.set(self.on, false);
        }
        Blaze.renderWithData(Template[this.template], {}, this.newWindow.document.body);
    },

    closeNewWindow : function() {
        if (this.newWindow == undefined)    return;
        else                                this.newWindow.close();
    }
});
