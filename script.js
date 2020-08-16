const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete(){
   if (!loader.hidden){
       quoteContainer.hidden = false;
       loader.hidden = true;
   }
}

// Get Quote from API
async function getQuote(){
    loading();
    //We need to use a proxy url
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const apiurl ='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyurl + apiurl);
        const data = await response.json();
        //If author is blank and unknown
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innertext = data.quoteAuthor;
        }
        //Reduce font size for long statement
        if (data.quoteText.lenght > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //stop loader and show quote
        complete();

    } catch (error) {
        getQuote();

    }

}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getQuote();

