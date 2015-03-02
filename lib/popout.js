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
        // I HATE THIS!!! BUT I CAN'T FIGURE OUT BEAUTIFUL CROSS-PLATFORM!!!!
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        var isFirefox = /Firefox/.test(navigator.userAgent);
        var isIE = /Windows NT/.test(navigator.userAgent);

        var self = this;
        if (this.win != undefined) {
            this.newWindow = window.open(this.url, this.name, this.dimensions);
        } else {
            this.newWindow = window.open(this.url);
        }
        
        if (!isSafari) this.newWindow.document.title = this.name;
        this.newWindow.onbeforeunload = function() {
            Session.set(self.on, false);
        }
        
        if (isChrome || isSafari) {
            Blaze.renderWithData(Template[this.template], {}, this.newWindow.document.body);
        } else if (isFirefox) {
            self.newWindow.addEventListener('load', function() {
                Blaze.renderWithData(Template[self.template], Template.parentData(2), self.newWindow.document.body);
            }, true);
        } else if (isIE) {
            throw new Meteor.Error('IE is HARD');
        } else {
            throw new Meteor.Error('Unsupported browser');
        }
    },

    closeNewWindow : function() {
        if (this.newWindow == undefined)    return;
        else                                this.newWindow.close();
    },

    parentContext : function() {
        return _.extend(Template.parentData(2), {template : this.template});
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
        // I HATE THIS!!! BUT I CAN'T FIGURE OUT BEAUTIFUL CROSS-PLATFORM!!!!
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        var isFirefox = /Firefox/.test(navigator.userAgent);
        var isIE = /Windows NT/.test(navigator.userAgent);

        var self = this;
        if (this.win != undefined) {
            this.newWindow = window.open(this.url, this.name, this.dimensions);
        } else {
            this.newWindow = window.open(this.url);
        }
        
        if (!isSafari) this.newWindow.document.title = this.name; // Because apparently this breaks Safari?
        this.newWindow.onbeforeunload = function() {
            Session.set(self.on, false);
        }
    
        if (isChrome || isSafari) {
            Blaze.renderWithData(Template[this.template], {}, this.newWindow.document.body);
        } else if (isFirefox) {
            self.newWindow.addEventListener('load', function() {
                Blaze.renderWithData(Template[self.template], Template.parentData(2), self.newWindow.document.body);
            }, true);
        } else if (isIE) {
            throw new Meteor.Error('IE is HARD');
        } else {
            throw new Meteor.Error('Unsupported browser');
        }
    },

    closeNewWindow : function() {
        if (this.newWindow == undefined)    return;
        else                                this.newWindow.close();
    },

    parentContext : function() {
        return _.extend(Template.parentData(2), {template : this.template});
    }
});
