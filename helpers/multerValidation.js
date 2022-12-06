   const fileFilter=(req,res,next)=>{
    const arrayFiles= req.files;
      let fileType=arrayFiles.map((value)=>{
      return value.mimetype
    })
    let filters= fileType.map((value)=>{
        return value==='image/png' ||value === 'image/jpeg'
    })     
    const isTrue = (currentValue) => currentValue === true
    const allTure =filters.every(isTrue);
    try{
        if(allTure== true){
         return  res.send(req.files)
         
      }
    }
    catch{
        return res.send("not a valid file")
    }
      next()
         
    }
export default fileFilter

    