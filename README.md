# EventHQ

이벤트 및 보상 관리 시스템 - NestJS 기반 MSA 프로젝트

## 🧱 프로젝트 구성

- **Gateway Server**: API 진입점, JWT 인증 및 권한 체크
- **Auth Server**: 유저 등록, 로그인, JWT 발급, 역할(Role) 관리
- **Event Server**: 이벤트 등록, 보상 등록, 유저 보상 요청 처리

## 🚀 실행 방법

```bash
# 프로젝트 루트에서 실행
docker-compose up --build
```

## 🛠️ API 개요

### Auth Server
- `POST /auth/register`: 회원가입
- `POST /auth/login`: 로그인 → JWT 발급
- `GET /auth/profile`: JWT 인증 후 프로필 조회

### Event Server
- `POST /events`: 이벤트 생성
- `GET /events`: 이벤트 목록
- `POST /events/:id/rewards`: 보상 등록
- `POST /events/:id/request`: 유저 보상 요청

### Gateway Server
- `POST /proxy/auth/profile`: 인증된 유저의 프로필 조회 프록시

## 🧪 테스트
API 테스트는 Postman 또는 curl 등을 통해 가능합니다.
JWT 인증이 필요한 요청에는 Bearer Token을 포함해야 합니다.