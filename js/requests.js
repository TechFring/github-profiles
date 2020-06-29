function searchProfile(username) {
    $.ajax({
        type: 'get',
        url: `https://api.github.com/users/${username}`,
        dataType: 'json',
        beforeSend: () => {
            toggleClassSpinner();
            $('#data').addClass('h-25');
            $('#data').empty();
            $('#data').append(`
            <div class="d-flex h-100 align-items-center">
                <strong>Loading...</strong>
                <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
            `);
        },
        success: data => {
            toggleClassSpinner();
            $('#data').removeClass('h-25');
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
            $('#darkmode').is(':checked') ? darkModeTheme() : defaultTheme();
        },
        error: () => {
            toggleClassSpinner();
            $('#data').addClass('h-25');
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
            $('#repositories').parent().addClass('h-50');
            $('#repositories').empty();
            $('#repositories').parent().find('p').remove();
            $('#data').append(`
            <div class="d-flex h-100 align-items-center">
                <strong>Loading...</strong>
                <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
            `);
        },
        success: data => {
            if (data.length > 0) {
                $('#repositories').parent().removeClass('h-50');
            }
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

                                    <div class="btn-group">
                                        <button type="button" class="btn btn-primary dropdown-toggle"
                                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Options
                                        </button>

                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="${v.html_url}" target="_blank">
                                                Go to repository <i class="fas fa-link"></i>
                                            </a>
    
                                            <a class="dropdown-item clone" href="#">
                                                Clone <i class="fas fa-download"></i>
                                            </a>

                                            <div class="dropdown-divider"></div>

                                            <span class="dropdown-item">
                                                <input type="text" class="form-control url" value="${v.html_url}" readonly>
                                            </span>
                                        </div>
                                    </div>                                  
                                </div>
                                <div class="card-footer text-center">
                                    <span class="text-muted">${v.name}</span>
                                </div>
                            </div>
                        </div>`
                    );
                }
            });
            $('#repositories').parent().prepend('<p class="lead">Some repositories</p>');
            $('#darkmode').is(':checked') ? darkModeTheme() : defaultTheme();
        },
        error: error => {
            $('#repositories').parent().addClass('h-50');
            $('#repositories').empty();
            $('#repositories').parent().find('p').remove();
        }
    });
}