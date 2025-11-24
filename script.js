const inputArea = document.querySelector('.input');
const bttn = document.querySelector('.btn');
const dataHolder = document.querySelector('.result');

bttn.addEventListener("click", () => {
    const userName = inputArea.value.trim();

    if (userName === "") {
        dataHolder.innerHTML = "<p style='color:white;'>Enter valid Username</p>";
        return;
    }

    fetch(`https://api.github.com/users/${userName}`)
        .then(res => res.json())
        .then(data => {
            if (data.message === "Not Found") {
                dataHolder.innerHTML = "<p style='color:white;'>User not found</p>";
                return;
            }

            dataHolder.innerHTML = `
                <div class="profile-card">
                    <img src="${data.avatar_url}" class="avatar">

                    <h2>${data.name || data.login}</h2>
                    <p>${data.bio || "No bio available"}</p>

                    <p><strong>Followers:</strong> ${data.followers}</p>
                    <p><strong>Following:</strong> ${data.following}</p>
                    <p><strong>Repos:</strong> ${data.public_repos}</p>

                    <a href="${data.html_url}" target="_blank" class="visit-btn">Visit GitHub</a>
                </div>
            `;
        })

        .catch(() => {
            dataHolder.innerHTML = "<p style='color:white;'>Something went wrong. Try again.</p>";
        });
});
