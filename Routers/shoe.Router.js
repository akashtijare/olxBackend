const {Router} = require ("express");
const { ShoeModel } = require("../config/db");




const shoeRouter  = Router();

shoeRouter.get("/classifieds", async (req, res) => {

    try{
        const blogs = await ShoeModel.find()
        res.send(blogs)
    }
    catch(err){
        console.log(err)
        res.send({msg : "something went wrong, please try again later"})
    }
})
shoeRouter.post('/classifieds/add', async (req, res) => {

    const{name,description,category,image,location,postedAt, price} = req.body

    const new_shoe = new ShoeModel({
        name,
        description,
        category,
        image,
        location,
        postedAt,
        price,
    })
    try{
        await new_shoe.save()
        console.log(new_shoe)
        return res.send({msg : "shoe successfully added"})
        
    }
    catch(err){
        console.log(err)
        res.send({msg : "something went wrong"})
    }
   
})

shoeRouter.delete("/delete/:id" , async(req,res)=>{
    const {id} = req.params;
    const data = await ShoeModel.findOneAndDelete({_id: id});
    res.send(data);
})


shoeRouter.get("/classifieds/filter", async (req, res) => {
const { search, category, _sort, _order, pageSize = 4, page = 1 } = req.query;

try {
    let query = {};

    if (category) {
        query.category = category;
    }

    let sortObject = {};
    if (_sort) {
        sortObject[_sort] = _order === "desc" ? -1 : 1;
    }

    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    const totalShoes = await ShoeModel.countDocuments(query);

    const skip = (page - 1) * pageSize;
    const data = await ShoeModel.find(query).sort(sortObject).skip(skip).limit(pageSize);

    res.send({
        totalShoes,
        currentPage: Number(page),
        totalPages: Math.ceil(totalShoe / pageSize),
        data,
    });
} catch (error) {
    console.error(error);
    res.send(" Server Error");
}
});

module.exports ={
    shoeRouter
}