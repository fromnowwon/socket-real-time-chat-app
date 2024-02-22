// express 모듈을 불러옴
const express = require("express");
// express app 생성
const app = express();
// http 모듈을 불러옴
const http = require("http");
// express app을 사용하여 http 서버를 생성
const server = http.createServer(app);
// socket.io의 Server 클래스를 불러옴
const { Server } = require("socket.io");
// 위에서 생성한 http 서버를 사용하여 Socket.io 서버 생성
const io = new Server(server);

// 루트 경로("/")로 들어오는 GET 요청에 대한 응답으로 index.html 파일을 보냄
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// 클라이언트가 소켓에 연결되었을 때 실행되는 이벤트 핸들러 정의
io.on("connection", (socket) => {
	console.log("a user connected");

	// 클라이언트와의 연결이 끊어졌을 때 실행되는 이벤트 핸들러 정의
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

	// 클라이언트로부터 chat message 이벤트를 수신했을 때 실행되는 이벤트 핸들러 정의
	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	})
});

// 서버를 4000번 포트에서 실행하고, 서버가 시작될 때 실행되는 콜백 함수 정의
server.listen(4000, () => {
	console.log("Now listening on port 4000");
});
