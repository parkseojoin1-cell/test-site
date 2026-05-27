function addPost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const date = new Date().toLocaleDateString('ko-KR').slice(0, -1); // 오늘 날짜

    if (title === "" || content === "") {
        alert("제목과 내용을 모두 입력해 주세요.");
        return;
    }

    const postList = document.getElementById('posts');
    const newPost = document.createElement('li');
    newPost.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <span class="date">${date}</span>
    `;

    postList.prepend(newPost); // 최상단에 추가

    // 입력 필드 초기화
    document.getElementById('post-title').value = "";
    document.getElementById('post-content').value = "";
}