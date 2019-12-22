module.exports = {
    //get Message takes a raw classified image object and parses it into a string.
    getMessage : (value) => {
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