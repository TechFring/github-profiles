function toggleClassSpinner() {
    $('#spn').toggleClass('fas fa-search');
    $('#spn').toggleClass('spinner-border spinner-border-sm');
}

function getThemePreferences() {
    let theme = localStorage.getItem('theme');
    $('#darkmode').prop('checked', theme == 'darkmode');
}

function setThemePreferences() {
    let theme = $('#darkmode').is(':checked') ? 'darkmode' : 'default';
    localStorage.setItem('theme', theme);
}

function darkModeTheme() {
    $('body').addClass('bg-dark text-light');
    $('.navbar').removeClass('navbar-light bg-light').addClass('navbar-dark bg-dark');
    $('.navbar .nav-item').addClass('active');
    $('footer .btn').removeClass('btn-outline-dark').addClass('btn-outline-light');
    $('.card').addClass('bg-dark');
    $('.dropdown-menu').addClass('bg-dark');
    $('.dropdown-menu').addClass('darkmode-dropdown');
    $('a.dropdown-item').addClass('text-light');
}

function defaultTheme() {
    $('body').removeClass('bg-dark text-light');
    $('.navbar').removeClass('navbar-dark bg-dark').addClass('navbar-light bg-light');
    $('.navbar .nav-item').removeClass('active');
    $('footer .btn').removeClass('btn-outline-light').addClass('btn-outline-dark');
    $('.card').removeClass('bg-dark');
    $('.dropdown-menu').removeClass('bg-dark');
    $('.dropdown-menu').removeClass('darkmode-dropdown');
    $('a.dropdown-item').removeClass('text-light');
}