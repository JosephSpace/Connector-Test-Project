"use strict";

// Get the date
/*function theTimer() {
    var theTime = new Date(new Date().getTime()).toLocaleTimeString();
    var theDate = new Date(new Date().getTime()).toLocaleDateString();
    pvm.innerHTML = theTime + " &bull; " + theDate;
}*/

// Update the date every second
/*theTimer();
setInterval(theTimer, 1000);*/



// HELP MODAL & INFO MODAL
var help_modal = document.getElementById('modal-help');
var help_reveal_btn = document.getElementById("btn-help");
var help_close = document.getElementsByClassName("close")[0];

var info_modal = document.getElementById('modal-info');
var info_reveal_btn = document.getElementById("btn-info");
var info_close = document.getElementsByClassName("close")[1];

help_reveal_btn.onclick = function() {
    help_modal.style.display = "block";
}
help_close.onclick = function() {
    help_modal.style.display = "none";
}

info_reveal_btn.onclick = function() {
    info_modal.style.display = "block";
}
info_close.onclick = function() {
    info_modal.style.display = "none";
}

// Modal close buttons
window.onclick = function(event) {
    if (event.target == info_modal) {
        info_modal.style.display = "none";
    } else if (event.target == help_modal) {
        help_modal.style.display = "none" 
    }
} 







/* Modal Info tabs */
function openTab(evt, tabName) {
  
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
  
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
  
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();



// Declare DOM element variables
const 
    contentBlocks = document.querySelectorAll(".content-block"),
    mainView = document.querySelector("#main-view"),
    mainSections = document.querySelectorAll(".section-main"),
    singleSections = document.querySelectorAll(".section-single"),
    expndedSections = document.querySelectorAll(".section-expanded"),
    singleSecFrequency = document.querySelector("#section-single-frequency"),
    singleSecFans = document.querySelector("#section-full-fan"),
    singleSecCpuUsage = document.querySelector("#section-single-cpu-usage"),
    singleSecCoreUsage = document.querySelector("#section-single-core-usage"),
    singleSecTemp = document.querySelector("#section-single-temperature"),
    expandBtns = document.querySelectorAll(".expand-section-btn"),
    expandedSections = document.querySelectorAll(".section-expanded"),
    expandedSecFreq = document.querySelector("#section-expanded-frequency");


// Hide single & expaded sections by default
singleSections.forEach( (section) => section.classList.add("view-hidden"));
expndedSections.forEach( (section) => section.classList.add("view-hidden"));


// Hide a section with css class (display: none)
const hideSection = (section) => {
    section.classList.add("view-hidden")
};

// Reveal a section with animation either from left or right (right = default)
const revealSection = (section, revealFrom = "right") => {
    section.classList.remove("view-hidden");
    
    if (revealFrom == "left") {
        section.classList.add("view-reveal-anim-from-left")
        setTimeout( () => section.classList.remove("view-reveal-anim-from-left"), 300);
    } else {
        section.classList.add("view-reveal-anim-from-right")
        setTimeout( () => section.classList.remove("view-reveal-anim-from-right"), 300);
    }
};


// Click events for all content blocks
contentBlocks.forEach( (element) => {

    element.addEventListener("click", (e) => {

        if (element.classList.contains("frequency-content-block")) {
            mainSections.forEach( (section) => hideSection(section) );
            expandedSections.forEach( (section) => hideSection(section));
            revealSection(singleSecFrequency, "right");
        } 
        else if (element.classList.contains("fan-content-block")) {
            mainSections.forEach( (section) => hideSection(section) );
            revealSection(singleSecFans, "right");
        } 
        else if (element.classList.contains("usage-overall-content-block")) {
            mainSections.forEach( (section) => hideSection(section) );
            revealSection(singleSecCpuUsage, "right");
        } 
        else if (element.classList.contains("usage-cores-content-block")) {
            mainSections.forEach( (section) => hideSection(section) );
            revealSection(singleSecCoreUsage, "right");
        } 
        else if (element.classList.contains("temperature-content-block")) {
            mainSections.forEach( (section) => hideSection(section) );
            revealSection(singleSecTemp, "right");
        }
    })
})


// Expand section buttons
expandBtns.forEach ( (btn) => {
    btn.addEventListener("click", () => {
        mainSections.forEach( (section) => hideSection(section) );
        hideSection(singleSecFrequency);
        revealSection(expandedSecFreq, "right");
    })
})




// BACK BUTTONS
const btnBack = document.querySelectorAll(".btn-back");

btnBack.forEach( (btn) => {

    btn.addEventListener("click", () => {
        singleSections.forEach( (section) => hideSection(section));
        expandedSections.forEach( (section) => hideSection(section));
        mainSections.forEach( (section) => revealSection(section, "left") );
    })
})




// Define CPU Frequency select boxes
const selectBoxes = document.querySelectorAll('.core-select > input');
//const [, ...selectBoxesNoAll] = selectBoxes;
const freqCoreCharts = document.querySelectorAll('.freq-single-core-chart');


// Activate/deactivate frequency histogram chart
function activateFreqChart(target) {
    target.classList.add('active');
}
function deActivateFreqChart(target) {
    target.classList.remove('active');
}

// Change events for all select boxes
for (var i = 0; i < selectBoxes.length; i++) {
    selectBoxes[i].addEventListener('change', function(event) {
            
        // ALL CORES box
        if (event.target == selectBoxes[0]) {
            if (selectBoxes[0].classList.contains('active')) {
                selectBoxes[0].classList.remove('active');
                selectBoxes.forEach(function(element) {
                    element.checked = false;
                })
                freqCoreCharts.forEach(function(element) {
                    deActivateFreqChart(element)
                })
            } else {
                selectBoxes[0].classList.add('active');
                selectBoxes.forEach(function(element) {
                    element.checked = true;
                })
                freqCoreCharts.forEach(function(element) {
                    activateFreqChart(element)
                })
            }
        }
        
        
        // If not all cores are selected, remove check from "ALL"
        /*if (event.target !== selectBoxes[0]) {
            console.log('Anything but the first');
        }*/
        
        
        // Single cores
        if (event.target == selectBoxes[1]) {
            freqCoreCharts[0].classList.contains('active') 
            ? deActivateFreqChart(freqCoreCharts[0])
            : activateFreqChart(freqCoreCharts[0]);
            
        } else if (event.target == selectBoxes[2]) {
            freqCoreCharts[1].classList.contains('active') 
            ? deActivateFreqChart(freqCoreCharts[1])
            : activateFreqChart(freqCoreCharts[1]);
            
        } else if (event.target == selectBoxes[3]) {
            freqCoreCharts[2].classList.contains('active') 
            ? deActivateFreqChart(freqCoreCharts[2])
            : activateFreqChart(freqCoreCharts[2]);
            
        } else if (event.target == selectBoxes[4]) {
            freqCoreCharts[3].classList.contains('active') 
            ? deActivateFreqChart(freqCoreCharts[3])
            : activateFreqChart(freqCoreCharts[3]);
            
        } else if (event.target == selectBoxes[5]) {
            freqCoreCharts[4].classList.contains('active') 
            ? deActivateFreqChart(freqCoreCharts[4])
            : activateFreqChart(freqCoreCharts[4]);
            
        } else if (event.target == selectBoxes[6]) {
            freqCoreCharts[5].classList.contains('active') 
            ? deActivateFreqChart(freqCoreCharts[5])
            : activateFreqChart(freqCoreCharts[5]);
        }
        
    })
}






// Update copyright year automatically
document.querySelector('#copy-year').textContent = new Date().getFullYear();