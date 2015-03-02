if (Meteor.isClient) {
  Session.setDefault('counter', 0);
  Session.setDefault('removeSessionVar', false);
  Session.setDefault('duplicateSessionVar', false);
  Session.setDefault('removeTabSessionVar', false);
  Session.setDefault('duplicateTabSessionVar', false);

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
    }
  });
}
