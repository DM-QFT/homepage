/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', async () => {

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.forEach(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            const responsiveNav = document.getElementById('navbarResponsive');
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none'
                && responsiveNav.classList.contains('show') && window.bootstrap?.Collapse) {
                bootstrap.Collapse.getOrCreateInstance(responsiveNav).hide();
            }
        });
    });

    // Wait for every fragment before measuring sections or following a deep link.
    await Promise.all([
        loadSection('members', 'members.html'),
        loadSection('projects', 'projects.html'),
        loadSection('news', 'news.html'),
        loadSection('publications', 'publications.html'),
        loadSection('codes', 'codes.html'),
        loadSection('resources', 'resources.html'),
    ]);

    // Typeset once after loading; a MathJax failure must not block navigation.
    try {
        await window.MathJax?.startup?.promise;
        if (window.MathJax?.typesetPromise) {
            await window.MathJax.typesetPromise();
        }
    } catch (error) {
        console.error('Error typesetting sections:', error);
    }
    if (document.fonts) {
        await document.fonts.ready;
    }

    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav && window.bootstrap?.ScrollSpy) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Hash targets may have been empty or absent when the document first loaded.
    let targetId = window.location.hash.slice(1);
    try {
        targetId = decodeURIComponent(targetId);
    } catch (error) {
        // Ignore malformed URL encoding and try the literal fragment instead.
    }
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'instant' });
});

// Function to load external HTML content into a div
async function loadSection(sectionId, fileName) {
    const section = document.getElementById(sectionId);
    try {
        const response = await fetch(fileName);
        if (!response.ok) {
            throw new Error(`${fileName}: HTTP ${response.status}`);
        }
        section.innerHTML = await response.text();
    } catch (error) {
        const message = document.createElement('p');
        message.className = 'p-4';
        message.textContent = 'This section could not be loaded. Please reload the page.';
        section.replaceChildren(message);
        console.error('Error loading section:', error);
    }
}
