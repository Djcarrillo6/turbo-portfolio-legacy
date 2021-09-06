Turbo Portfolio Template: Backend Log

- Turbo360 is used to create a local DB which allows data persistence; i.e. blog posts & projects.

* REST API for querying data.
* The Turbo CLI is going to provide a set of scaffolding tools and a connection to our staging enviornment. We then can deploy the portfolio project to the staging server.
* The .zip Turbo template (The Gallery), comes with a standard Express, NodeJS folder structure.

- Through the Turbo CLI, we log into my Turbo acct, entered my cloned staging enviornment "Site ID" & "API Key", which connects/clones my source code to my Turbo staging enviorment. It allows me to now verify anything I can running in my development enviornment, is also sucessfully being run in my staging enviornment.

  - Using "turbo deploy" will send my source code to my Turbo staging enviornment on Turbo, so we can run the same project on my local development server, and make sure eveything looks the same in both my local and my staging enviroment.

  - After deployment, a host URL is provided in the terminal.

* App.js

  - The Node/Express project settings are in this file. Also in this file are the instructions on where to store assets such as images or CSS files.
  - Routes are the files that handle requests, which in turn configure the responses to those client requests.
  - "main.js" will hold the main routes for the website.
  - In Node/Express project, every route accepts 2 args: a path, and a function arg(which accepts 2 args of it's own, 'req' & 'res').

* Views & Templates

  - 'Mustache' is a common templating engine used with Node/Express Apps.
  - ".mustache" files run on the "mustache" templating engine in order to render data dynamically in an HTML document.
  - These .mustache files come with pre-inserted "double mustache" variables, which can be used to render specific data. (Similiar to Django templates!).
  - "landing.mustache" is configured as a Mustache(HTML) doc, and in the 'main.js" file, we can invoke the "render()" method to render the Mustache doc.
  - In "main.js" we can create a object(named 'data'), which we can then pass to the 'render()' method as an arg. The object can then be rendered in the Mustache template.

  * Looping in Mustache Templates

    - To begin loop: {{#key}} ===> To end loop: {{/key}}

  * Rendering Images in Mustache Templates

    - Create a key:value pair, in which the key connects to a string location of the image to be rendered. Preferable the image is hosted in my server instead of a unsecured web image url.
    - When rendering an image in an Mustache-HTML doc, 3-mustache brackets are preffered! Create an 'img' element, and point it's "src" = "{{{image_url}}}".

  * Partial Rendering

    - In Mustache, rendering a partial allows me to render a chunk of HTML(Similiar to partial views in C#).
    - After creating a new partial file "form.mustache", it can be rendered in the landing page with the syntax '{{>form}}'.

  * Turbo's pages/JSON Configuration

    - The JSON files are stored in the "pages" directory.
    - Each routes data object should have it's own JSON configuation file.
    - Each mustache template-file with a coressponding JSON file associated with it, is where the data from that template can be extracted too.
    - The JSON config file MUST match the name of it's associated template.
    - If a specific template has a JSON configuration file, the template rendering engine will grab that JSON file, and then insert that JSON file's data object when the template is rendered.
    - In the template file, we can instantiate an empty data object. On render time, this empty object will then be filled with the object in it's associated JSON file.
    - If a JSON config file is rendered, it can be accessed in the template by using the "page-key" as an key to the JSON data object: "{{page.greeting}}".

  * The Global Object:

    - global.json {error: global object can only be changed in visual editor}

    * This JSON file has a special consideration in the Turbo enviornment. The Turbo enviornment will fetch the global configuartion file for and rednering command.
    * This is useful because there are many configuration options in a website that should apply to every single page. Rather than having several page configuration files with repeat data, it's preffered to have one single global configuration file to handle all of them.
    * In order to pass the global object to a template, use a "context object"(Similiar to Python syntax!).
    * All of the keys on the template passed global object are accessed using the "global-key".

      - The "context object" is bound to the request object, underneath the context key: 'req.context'
      - In order to make sure our JSON config files are persisted to the staging server, they need to be added to the server's configuration files.
      - In order to load any changes made to the JSON files, enter the following into the terminal: "turbo page [name of config file]". This will update the configuartion on the staging server. Repeat for each new/updates JSON file.

      * Convenient tool for changing conent on the site, without the need to re-deploy each time.

      * ERROR: The global variable shows at different times in the visual editor and the code editore global.json file! Manually updating works in the visual editor.

* Turbo UI Code Blocks: Moving UI components from "blocks.json" to a template

  - Most Turbo templates come with a set of UI code blocks that can be reuse to build out the UI so that I don't need to create the HTML & CSS from scratch.
  - After the home route, '/blocks' will link to the UI blocks(partials).
  - The "blocks.mustache" template carries all the default UI partials that come with this Turbo template.
  - The blocks directory is inside the partials directory, and the blocks can be reformatted to my preference, and then intergrated as I see fit on individual template pages.
  - In the "landing.mustache" template, insert the raw HTML by copying and pasting the code directly from the blocks directory files.
  - In the "blocks.json" file, copy the key/value that matches the name of the partial; this will load the images in conjunction with the HTML in the "landing.mustache" file.
  - Once the configuration of the "blocks.json" file match the configuration of the "landing.json" file, this ensures that when the "landing.mustache" page is rendered, the triple bracket tags "{{{ }}}", will be able to access the data that was copied to "landing.json".
    * REMEMBER TO CHANGE ALL THE 'GLOBAL'-KEYS INTO 'PAGE'-KEYS!

* Storing Images on Turbo's Hosting Platform

  - On the Turbo dashboard, select the name of the project(my portfolio), and select the File Storage tab on the left.
  - Upload needed image files individually.
  - By storing images in the Turbo platform, we have easy access to image cropting tools.
    - By adding an "=" sign at the end of the image url, I can set the image rendering size, rather then uploading different sized versions of the image.
  - Once the image has been resized to requirement, copy the CDN url & paste it as the value in the JSON file.

* Local Database & Model-View-Controller

  - The Turbo Db is a local DB that's persistent on every individual website.
  - In the "tmp" directory, there are 3 default DB files with default dummy data.
  - Turbo also provides a DB we can use to render more dynamic data such as blog posts and projects.
  - In the "Project.js" file, the model we are using for this project is labeled "props", which is an object of key value pairs that define the model's properties.
  - Turbo is organized around the MVC architecture.
    - Model: Project.js
    - View: Templates
    - Controller: DB querying functions and behaviour logic for the webstie.
  - The "ProjectController.js" file cotains the controller logic for the "project.js" model we using for the portfolio site.
  - The 'get()' function will query and fetch projects from the Turbo DB that match the search parameters that were passed to it.
  - The 'getById()' function fetches a projects based on the DB "id" search parameter.
  - The 'post()' function will create a new project entry in the Turbo DB, based on the data passed in the "body" parameter.
  - The 'put()' function is an update method which accepts 2 params: "id" & "params", to located a project in the DB based on it's ID, and then update it's properties according to the data in the "params"-object paramater.
  - The 'delete()' methood locates and removes a project according to the "id" parameter that was passed in.

  * The logic in the "Views" & the logic in the "Controllers" should be self-contained! Only View based logic in the Views files, and only controller based logic in the controller files.
  * THe standard of any MVC architecture is to ensure there are NO LOGIC CO-DEPENDECIES CROSSED BETWEEN VIEW & CONTROLLER.

  * ProjectController
    - First, require the "ProjectController.js" file into the "routes/main.js" file.
    - Because "ProjectController" is a JS class, it needs to be instantiated first, before any of the functions therein become acessible.
    - In "main.js", within the "/"-route method, instantiate a new instance of the 'ProjectController' class: const projectCtr = newProjectController();
    - The new instance can now run any of the function commands in the "ProjectController.js" file.
    * All of the functions in the ProjectController return a PROMISE!
      - Each returned promise must include a ".then()" + "catch()"!
      - In the .then() success block, the .get() promise returns AN ARRAY OF PROJECTS.
      - The "res.render()" method should be invoked in the success block.

* Rendering Projects

  - After the DB query method returns a array of projects, we can now pass the array to the 'data object', underneath the key 'projects' ==> " data['projects'] = projects; "
  - Now after the 'redner' call, the template now has access to the projects array via the context-object @ key == 'projects'.
  - Loop over the array of projects in the "landing.mustache" file, and place the loop around the first div. This template div will display according to the number of projects in the array.
  - Using the keys in the "project.js" model to choose which properties of the project to display; Use double-mustache syntax around each model prop key.
  - In the "landing.json" configuration file, add a new key of "projects", with the value of antoher object with 2 key/value pairs within: "header" & "subheader".

* Content Management System (CMS) - (Similiar to Django Admin)

  - Updating our data is easily done through the built-in content management system provided by Turbo.
  - 3 models come default loaded from a Turbo template; In my portfolio site, those 3 models are "project", "post", & "service". Each has a corresponding files in the models directory.
  - Any properties on a model that have a "immutable: true;" value, WILL NOT be displayed in the CMS Visual Editor

  * Any changes made to the CMS ONLY update the staging enviornment!
    - In order to update the "tmp" directory in the local enviornment, use the NPM Script Command "npm run reset".

* Project Detail Page

  - Now that we have our own projects showing up on the home page, we create an individual page to show each project in greater detail.
  - To do so, we create a new route and use the req.params object provided by Node/Express in order to identify which project in particular to render.
  - We then fetch that project using the ProjectController following the MVC principles.

* Project SLUGS

  - In the "landing.mustache" file, the hyperlink to the project details page end with a SLUG.
  - Becuase it is considered bad practice to display DB ID's, we will use a SLUG to ID our projects on the front-end.
  - In the "ProjectController.js" file, within the 'post(body)' method, a SLUG is assigned based on a variation of the name of the project. After the SLUG has been assigned, it can not be edited by the user(immutable: true).
  - The SLUG can be extracted from the URL, and then it can be used to query the DB through the ProjectController.
    - Create a new instance of the ProjectController, then invoke .get()-method with the SLUG passed as an object.
      `const projectCtr = new ProjectController() ===> projectCtr.get({slug:projectSlug});`
      - This will return an array of projects.
      - If the return array has a length of zero, throw an error.
        `if(projects.length == 0) {throw new Error('...')}`
        - Otherwise, extract the 0 index from the return array, and store it in a const.
          `const project = projects[0];`
          - Then pass it to the "data"-object underneath the key 'project'.
            `data['project'] = project;`

* Finalize Landing Page + Contact Form

  - In the "blocks.json" file in the "pages" directory, copy the "service" key&value object, and paste it in the "landing.json" configuration file.
  - Copy the code in "service.mustache" and paste it in the "landing.mustache".
  - In "landing.json", create an array of JSON-objects underneath a key of "list". Each JSON-object will have a keys of "text"/"desc"/"img_feature etc...".
  - In "landing.mustache", create a "services" key with a value of an array. Loop over the array of objects(services), and display a "name", "desc", & "img-feature" for each one.

* Contact Form Front-End

  - Copied the "contact.mustache" partial and pasted it in the "landing.mustache" page.
  - In "landing.mustache" configuration file, create a new key of "contact", and set it's value to another object with it's owen keys of "header" & "subheader".

  * Contact Form Back-End

    - In the "scripts.mustache" file, there are 2 default JS scripts that come with the template. We will be creating our own specific JS script which will handle the front-end form collection and submission.
    - The JS script will use jQuery & AJAX to send a AJAX request to a REST API which passes it the to data controller under the Model-View-Controller paradigm.
    - When a user hits the send button on the contact form, jQuery will allow us to collect the data from the front-end and then send that data in the form of an AJAX request to my Turbo staging server's API.

      - On the button element, create a id attribute and set it to "btn-submit-contant"
        `<button id="btn-contact-submit">`
      - Use jQuery to select that id & bind a click-event.
        - Prevent default behavior to prevent page reload.
      - Tag the name/email/message element's in "landing.mustache" with id-attributes so their respective values can be extracted from the form.
      - In "landing.mustache", inside the script function, create a "visitorObj" which will carry the 3 input fields as keys, and jQuery can then insert the data collected from the form into the values.

    - Turbo templates come with a preinstalled '/api'-route, and is connected to the Vertex object router.
    - This preloaded API Router will proxy all requests that are made to the controllers using the HTTP commands in the "SubscriberController.js" file. We will be using the "post" method to send a HTTP post request to the API for "Subscriber".
    - In controller directory, open the "index.js" file and import the "SubscriberController.js" file.
    - When the form is submitted, the "Subscriber.js" file is the model in which the data will be sent to the server. This is supported now through the "visitorObj" and the "Subsciber" schema.

    * Lastly, place the submission script code into it's own JS file, and then set the "src" attribute to the location of the file(contact.js).

      - In "app.js" the static directory is set to "public" by default, we can just use: `src="{{{cdn}}}/js/contact.js`
        \*\* {{{cdn}}} connects the built-in Turbo CDN, which will allow for faster client side access to any JS files that are connected.

    * It's ALWAYS best practice to deliver your static assest via a CDN.