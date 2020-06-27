$('#search').on('submit', e => {
    e.preventDefault();
    searchProfile($(e.target).find('input').val().trim());
});