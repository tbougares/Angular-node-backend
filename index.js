console.log("welcom mr taher")
const express = require('express')//obligtoir mil module express
var bodyParser = require('body-parser');//yrdha json mhma knyt yli jya
const app = express();//kima hekka express module  le routre
//activer les api
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
const port=1000//y
app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))
const connect = require('./dataBase/connect')

const produitApi = require('./routes/produitApi')
const EmailApi = require('./routes/EmailApi')
const clientApi = require('./routes/clientApi')
const cat = require('./routes/cat')
const admin = require('./routes/admin')
const CommandeApi = require('./routes/CommandeApi')

const path =require('path')
const multer =require('multer')

app.use('/categorie',cat)
app.use('/produit',produitApi)
app.use('/Email',EmailApi)
app.use('/Client',clientApi)
app.use('/Commande',CommandeApi)
app.use('/Admin',admin)


    //multer
  

app.use('/uploads/', express.static(path.join(__dirname, '/uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
        console.log(file);
    },
    filename: (req, file, cb) => {
         name = Date.now() + file.originalname //path.extname(file.originalname);
        console.log(file);
        console.log(name);
        cb(null, name);
    }
});
const fileFilter = (req, file, cb) => {
    cb(null, true);
   if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        /*return res.status(201).json({
            message: 'File uploded successfully'
        });*/
        return res.status(201).json({
            message: 'File uploded successfully',
            source:'http://localhost:1000/uploads/'+name,
            name:name
        });
        
    } catch (error) {
        console.error(error);
    }
});
///upload exel
app.post('/uploadE', upload.single('image'), (req, res, next) => {
    try {
        /*return res.status(201).json({
            message: 'File uploded successfully'
        });*/
        return res.status(201).json({
         
          name:name
        });
        
    } catch (error) {
        console.error(error);
    }
});
// upload multiples images 
app.post('/multiple-upload', upload.array("images",3), (req,res)=> {
console.log(req.files);
res.json({
  message:  "multiples files upload success"});
});
//donlowad
app.get( "/download",  (req, res) => {
    const file = path.resolve(__dirname, "uploads/1630202194462COURS4_Complexes.pdf");
    //No need for special headers
    res.download(file); 
})

//convertir fichier exel to json
app.post( "/json",  (req, res) => {
    console.log(5)
    console.log(req.body)
  const urlExel="uploads/"+ req.body.name
    console.log(urlExel)
    const wb = xlsx.readFile(urlExel)
  const ws=wb.SheetNames[0]
  const wy=wb.Sheets[ws]
  const js=xlsx.utils.sheet_to_json(wy)
  console.log(js)
  res.send(js)
})
  //fin


//routes
app.listen(port,()=>console.log('Server listen on the port ',port)) ;
