if (Meteor.isClient) {
  Session.setDefault('counter', 0);
  Session.setDefault('removeSessionVar', false);
  Session.setDefault('duplicateSessionVar', false);
  Session.setDefault('removeTabSessionVar', false);
  Session.setDefault('duplicateTabSessionVar', false);
  Session.setDefault('createWindowSessionVar', false);
  Session.setDefault('createTabSessionVar', false);

  Template.popout_content.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.popout_content.events({
    'click button': function () {
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.body.helpers({
    removeState : function() {
        return Session.get('removeSessionVar').toString();
    },

    duplicateState : function() {
        return Session.get('duplicateSessionVar').toString();
    },

    removeTabState : function() {
        return Session.get('removeTabSessionVar').toString();
    },

    duplicateTabState : function() {
        return Session.get('duplicateTabSessionVar').toString();
    },

    exampleContext : function() {
        return { example : 'context' };
    }
  });

  Template.body.events({
    'click #remove':function() {
        Session.set('removeSessionVar', !Session.get('removeSessionVar'));
    },

    'click #dup':function() {
        Session.set('duplicateSessionVar', !Session.get('duplicateSessionVar'));
    },

    'click #removeTab':function() {
        Session.set('removeTabSessionVar', !Session.get('removeTabSessionVar'));
    },
    
    'click #dupTab':function() {
        Session.set('duplicateTabSessionVar', !Session.get('duplicateTabSessionVar'));
    },

    'click #createWindow':function() {
        if (this.popout == undefined) {
            this.popout = new Popout({
                template : 'popout_content',
                on : 'createWindowSessionVar',
                win : true,
                name : 'Programatically Created New Window'
            });
        }
        this.popout.show();
    },

    'click #createTab':function() {
        if (this.popoutTab == undefined) {
            this.popoutTab = new Popout({
                template : 'popout_content',
                on : 'createTabSessionVar',
                tab : true,
                name : 'Programatically Created New Tab'
            });
        }
        this.popoutTab.show();
    },

  });
}
