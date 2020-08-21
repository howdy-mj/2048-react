실전 리액트 프로그래밍 2048 게임 만들기

util 폴더: tile 관련 함수

`App`: score, bestScore 생성 및 자식 컴포넌트로 전달

`constant`: 칸이 몇개가 되든 대응 가능하게 따로 빼줌

## Component

`Game`: 게임의 틀(x, y) 사각형과 그 안에 있는 숫자 채워주기

`Header`: score, bestScore 보여주는 컴포넌트

`Tile`: `Game`안에서 생성되는 tile 컴포넌트, 클래스명에 tile-value, tile-position-x-y, tile-new, tile-merged 포함

## hoook

- 커스텀 훅

`useLocalStorage`: bestScore를 위해 로컬스토리지에 저장

`useMoveTile`: tile이 움직이고 newTile 추가하는 함수

## util

- tile 관련 함수

`keyboard`: `hotkeys-js` 라이브러리를 이용해 구현(나중에 다시 보기)

`number`: tile 위치를 랜덤으로 생성

`tile`: 초기 tileList 생성, tileList에 tile이 있는지 검사, x,y 값을 랜덤하게 생성, tileList와 움직임 정보를 받아서 newTileList 반환
