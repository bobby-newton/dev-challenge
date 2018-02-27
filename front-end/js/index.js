const URL = "http://localhost:3000";

$(document).ready(() => {
  $.get(`${URL}/users`, data => {
    buildUserList(data);
  });
});

const buildUserList = userData => {
  userData.forEach(user => {
    const { id, name } = user;
    const html = `<a href="#!" user-id=${id} class="collection-item user-list-item">${name}</a>`;
    $("#user-list").append(html);
  });

  $(".user-list-item").click(function() {
    const userId = $(this).attr("user-id");
    onSelectUser(userId);
  });
};

const onSelectUser = userId => {
  console.log(`Now get user ${userId}'s albums...`);
};
