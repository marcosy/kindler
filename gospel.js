var GOSPEL = {
    url: 'https://publication.evangelizo.ws/SP/days/' + getCurrentDate() + '?from=gospelComponent',

    extract: function(){
        httpGet(this.url, this.transform)
    },

    transform: function(extracted) {
       this.body = extracted.data.readings[2].text;                   
       this.body = this.body.replace(/\[\[.*?\]\]/g, '</br></br>'); // Remove any text within [[...]]
       this.body = this.body.replace('</br></br>',''); // do not add br the first time
                    
       this.header = extracted.data.date_displayed +
                    " | " +
                    extracted.data.readings[2].title

       this.footer = extracted.data.readings[2].reading_code

       // load
       writeToDiv('div-gospel-body', this.body);
       writeToDiv('div-gospel-header', this.header);
       writeToDiv('div-gospel-footer', this.footer);
    },
}

// Main
GOSPEL.extract();