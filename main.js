const form = document.getElementById('partnership-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    
    // 버튼 상태 변경
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '보내는 중...';

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.innerHTML = "문의가 성공적으로 전송되었습니다. 감사합니다!";
        status.className = "success";
        form.reset();
      } else {
        const result = await response.json();
        if (Object.hasOwn(result, 'errors')) {
          status.innerHTML = result.errors.map(error => error.message).join(", ");
        } else {
          status.innerHTML = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
        status.className = "error";
      }
    } catch (error) {
      status.innerHTML = "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.";
      status.className = "error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}
