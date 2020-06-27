function searchProfile(username) {
    $.ajax({
        type: 'get',
        url: `https://api.github.com/users/${username}`,
        dataType: 'json',
        beforeSend: () => {
            toggleClassSpinner();
            $('#spn').attr('role', 'status');
            $('#data').append('<img src="images/skeleton.gif" class="img-fluid">');
        },
        success: data => {
            console.log(data);
            toggleClassSpinner();
            $('#spn').attr('role', '');

            $('#data').empty();

            $('#data').append(
                `<div class="card text-center">
                    <div class="card-header text-muted">
                        <a href="${data.html_url}" target="_blank">
                            <span>${data.login} <i class="fas fa-link"></i></span>                    
                        </a>
                    </div>
                    <div class="card-body">
                        <a href="${data.html_url}" target="_blank">
                            <img src="${data.avatar_url}" class="img-fluid avatar">
                        </a>
                    </div>
                    <div class="card-footer">
                        <span><i class="fas fa-user-friends"></i> ${data.followers} followers |</span>
                        <span><i class="fas fa-people-arrows"></i> ${data.following} following |</span>
                        <span><i class="fas fa-sort-amount-up"></i> ${data.public_repos} repositories</span>
                    </div>
                </div>`
            );
        },
        error: () => {
            toggleClassSpinner();
            $('#spn').attr('role', '');
            $('#data').empty();
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
            $('#repositories').append('<img src="images/skeleton.gif" class="img-fluid">');
        },
        success: data => {
            $('#repositories').empty();

            data.forEach((v, i) => {
                if (i < 6) {
                    $('#repositories').append(
                        `<div class="col-md-6 col-lg-4 mb-4">
                            <div class="card">
                                <div class="card-header text-center">
                                    <i class="fas fa-star"></i> ${v.stargazers_count}
                                </div>
                                <div class="card-body">
                                    <p>Description: ${v.description}</p>
                                    <p>Language: ${v.language}</p>
                                    <a class="btn btn-outline-dark" href="${v.html_url}" target="_blank">Go to repository</a>
                                </div>
                                <div class="card-footer text-center">
                                    <span class="text-muted">${v.name}</span>
                                </div>
                            </div>
                        </div>`
                    );
                }
            });

            $('#repositories').parent().prepend('<p class="lead">Repositories</p>');
        },
        error: error => {
            $('#repositories').empty();
        }
    });
}