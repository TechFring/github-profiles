function searchProfile(username) {
    $.ajax({
        type: 'get',
        url: `https://api.github.com/users/${username}`,
        dataType: 'json',
        beforeSend: () => {
            toggleClassSpinner();
            $('#spn').attr('role', 'status');
            
            $('#loadData').removeClass('d-none');
            $('#data').addClass('d-none');
        },
        success: data => {
            toggleClassSpinner();
            $('#spn').attr('role', '');

            $('#loadData').addClass('d-none')
            $('#data').removeClass('d-none');

            $('#data').find('.card-header').text(data.login);
            $('#data').find('img').attr('src', data.avatar_url);
            $('#data').find('span:first').text(`${data.followers} followers`);
            $('#data').find('span:odd').text(`${data.following} following`);
            $('#data').find('span:last').text(`${data.public_repos} repositories`);
        },
        error: () => {
            toggleClassSpinner();
            $('#spn').attr('role', '');

            $('#loadData').addClass('d-none');
            $('#data').addClass('d-none');
            alertify.error('Profile not found');
        }
    });
}

function searchRepositories(username) {
    $.ajax({
        type: 'get',
        url: `https://api.github.com/users/${username}/repos`,
        dataType: 'json',
        beforeSend: () => {
            $('#loadRepositories').removeClass('d-none');
            $('#repositories').addClass('d-none');
        },
        success: data => {
            console.log(data);

            $('#loadRepositories').addClass('d-none');
            $('#repositories').removeClass('d-none');
        },
        error: error => {
            $('#loadRepositories').addClass('d-none');
            $('#repositories').removeClass('d-none');
        }
    });
}