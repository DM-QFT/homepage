/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});



// Function to load external HTML content into a div
function loadSection(sectionId, fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            document.getElementById(sectionId).innerHTML = data;

            // Trigger MathJax reprocessing
            if (window.MathJax) {
                MathJax.typesetPromise();
            }
        })
        .catch(error => console.error('Error loading section:', error));
}


// The pages load their sections from within index.html using explicit calls.
// 加载不同的子页面
loadSection('members', 'members.html');
loadSection('projects', 'projects.html');
loadSection('news', 'news.html');
loadSection('publications', 'publications.html');
loadSection('codes', 'codes.html');
loadSection('resources', 'resources.html');