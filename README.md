PbClasses Example Application Platform
===================================

This code provides a **base system** with a few example applications, that uses the PHP library **PbClasses**.

You can think of the system as a CMS, though its primary purpose is not to create a website; rather, it serves to provide a framework within which individual applications can operate together.
The system is particularly useful in a business setting - whether for small teams or for simplifying and organizing office tasks.

What can you do with this demo after installation?
--------------------------------------------------

- Login as Administrator
- Create Users with different access levels
- Optionally set up access groups and assign users to this groups
- Create and manage pages using a (JsTree) tree structure.
- Try out the implementation of an easily configurable PbTable sample application.
- Try out a simple but useful documentation tool that is integrated as a module.
- Try out a small PDF label tool that is also integrated as a module.
- Try out a scheduler that allows you to manage PHP CLI processes.
- Build your first application for the system with own Templates and Code

Requirements
------------
- PHP >= 8.1
- PHP (extension PDO enabled)
- Apache server (recommended) or PHP's built-in test server.
- MySQL or MariaDB
- Composer (to install the PHP dependencies)
- npm (to install the JavaScript packages)

Installation
------------
### Repository und dependencies

The easiest way to start the installation is by using Composer:
```bash
composer create-project pbieling/pbc-example pbc-example
```
Or you can clone or download the repository from github.
```bash
git clone https://github.com/pbieling/pbc-example.git pbc-example
cd pbc-example/
composer install
```
Then install the JavaScript packages using npm: 

```bash
cd htdocs/3rd
npm install
```

### Database installation

- Create a database **pbc-example**  
- Install the tables using the dump file  
**pbc-example/database/pbc-example.sql**

Configuration
-------------
### Database configuration
- Update the database connection details in the file
**pbc-example/config/db_credentials.conf.php**

```php
 <?php
 return [   
     'host' => 'localhost',
     'user' => 'root',
     'pwd' => 'password',
     'db' => 'pbc-example'
	 ];
```

### Webserver configuration

- Create an Apache vhost in the vhost configuration. The docroot is **pbc-example/htdocs**
The entry could look like  
```txt
<VirtualHost *:80>
  ServerName pbc-example.test
  DocumentRoot 'D:/projects/pbc-example/htdocs'
</VirtualHost>
```
Alternatively, you can use the PHP test server, but it does not run as fast as the Apache server.

```bash
cd pbc-example/
php -S localhost:8000 -t pbc-example/ router.php
```
Support for the Nginx web server is in preparation. I ask for a little patience.

### Project configuration
 
The main configuration **project.conf.php**  is located in the *htdocs/admin/* folder.

If you have adopted the project name pbc-example, you do not need to change anything here for the time being. If not, please adjust the project name there. Explanations of the individual configuration parameters are part of the documentation. Much of this is also commented within the configuration itself.

The **language** in the demo is determined by your browser settings. Currently, **German** and **English** are supported. To select the language manually, set the parameter  
'pref_lang' => 'en' (English) or  
'pref_lang' => 'de' (German).



Page-specific configurations are located in the *htdocs/admin/config* folder. No changes are required here initially.

Launch the demo application
---------------------------
Open in browser  
**http://pbc-example.test**  
(Apache)  
or  
**http://localhost:8000/**  
(PHP-CLI test server) 

Login as   
**user:** *admin*  
**password:** *admin*  


Structure of a pbc-project
--------------------------
The core concept is simplicity, achieved through a standard configuration and a standard structure. This serves as a foundation upon which individual projects can be built. Applications can be integrated directly into the project, or it can be extended using modules. (An explanation of modules in PbClasses projects will follow later.)

### Files and folders

A simple, web-based system built using PbClasses has the following structure:

- `src`
	- `admin`
		- `project.conf.php` — Configuration file of the project.
		- `config` — Includes configurations of individual pages.
		- `classes`— Contains own PHP classes required for the project.
		- `backtemplates` — Contains templates required for displaying the project pages.
		- `fronttemplates`— Contains templates that are used by the applications, in particular to generate HTML code.
		- `includes`
		- `tableconf`
		- `system`
			- `log`
			- `sessions`
			- `tmp`
			- `languages` — If needed.
- `config` — Includes db_credentials.conf.php. 
- `vendor` — Generated by Composer; includes the PbClasses library.
- `htdocs` (or `public`)
	- `.htaccess` — Redirects all requests for non-existent PHP files to `index.php`.
	- `index.php` — Uses `\PbClasses\Init()` to load the project and page configurations and output the page.
	- `favicon.ico`
	- `3rd` — JavaScript and CSS from other sources. Includes `node_modules` loaded with npm.
	- `js` — Includes `table-base.js` for the table system and other JavaScript files for the *pbc system* and the project.
	- `css` — CSS files for the PbC system and the project.
	- `admin` — CSS and JavaScript for non-public pages, such as the page administration and user administration areas.
	- `modules` — If needed.
	- `images` — If needed.
    - `documents` — If needed.
		
		
### Database tables for a pbc-system

Login:

- pbc__user
- pbc__online

Page structure:

- pbc__backnavi(page structure)
- pbc__navigation_translation — (I18n) If needed.

Access groups and controll to single pages — If needed.:  
(Simple level based access control can also be achieved via the backnavi table.)

- pbc__access_groups
- pbc__access_page2groups
- pbc__access_page2user
- pbc__access_user2groups

Tables for the PbClasses scheduler:

- pbtask__tasks_meta (Multiple schedulers can be defined.)
- pbtask__tasks_list1 (The list of tasks for the first scheduler.) 

		

### What are modules in pbc projects?

Modules are applications (apps, extensions, tools, etc.) that possess a degree of autonomy; they are structured similarly to the parent project and operate within it. Examples include documentation systems intended for use across various projects. They can also be specific tools—such as a letter generator—which, while used as a standalone component in one instance, could be adapted and integrated into other pbc systems as well.

Modules have their own configuration, but they can also access the parent project's configuration. PHP code within a module has the same capabilities as any other PHP code on the system—and this is by design.

For the sake of simplicity, the example project places the `modules` folder inside `htdocs`. However, it can also be located outside the document root if specific security requirements necessitate this. In such cases, the JavaScript and CSS files associated with the individual modules must be made accessible accordingly. (The `modules` path is defined in `admin/projects.conf.php`.)

### Rationale for the Design Decision

PbClasses is a framework primarily used in closed systems and small-scale projects involving trusted teams, where there are no heightened security requirements.

The system is intended to provide the means to address simple problems with simple solutions. Nevertheless, it is certainly possible to secure "pbc" projects against potential attackers and to adhere to modern standards.
		


Limitations and next steps
--------------------------

Additional documentation pages will be published gradually in the docs folder.

The multilingual functionality for the demo has only been partially implemented so far, and as a result, it is currently available only in German. However, it should be sufficient to allow one to understand how it works.

A static website generator—also a very useful feature—is currently missing. I am in the process of revising the code and will add it to the demo and the framework as soon as possible.

This is the work of a single individual; naturally, it has its limits and cannot satisfy every wish.

For many years, the system has proven useful in various forms especially for small projects in Germany. Nevertheless, the repository provided here is a new project that still requires a great deal of work.

The most valuable component of the system—and the one that has saved the most effort in projects—is the table system. However, much like PbClasses, the JavaScript code still contains a lot of legacy elements that are slated to be gradually replaced with more modern code.

Purists will likely be unhappy with the code in its current state. Problem-solvers, on the other hand, should find this system to be a useful tool.




