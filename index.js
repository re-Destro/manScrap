const express = require("express");
const app = express();
const parser = require("body-parser")
const {homeManga, searchManga, viewManga, readManga} = require("./controller/getManga");
const expressEjsLayouts = require("express-ejs-layouts");




const PORT = process.env.PORT || 8000


app.set("view engine", "ejs")
app.use(expressEjsLayouts)
app.use(parser.urlencoded({extended:false}))
app.use(express.static("public"))

app.post("/cariManga", async (req,res) =>{
try{
    let data = await searchManga(req.body.manga)
    res.render("search",{
        layout: "layouts/main-layouts",
        title: `${req.body.manga}`,
        header1: req.body.manga,
        data
    })
}catch(err){
    res.send(`<h1>Error</h1>`)
}
})

app.get("/readManga/:title1",async (req,res) =>{
    try{
        let data = await readManga(req.params.title1);
        res.render("read",{
            layout: "layouts/main-layouts",
            title: req.params.title1.split("-").join(" ").toUpperCase(),
            header1:req.params.title1.split("-").join(" ").toUpperCase(),
            baca: true,
            data
        })
    }catch(err){
        res.send(`<h1>Error</h1>`)
    }
})
app.get("/bacaManga/:judul", async (req,res) =>{
    try{
    let data = await viewManga(req.params.judul)
    let jodoel = req.params.judul.split("-").join(" ")
    res.render("info",{
        baca: true,
        layout: "layouts/main-layouts",
        title: `KOMIK ${jodoel.toUpperCase()}`,
        header1: `BACA KOMIK<br>${jodoel.toUpperCase()}`,
        info: data.info,
        chapter : data.chapter,
        thumb: data.thumb
    })
}
catch(err){
    res.send("<h1>404 NOT FOUND </h1>")
}
})


app.get("/", async(req,res) =>{
    try{
    let data = await homeManga();
    res.render("home",{
        layout : "layouts/main-layouts",
        title: "WEB BACA MANGA",
        header1: "WEB BACA MANGA",
        data
    })
}catch(err){
    res.send(`<h1>Error</h1>`)
}
})

app.use((req, res, next) => {
    res.status(404).send(
        `
        <center>
        <img src="/yha.jpg" width="30%">
        <h1>HALAMAN TIDAK DITEMUKAN</h1>
        </center>
        `
    )
})
app.listen(PORT, async () =>{
    console.log("aplikasi berjalan pada " + PORT)
})




