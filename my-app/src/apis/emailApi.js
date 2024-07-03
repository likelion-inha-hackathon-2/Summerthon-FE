import axios from "axios";

// 환경 변수 .env에 설정 완료

export const sendEmail = async (startingAddress, destinationAddress) => {
  try {
    const response = await axios.post("http://3.36.172.57/sendmail", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SMTP_APP_KEY}`,
      },
      params: {
        starting_address: startingAddress,
        destination_address: destinationAddress,
      },
    });

    // 응답 데이터 그대로 리턴
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    return { status: "500", message: "이메일 전송 중 오류가 발생했습니다." };
  }
};
