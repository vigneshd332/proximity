const watson = require('watson-developer-cloud');

//object containing credentials such as api key and tokens
const credential = {
    url: process.env.watson_url,
    version: '2018-03-19',
    iam_apikey: process.env.watson_key
}

const ir = new watson.VisualRecognitionV3(credential);

module.exports = {
    name: 'analyze',
    description: 'Image recognition powered by IBM Watson',
    aliases: ['an'],
    execute(msg, args) {
        const image = isImage(msg);
        image.then(
            (value) => {
            //checks the type of the promis value. If it is a stirng then run the first block. 
            if(typeof(value) == "string"){
                console.log("it is a string")
                //msg.reply("it is not an image");
                //insert watson conversation here
            }
            else{
                let replyMessage = getMessage(value);
                msg.reply(replyMessage);
            }
               console.log(value);
        });

    
   function isImage(msg) {
        try {
            //if msg doesnt have a url then this object will not exist and therefore return an error
            const image = msg.attachments.array()[0].url; //json object
            console.log("image url is " + image);
            
            //parameters for the general classification 
            const params_gen = {
                url: msg.attachments.array()[0].url,
                classifier_ids: "default",
            };
           
            //paramters for the food classification
           const params_food = {
                url: msg.attachments.array()[0].url,
               classifier_ids: "food"
           } 

           //first promise that does the first classification
           let prom1 = new Promise(
               (resolve, reject) => {
                //classify object contains image recognition object with general classification
                let classify_object = null;
                ir.classify(params_gen , (err, res) => {   
                    if(err){
                        console.log(err);
                        reject(err);
                    }
                    else{
                        classify_object = res; 
                        resolve(classify_object); //first promise resolves a raw classify object
                    }
                });
               }
           );

       
           //Function used to check if the image contains food. Takes raw classify object as a parameter
           function check_image(image_object){
                for(item of image_object.images[0].classifiers[0].classes){
                    if(item.class === 'food' ){
                        console.log("It is a food Item")
                        return true;
                    }
               }
               console.log("it is a general item")
               return false;
           }

                let promise = prom1.then(function(result){
                //check if result contains food or person    
                let bool = check_image(result);

                //if it is a food image than bool will be false and it will return a new promise
                if(bool == true){
                    return new Promise((resolve, reject) => {
                        ir.classify(params_food, 
                            (err ,res) => {
                                if(err){
                                    reject(err);
                                }
                                else{
                                    resolve(res); //passes raw classify object
                                }
                            });
                    });
                }
               else{
                   return (new Promise(
                       (resolve, reject) => {
                           resolve(result);
                       }));
               }
           }).catch(err => console.log(err));

           return(promise);
        }
        catch (TypeError) {
            //returns new promise with value of the text from the message
            console.log("Type Error caught")
            return (new Promise(
                (resolve, reject) => {
                   resolve(msg.content); 
                }))
        }
    }
    function getMessage(value){
        let replyMessage = "\nI see... \n";
                let greatestVal = 0;
                let answer = null;
                for(items of value.images[0].classifiers[0].classes){
                    if(items.score > greatestVal){
                        greatestVal = item.score;
                        answer = items.class
                    }

                    let itemClass = items.class;
                    let percentage = Number(items.score * 100).toFixed(2); //takes the score and converts it to a percentage

                    replyMessage = replyMessage + String(itemClass) +" ........ " + percentage + "% \n";
                }
        return replyMessage + "I think it is a " + String(answer) ;
    }
  }
};
