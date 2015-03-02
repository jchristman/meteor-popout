meteor-popout
=============

A library to create reactive popout windows. Check out the [live demo](http://popout.meteor.com/).

API
===

This library is designed to create a simple, controllable, reactive popout system. There are two types of popouts so far: removable and duplicating. These function exactly as they sound. The removable one will actually not render the template in the current page when the popout is done, and the duplicate will render it in the page and in the new window. 

The whole idea of this library is that you will wrap a portion of your page in the "Popout", passing the template you want displayed in the popout as an argument. Then, using the session variable defined as the *on* parameter, you can toggle whether it is popped out by changing the session variable from true to false. The data context on the outside of the call to the Popout template is automatically passed to the template specified by the call. There are only three mandatory arguments to the template, and they are shown here.

```html
    {{> Popout.Remove template='popout_content' on='removeSessionVar' win=true}}
    {{> Popout.Duplicate template='popout_content' on='duplicateSessionVar' tab=true}}
```

A description of possible parameters is given below.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| template | String | true | The name of the template to render inside of the popout area. |
| on | String | true | The name of the Session variable which will toggle the popped state. |
| win or tab | boolean | true | Either the "win" or the "tab" field must be present to determine whether to pop the template into a new window or new tab |
| name | String | false | A string for the title of the new window |
| width | int | false | For a new window, specifies the width. Defaults to 400. |
| height | int | false | For a new window, specifies the height. Defaults to 400. |
| url | String | false | Indicates a url for the new window or tab. |

For an example, see [example](https://github.com/jchristman/meteor-popout/tree/master/example).
