
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
    const creator = `Created by: ${randomObj.creator.user.username}`;
    const nftImg = `<a href="${randomObj.permalink}" target=_blank> <img src=" ${randomObj.image_url} "/></a>`

    // add NFT data to document
    document.getElementById('nft_title').innerHTML = title;
    document.getElementById('nft_desc').innerHTML = description;
    document.getElementById('nft_creator').innerHTML = creator;
    document.getElementById('image').innerHTML = nftImg;
    
    // If statement to avoid NFT's with null  or empylinks loading 
    if (randomObj.image_url) {
        document.getElementById( 'image' ).innerHTML = nftImg;
    } else if (randomObj.image_url === null || randomObj.image_url === '') {
        displayNFT(data)
    }

    // if (randomObj.creator.user === null || randomObj.creator.user === '') {
    //     document.getElementById( 'nft_creator' ).innerHTML = "Click  image to see Creator";
    // } else {
    //     return 
    // }


};


// OpenSea API call 

const options = {method: 'GET'};

const retrievAsset = () => {
    
    const apiUrl = 'https://api.opensea.io/api/v1/assets?limit=50'
    fetch(apiUrl, options)
    .then(response => {return response.json()})
    .then(responseData => {
        const data = responseData.assets;
        displayNFT(data)
        document.querySelector(".spinner-wrapper").style.visibility = "hidden";
    })
    .catch(err => console.error(err));
}

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
