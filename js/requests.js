function searchProfile(name) {
    $.ajax({
        type: 'get',
        url: `https://api.github.com/users/${name}`,
        dataType: 'json',
        beforeSend: () => {
            $('#load').removeClass('d-none');
            $('#data').addClass('d-none');
        },
        success: data => {
            console.log(data);

            $('#load').addClass('d-none')
            $('#data').removeClass('d-none');
            $('#data').find('.card-header').text(data.login);
            $('#data').find('img').attr('src', data.avatar_url);
            $('#data').find('span:first').text(`${data.followers} followers`);
            $('#data').find('span:odd').text(`${data.following} followers`);
            $('#data').find('span:last').text(`${data.public_repos} repositories`);
        },
        error: () => {
            $('#load').addClass('d-none');
            $('#data').addClass('d-none');
            alertify.error('Profile not found');
        }
    });
}