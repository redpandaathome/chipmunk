const express = require("express");
const morgan = require("morgan");
const coockieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const nunjucks = require("nunjucks");
const indexRouter = require("./routes");
const userRouter = require('./routes/user');

dotenv.config();
const app = express();
const PORT = process.env.port || 5001;

app.set('view engine', 'html');

nunjucks.configure('views', {
   express: app,
   watch: true
});
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(coockieParser(process.env.COOKIE_SECRET));
app.use(session({
   resave:false,
   saveUninitialized:false,
   secret:process.env.COOKIE_SECRET,
   cookie:{
      httpOnly:true,
      //후에 https 적용시 true로 변경할 것
      secure:false,
   },
   name: 'session-cookie',
}));

app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
   error.status=404;
   next(error)
})

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use((req,res,next)=>{
   // res.status(404).send('Not Found');
   console.log("요청!")
   console.log(res.status)
})

app.get('/test', (req, res, next) => {
   console.log('GET /test 요청에서만 실행됩니다')
   next();
}, (req, res) => {
   throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

//에러 처리 미들웨어
app.use((err, req, res, next) => {
   console.error(err);
   // res.status(500).send(err.message);
   res.locals.message = err.message;
   res.locals.error=process.env.NODE_ENV !== 'production' ? err : {};
   res.status(err.status || 500);
   res.render('error')
});

app.listen(PORT, ()=>{
   console.log(`Server is running on PORT ${PORT}`);
});

// //multipart 이미지 업로드 테스트
// const multer = require("multer");
// const fs = require("fs");
// try{
//    fs.readdirSync('uploads');
// }catch(errror){
//    console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
//    fs.mkdirSync('uploads');
// }
// const upload = multer({
//    storage: multer.diskStorage({
//       destination(req, file, done) {
//          done(null, 'uploads/');
//       },
//       filename(req, file, done) {
//          const ext = path.extname(file.originalname);
//          done(null, path.basename(file.originalname, ext) + Date.now() + ext);
//       },
//    }),
//    limits: {fileSize: 5*1024*1024},
// })
// app.get('/upload', (req, res) => {
//    res.sendFile(path.join(__dirname, 'multipart.html'));
// });
// app.post('/upload',
//    upload.fields([{name: 'image1'}, {name:'image2'}]),
//    (req, res)=>{
//       console.log(req.files, req.body);
//       res.send('ok')
//    }
// );