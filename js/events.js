$('#search form').on('submit', e => {
    e.preventDefault();
    let name = $(e.target).find('input').val().trim();
    searchProfile(name);
    searchRepositories(name);
    $(e.target).find('input').val('');
});