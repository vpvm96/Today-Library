# Today-Library (오늘의 서재)

![](./assets/mainLogo.png)

사용자들이 손 쉽게 보고 싶은 책을 찜하고, 읽었던 책을 모아서 볼 수 있도록 했습니다.
무슨 책을 읽어야 할 지 모를 때 추천 책들을 살펴볼 수 있고, 최신 신작들을 확인해 볼 수도 있습니다.

### [배포]

### Android

![](./assets/android.png)

### ios

![](./assets/ios.png)

<br />

### [시연영상 click]

[시연영상](https://youtu.be/7DLOJBs0gwE)

<br />

# 👥팀원구성

| 이름   | 블로그 주소                    | 깃허브 주소                     |
| ------ | ------------------------------ | ------------------------------- |
| 이상원 | https://vpvm96.tistory.com/    | https://github.com/vpvm96       |
| 이학경 | https://velog.io/@suwoncityboy | https://github.com/suwoncityBoy |
| 김민우 | https://velog.io/@kminu0819    | https://github.com/Minwoozzang  |
| 지회수 | https://newasborn.tistory.com/ | https://github.com/Newasborn    |

<br />

# 🤝팀 규칙

### Commit Convention

| 태그 이름        | 설명                                                                      |
| ---------------- | ------------------------------------------------------------------------- |
| feat             | 새로운 기능을 추가할 경우                                                 |
| fix              | 버그를 고친 경우                                                          |
| design           | CSS 등 사용자 UI 디자인 변경                                              |
| !BREAKING CHANGE | 커다란 API 변경의 경우                                                    |
| !HOTFIX          | 급하게 치명적인 버그를 고쳐야 하는 경우                                   |
| style            | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우                     |
| refactor         | 프로덕션 코드 리팩토링                                                    |
| comment          | 필요한 주석 추가 및 변경                                                  |
| docs             | 문서를 수정한 경우                                                        |
| test             | 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)                        |
| chore            | 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X) |
| rename           | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                        |
| remove           | 파일을 삭제하는 작업만 수행한 경우                                        |

<br />

### Code Convention

- 소문자 시작 camelCase : 변수명, 함수명, 컴포넌트 제외 파일과 폴더
- 대문자 시작 PascalCase : 컴포넌트 파일, 컴포넌트명
- 동사 + 명사 + Handler : 함수명
  - 예시) onEditButtonHandler
- 복수형 : 배열명
- tab : 2
- quote : single

<br />

# 🔧기술스택

### Client

- react-native
- react-query
- Emotion(Styled-components)

### Server

- Firebase (Auth , Store , storage)

### Deploy

- Expo

<br />

# 👨‍💻구현기능

- **메인 페이지**
  - **검색 기능**
    - 검색 리스트에 단어 입력 시 타이틀 기준으로 입력한 책만 보여주기 (Firebase Where 기능을 사용해서 데이터 뽑아내기)
  - **카테고리 기능**
    - 추천 책 (랜덤 뽑기)
    - 새로운 책 (Firebase Orderby 기능을 사용해서 createdAt 기준으로 정렬)
  - **책 클릭 시 디테일 페이지 라우팅**
    - 책 클릭 시 디테일 스크린으로 이동
- **마이 페이지** **(로그인 시 사용 가능)**
  - **프로필 이미지 업로드 기능**
    - 프로필 이미지 클릭 시 프로필 이미지 변경
  - **프로필 닉네임 변경 기능**
    - 닉네임 변경 전에는 기본 닉네임 값을 랜덤 배정
  - **카테고리 기능**
    - 내가 읽고 있는 책, 내가 보고 싶은 책
  - **카테고리 카운터 기능**
    - 내가 읽고 있는 책 개수
    - 내가 보고 싶은 책 개수
- **디테일 페이지**
  - **별점 기능** **(로그인 시 사용 가능)**
    - 리뷰 작성 시 별점 선택 가능
  - **별점 평균 값 기능**
    - 그 책에 대한 모든 사용자의 별점 평균 값을 계산
  - **읽음, 찜 기능** **(로그인 시 사용 가능)**
    - 읽음 버튼 활성화 마이 페이지에 내가 읽고 있는 책으로 이동
    - 찜 버튼 활성화 마이 페이지에 내가 보고 싶은 책으로 이동
  - **리뷰 작성 기능** **(로그인 시 사용 가능)**
    - 리뷰 등록 버튼 클릭 시 모달을 띄어주고 타이틀 내용 별점 입력 가능
- **로그인 페이지**
  - **로그인 기능**
    - 로그인 버튼 클릭 시 파이어베이스에 있는 회원이면 로그인 해주기
    - 만약 없는 정보라면 회원가입 후 사용하도록 알람 띄어주기
  - **회원가입 기능**
    - 회원가입시 이메일 비밀번호 Validation 체크하기

<br />

# 🎨와이어프레임

[피그마 바로가기](https://www.figma.com/file/MSQqFRwSNaaf3ySZHgRQGL/7%E3%85%8F%EB%8A%A5%ED%95%98%EC%A1%B0-team-figma?node-id=0%3A1&t=ZmKWtW5KGjcECb1w-0)

<br />

# 🔥트러블슈팅

[프로젝트 노션](https://brawny-city-7a5.notion.site/B-7-5da1fd12a827492db633aacca4db7a8f)

# 📄프로젝트 SA 및 KPT 회고

[프로젝트 SA](https://brawny-city-7a5.notion.site/B-7-5da1fd12a827492db633aacca4db7a8f)

[KPT 회고 블로그](https://vpvm96.tistory.com/50)
