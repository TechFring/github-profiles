$(document).ready(() => {
    $('header input').val('TechFring');
    $('header form').trigger('submit');
});

$('header form').on('submit', e => {
    e.preventDefault();
    let name = $(e.target).find('input').val().trim();
    searchProfile(name);
    searchRepositories(name);
    $(e.target).find('input').val('');
});

$('#repositories').on('click', '.clone', e => {
    e.preventDefault();

    $(e.target).parent().find('.url').select();
    document.execCommand('copy');
    alertify.success('Copied');
});

$('#darkmode').on('change', () => {
    $('#darkmode').is(':checked') ? darkModeTheme() : defaultTheme();
});