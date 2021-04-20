// Hide Randomiser Button 
document.querySelector("#randomiser").style.visibility = "hidden";

// Function to Parse and Display API Data 
const displayNFT = (data) => {

    // Create nft object array
    var nft = [];
    // Loop through and push API data to nft Array
    for( var i=0; i < data.length; ++i ) {
        nft.push(data[i])
    }

    // create random Object variable 
    let randomObj = nft[Math.floor(Math.random() * nft.length)];

    // Set variables with API data 
    const title = randomObj.collection.name; 
    const description = randomObj.collection.description;
    const nftImg = `<a href="${randomObj.permalink}" target=_blank> <img src=" ${randomObj.image_url} "/></a>`

    // add NFT data to document
    document.getElementById('nft_title').innerHTML = title;
    document.getElementById('nft_desc').innerHTML = description;
    document.getElementById('image').innerHTML = nftImg;
    
    // Try Catch Statement to avoid null username causing TypeError
    try {
        const creator = `Created by: ${randomObj.creator.user.username}`;
        document.getElementById('nft_creator').innerHTML = creator;
    } catch (error) {
        if (error instanceof TypeError) {
            document.getElementById('nft_creator').innerHTML = "";
        }
    }

    // If statement to avoid NFT's with null  or empylinks loading 
    if (randomObj.image_url) {
        document.getElementById( 'image' ).innerHTML = nftImg;
    } else if (randomObj.image_url === null || randomObj.image_url === '') {
        displayNFT(data)
    }

};


// OpenSea API call 
const apiKey = '32da81e457f5464d85c603467226936c';
const options = {method: 'GET',
                 headers: {'X-API-KEY': apiKey}   
                };

const retrievAsset = () => {
    
    const apiUrl = 'https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50'
    fetch(apiUrl, options)
    .then(response => {return response.json()})
    .then(responseData => {
        const data = responseData.assets;
        displayNFT(data)
        document.querySelector(".spinner-wrapper").style.visibility = "hidden";
        document.querySelector("#randomiser").style.visibility = "visible";
    })
    .catch(err => console.error(err));
}


// Run Application and Try Catch Statements - added due to receiving Type and Network Errors
try {
    retrievAsset(); 
} catch (error) {
    if (error instanceof TypeError) {
        console.log(error)
        retrievAsset();
    } else if (error instanceof NetworkError) {
        retrievAsset();
        console.log("Network Error Booooo!")
    }
} 


// Randomiser Button 
var btn = document.getElementById('randomiser');

btn.addEventListener("click", randBtn)

function randBtn() {
    retrievAsset();
};
