const Favourite = require('../models/favourite');
const Home = require('../models/homesData');

exports.getIndex = async (req,res,next)=>{
    try {
        const registeredHome = await Home.fetchAll();
        // console.log("Fetched homes:", registeredHome);
        // console.log("Number of homes:", registeredHome ? registeredHome.length : 'undefined');
        res.render('store/index',
            {registeredHome:registeredHome,
                pageTitle:'homepage',
                currentPage:'home'
            });
    } catch (error) {
        console.error('Error fetching homes:', error);
        res.status(500).render('500', { pageTitle: 'Server Error' });
    }
};

exports.getHomes = async (req,res,next)=>{
    try {
        const registeredHome = await Home.fetchAll();
        res.render('store/home_list',
            {registeredHome:registeredHome,
                pageTitle:'list of homes',
                currentPage:'home-list'
            });
    } catch (error) {
        console.error('Error fetching homes:', error);
        res.status(500).render('500', { pageTitle: 'Server Error' });
    }
};

exports.getBookings = (req,res,next)=>{

        res.render('store/bookings',
            {pageTitle: 'bookings',
                currentPage: 'booked-homes'});
};
    

exports.getFavourites = async (req,res,next)=>{
    try {
        const favourites = await Favourite.getFavourites();
        const registeredHome = await Home.fetchAll();
        const favouriteHomes = registeredHome.filter(home => favourites.includes(home._id.toString()));
        res.render('store/favourite',
            {favouriteHomes:favouriteHomes,
            pageTitle:'favourite homes',
            currentPage:'my favourites'});
    } catch (error) {
        console.error('Error fetching favourites:', error);
        res.status(500).render('500', { pageTitle: 'Server Error' });
    }
};

exports.postAddToFavourite = (req,res,next)=>{
    console.log("came to add to fav with id: ",req.body);
    Favourite.addToFavourite(req.body.id, error=>{
        if(error){
            console.log("error while marking favourite, ",error);
            res.redirect('/home-list');
        }
        else{
        res.redirect('/favourite');}
    })
};

exports.postRemoveFavourite = (req,res,next)=>{
    const homeId = req.params.homeId;
    Favourite.deleteFavById(homeId, error =>{
        if(error){
            console.log("error removing from favourite",error);
        }
        res.redirect('/favourite');
    })
};

exports.getHomeDetails = async (req,res,next)=>{
    try {
        const homeId = req.params.homeId;
        const home = await Home.findById(homeId);
        if(!home){
            console.log("home not found");
            res.redirect("/home");
        }
        else{
            console.log("home details found",home);
            res.render('store/home_detail',
                {home:home,
                pageTitle:'home Details',
                currentPage:'home'});
        }
    } catch (error) {
        console.error('Error fetching home details:', error);
        res.status(500).render('500', { pageTitle: 'Server Error' });
    }
};

