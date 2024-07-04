# SAFE-T

<p align="center">
    <img src="https://github.com/likelion-inha-hackathon-2/Summerthon-FE/assets/77565980/9bb90fe0-4b17-4561-aceb-118e3c6f890e" alt="SAFE-T Logo" style="width: 250px;">
</p>

 
## 팀 소개
멋쟁이사자처럼 인하대학교 12기 썸머 해커톤(7/5~7/6) 2팀입니다.

## 서비스 소개
쉽고 간편하게 택시를 호출할 수 있습니다.


## 기능
- **반응형 웹/앱**
  - 데스크탑, 태블릿, 휴대폰 모든 기기에서 사용 가능 
- **회원가입**
  - 입력란 유효성을 검증받아 안전한 가입 가능
    - 연락처나 이메일 등의 형식이 올바르지 않을 경우, 가입 불가
- **로그인**
  - JWT 기반의 토큰 인증을 통한 안전한 로그인
  - 로그인하지 않으면 기능 이용 불가 
- **내 정보 확인**
  - 회원가입에서 사용한 주요 개인정보를 확인
  - 보호자와 주소지 정보 추가 등록 및 확인 가능
- **현 위치에서 택시 호출**
  - 출발지 및 도착지 입력하는 일반적인 호출
  - QR 스캔을 통해 미리 저장한 주소지로 빠르고 간편하게 호출
- **택시 배차**
  - 가장 가까운 택시들의 정보를 수집하여 배차
  - 기사 정보와 요금, 소요 시간 안내
- **보호자 긴급 호출**: 위급 상황 시 미리 저장한 보호자에게 즉시 알림

## 실행
```bash
git clone https://github.com/likelion-inha-hackathon-2/Summerthon-FE.git
cd my-app/
npm i
npm run start
