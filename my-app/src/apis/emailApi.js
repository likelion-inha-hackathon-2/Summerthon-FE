import authApi from "./authApi";

// 환경 변수 .env에 설정 완료

export const sendEmail = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await authApi.get("/sendmail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 응답 데이터 그대로 리턴
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("Error sending email:", error);
    return { status: "500", message: "이메일 전송 중 오류가 발생했습니다." };
  }
};
