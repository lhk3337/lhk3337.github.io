---
slug: "/web/auth"
date: "2023-04-07"
title: "사용자 인증"
categories: ["Web"]
desc: "웹에서 사용자 인증 방법"
topbg: "./topbg.png"
thumbnail: "./thumbnail.png"
---

웹에서 로그인 시 어떻게 인증과정이 이루어지는지 궁금하고, 개념을 명확하게 하고 싶었다.

## 정의

웹에서 사용자 인증 방법은 웹 사이트나 애플리케이션에서 사용자의 신원을 확인하고 인증, 사용자 인증은 보안과 관련이 있으며, 비인가자가 해당 서비스에 접근하는 것을 방지하기 위해 필요하다

## 종류

### 1. 세션 방식

#### 세션 동작 방식

![세션 동작 순서](session.png)

1. 사용자가 로그인 페이지에 접속하여 아이디와 비밀번호를 입력
2. 웹 서버는 입력받은 아이디와 비밀번호를 검증하여, 사용자가 인증되었다면 세션 ID를 발급
3. 세션 ID는 서버 측에서 유지되며, 클라이언트(브라우저)에는 쿠키(Cookie) 형태로 저장
4. 사용자가 다른 페이지에 접속할 때, 브라우저는 서버로 세션 ID를 전송
5. 서버는 전송받은 세션 ID를 검증하여, 해당 사용자가 로그인한 상태인지 확인

#### 장점

- 상태 정보를 서버에 저장하기 떄문에 보안성이 높아진다.
- 클라이언트의 session id들을 서버에 저장했기 때문에, 클라이언트들을 컨트롤할 수 있다.
- 서버와 클라이언트들 간에 서로 다른 세션 아이디를 사용하기 때문에, 여러 클라이언트들을 동시에 처리할 수 있습니다.

#### 단점

- 서버에 세션 데이터를 저장하기 떄문에, 접속자가 많을 경우 서버의 과부화가 걸림
- 과부화를 해결하기 위해 서버를 확장해야 하므로 비용적인 측면에서 경제적 부담이 발생할 수 밖에 없다.
- 세션 ID를 쿠키에 저장하기 때문에, 쿠키가 조작될 가능성이 많음.

## refrence

- [[Server] 토큰 기반 인증 VS 서버(세션) 기반 인증](https://mangkyu.tistory.com/55)

- [What really is the difference between session and token based authentication](https://dev.to/thecodearcher/what-really-is-the-difference-between-session-and-token-based-authentication-2o39)

- [세션 동작 방식](https://velog.io/@hyun6ik/%EC%84%B8%EC%85%98-%EB%8F%99%EC%9E%91-%EB%B0%A9%EC%8B%9D)
