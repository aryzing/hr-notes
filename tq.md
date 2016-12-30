# Dynamic components
This project has created the concept of dynamic components.

What is meant by dynamic components are components that are shown dynamically. That is, the components that should be rendered on screen are not determined by the project code, but rather by code elsewhere (from another project, on another server) and passed to the project. There is, however, an agreement between the dynamic component provider and the app as to the set of components that are available for dynamic rendering.

The data/information of which components are to be dynamically rendered is in a JSON.

# Conversation

Olufemi [11:37]  
So, I'm here with Eduard and we're wondering if you could give us some guidance regarding the work done for the Customer Facing Admin

rodrigo [11:39 AM]  
ok, we can think that we have 3 parts of the admin
the [.NET] backend, [Node.js] backend for server side rendering and [Javascript] Front end
Both, Nodejs backend and front-end use react to render the view
and they are strongly linked
in fact, they are the same project
Now, the .NET part is a bit ugly
as we have a strong dependency with services and Database done for the rest of the admin [PNR Assist, Activation...]
The authentication between both sides of the application (javascript and .NET) is done using JWT
this JWT is a generated string, it is obtained from converting an XML provided by the Activation service to this format
any doubt by the moment?

olufemi [11:48 AM]  
Not at the moment, please continue

rodrigo [11:49 AM]  
I can't open this file right now
but is a diagram of the architecture we did
uploaded a file
TQplus basic architecture 190816 (Standard Visio).vsd
124KB
Binary
 Click to download
1 Comment
I'm not sure if is the latest one. but it can provide you a clear global vision
uploaded a file
TQplus flow.vsdx
66KB
Zip
 Click to download
1 Comment
This other one is a flow diagram I did

olufemi [11:52 AM]  
Thanks for that

rodrigo [11:52 AM]  
I'm sorry about .NET part, but I don't have too much knowledge about it
Well, the Nodejs part, is hosted in a Linux VM

olufemi [11:53 AM]  
As far as the merging of template configuration to the rendered output, is there any documentation on that?

rodrigo [11:54 AM]  
you mean about how to tranform the TQ model to an email using a template
?

olufemi [11:55 AM]  
Yes

rodrigo [11:55 AM]  
no, I didn't have time for that
but is easy
I created a kind of layer over redux
which handles dynamic component structures
then, when we have a template json model
this dynamic layer, will render it
but, it will render each component in a different way, dependendig the "context"
I mean, if we are in the editor context, the component will render a different thing that if we are in the email context
to do this, we have in src/helpers
two functions: createTemplateComponent and wrapTemplateComponent
createTemplateComponent is the factory which will decide how the component must render
to do this, you should pass a "mode" by param which is the context
I remember 4 different modes or context
EDITOR, TOOLBOX and EMAIL
3
sorry
the editor is passed when you have to render the component at the template-configuration
the toolbox is passed when you have to render the component at the template-configuration right bar
where you can modify the component properties
and the email mode is the one which will render the output email
Finally the wrapTemplateComponent is a React HOC
which handles common features of every component, about when should it re-render, what properties should be passed to the component, etc...
Finally, at src/components/templateComponents (or something similar)
is the place where all the component should be defined
as ReactComponents
I know, is too much
Anyway I will go later to the office to take my laptop
and I can explain it you better with the code in front

olufemi [12:10 PM]  
Ok great...
Thanks for the information, Eduard finds it very useful and we can use this as a foundation for a quick meeting to finalise this discussion once you're here
Will that be ok with you?

rodrigo [12:11 PM]  
yes

olufemi [12:11 PM]  
Splendid...
Do you know what time you'll be here?

rodrigo [12:12 PM]  
about 14:30 15:00

olufemi [12:12 PM]  
Sweet stuff...
but I will be just a few minutes

olufemi [12:12 PM]  
Yes sure...
Please come see me once you're here... I have officially booked your time :wink:

rodrigo [12:13 PM]  
ok

olufemi [12:14 PM]  
One last thing...
do you have any documentation we can look at in the meantime?

rodrigo [12:15 PM]  
I only had time to create the basic documentation which is in the repo
in docs folder

olufemi [12:16 PM]  
Ok, Eduard has this doc (edited)

rodrigo [12:16 PM]  
I don't remember to document nothing about this layer
but Julian and David use the same layer for booking assitance
I created it when they got issues with dynamic structures in redux (edited)
and I implemented it in TQ+ after that (edited)
I guess they can help you a bit with it

olufemi [12:20 PM]  
Which David btw?

rodrigo [12:21 PM]  
David davidwalker2235
ups
David Carmona
@davidwalker2235

olufemi [12:24 PM]  
Yes sure... I'll grab him in a bit
What is the purpose of this layer though?

rodrigo [12:31 PM]  
Redux has a limitation with dynamic-component-structures
the layer solves this

olufemi [12:37 PM]  
Yeah, I see the reasoning behind this.
David is also here explaining to Eduard
How painting the dynamic component works

rodrigo [12:48 PM]  
:slightly_smiling_face:

olufemi [12:50 PM]  
Thanks buddy, it was really helpful :slightly_smiling_face:
commented on rodrigo’s file TQplus flow.vsdx
First file from Rodrigo
commented on rodrigo’s file TQplus basic architecture 190816 (Standard Visio).vsd
Second file from Rodrigo

# Important post-conversation notes

* Existance of project specific concept, **dynamic component structures**.
* A JSON is used to define dynamic component structures.
* Interpretation: There is a "Layer" that handles component structures rendering
* Interpretation: Layer renders components differently depending on context
* Components render differently depending on **context**.
* There are three contexts: Editor, Toolbox, Email
* Interpretation: The concept of context is passed as a prop. In other words, the output of the render function, which has three significant "states", is selected via the a prop.
* Two important functions in `/src/helpers`:
  * `createTemplateComponent` Factory
  * `wrapTemplateComponent` HOC. Handles "common" features.
* Interpretation: At least some influence over the rendering depending on the context is performed by `createTemplateComponent` since *it* is passed the context through the a `mode` param.

# Template nightmare

Three branches:

* template-application
* template-configuration
* template-generation

I think the configuration refers to the Admin Panel where the admin configures the template

I think the template application is what Nico referred to as the "mashing": taking the information about applied styles to a template and generate the corresponding HTML

I think template generation is, perhaps, where templates are first invented.

Finally, I think I'll be working on the template configuration branch first.

There is also the issue that these names don't coincide with the names that we are using to describe them:

"developer"/template-application = "BA"/mashing
"developer"/template-configuration = "BA"/application
"developer"/template-generation = "BA"/?

# Questions

1. How does the email work? Where is this component? As far as accessing it on the server, I seem to remember that there were some url restrictions
2. How is all of this information stored in the DB? How is it retrieved? How is it sent to the client? When is it sent to the client?
3. How do the different versions of the same dynamic component exchange information about their styles?
4. Why three template branches?
5. Where is the logic that controls what is being displayed?

# Now what?

What do I have to do?
For example, I must include the tabs component in there somewhere.

How do I do that?

# Responsive emails

https://webdesign.tutsplus.com/es/articles/creating-a-simple-responsive-html-email--webdesign-12978
