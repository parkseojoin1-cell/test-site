// ⚠️ 주의: 아래 주소를 본인이 방금 만든 Render '백엔드 서버' 주소로 반드시 바꿔주세요!
// 뒤에 /api/posts 는 그대로 붙여두셔야 합니다.
const API_URL = "https://backend-test-yxrs.onrender.com";

// 사이트가 열리면 서버에서 글 목록을 가져와서 화면에 보여줌
window.onload = function() {
    getPosts();
};

// 1. 서버에서 글 목록 가져오기 (GET)
async function getPosts() {
    try {
        const response = await fetch(API_URL);
        const posts = await response.json();
        
        const postList = document.getElementById('posts');
        postList.innerHTML = ""; // 기존 목록 초기화

        posts.forEach(post => {
            const newPost = document.createElement('li');
            newPost.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <span class="date">${post.date}</span>
            `;
            postList.appendChild(newPost);
        });
    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
    }
}

// 2. 서버에 새 글 저장하기 (POST)
async function addPost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    if (title === "" || content === "") {
        alert("제목과 내용을 모두 입력해 주세요.");
        return;
    }

    try {
        // 서버로 데이터 전송
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            // 전송 성공 시 입력창을 비우고 목록을 다시 새로고침해서 가져옴
            document.getElementById('post-title').value = "";
            document.getElementById('post-content').value = "";
            getPosts();
        } else {
            alert("서버 저장 실패");
        }
    } catch (error) {
        console.error("서버 통신 중 오류 발생:", error);
    }
}
