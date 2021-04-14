// Loading Animation 

// let spinner = document.querySelector(".spinner-wrapper"); 

// window.addEventListener('load', function () {
//     // spinner.style.display = 'none';
//     spinner.parentElement.removeChild(spinner);
// });



// document.onreadystatechange = function() {
//     if (document.readyState !=="complete") {
//         document.querySelector(".container").style.visibility = "hidden";
//         document.querySelector(".spinner-wrapper").style.visibility = "visible";
//     } else {
//         document.querySelector(".spinner-wrapper").style.visibility = "none";
//         document.querySelector(".container").style.visibility = "visible";
//     }
// }

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector(
          ".container").style.visibility = "hidden";
        document.querySelector(
          ".spinner").style.visibility = "visible";
    } else {
        document.querySelector(
          ".spinner").style.display = "none";
        document.querySelector(
          ".container").style.visibility = "visible";
    }
};