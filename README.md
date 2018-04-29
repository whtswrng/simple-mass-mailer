# cli-mailer
CLI tool for sending an email message in HTML format for an array of recipients.

## Usage
```
cli-mailer <smtps://username:password@smtp.example.com/?pool=true> <sender@email.address.com> <subject> <recipients-path.json> <message-path>
```
#### Example
```
cli-mailer smtps://thomas47:password47@smtp.gmail.com/?pool=true thomas47@gmail.com "Email subject" ./recipients.json ./message.txt
```

Content of **"recipients.json"**:
```json
["thomas.johnes@gmail.com", "mark.zuckerberg@facebook.com", "elon.musk@tesla.com"]
```

Content of **"message.txt"**:
```html
<strong>Hello!</strong></br>
How are u today?
```        
First argument (SMTP config pool) is [smtp pool config] from node mailer.
## Installation
```
npm install -g cli-mailer
```
   [smtp pool config]: <https://nodemailer.com/smtp/>
   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
