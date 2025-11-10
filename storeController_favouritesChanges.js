const Favourite = require('../models/favourite');
const Home = require('../models/homesData');

exports.getIndex = (req, res, next) => {
    console.log("session value:", req.session);
    Home.find().then(registeredHome => {
        // console.log("Fetched homes:", registeredHome);
        // console.log("Number of homes:", registeredHome ? registeredHome.length : 'undefined');
        res.render('store/index',
            {
                registeredHome: registeredHome,
                pageTitle: 'homepage',
                currentPage: 'home',
                isLoggedIn: req.isLoggedIn,
                user: req.session.user,
            });
    });
};

exports.getHomes = (req, res, next) => {
    Home.find().then(registeredHome => {
        res.render('store/home_list',
            {
                registeredHome: registeredHome,
                pageTitle: 'list of homes',
                currentPage: 'home-list',
                isLoggedIn: req.isLoggedIn,
                user: req.session.user,
            });
    });
};

exports.getBookings = (req, res, next) => {

    res.render('store/bookings',
        {
            pageTitle: 'bookings',
            currentPage: 'booked-homes',
            isLoggedIn: req.isLoggedIn,
            user: req.session.user,
        });
};


exports.getFavourites = (req, res, next) => {
    Favourite.find().populate('homeID').then(favourites => {
        console.log("Fetched favourites:", favourites);
        const favouriteHomes = favourites.map(fav => fav.homeID);
        console.log("Favourite homes:", favouriteHomes);
        res.render('store/favourite',
            {
                favouriteHomes: favouriteHomes,
                pageTitle: 'favourite homes',
                currentPage: 'my favourites',
                isLoggedIn: req.isLoggedIn,
                user: req.session.user,
            });
    }).catch(err => {
        console.log("Error fetching favourites:", err);
        res.render('store/favourite',
            {
                favouriteHomes: [],
                pageTitle: 'favourite homes',
                currentPage: 'my favourites',
                isLoggedIn: req.isLoggedIn,
                user: req.session.user,
            });
    });
};

exports.postAddToFavourite = (req, res, next) => {
    console.log("came to add to fav with id: ", req.body);
    const homeId = req.body.id;
    console.log("Adding favourite with homeId:", homeId, "type:", typeof homeId);
    Favourite.findOne({ homeID: homeId }).then(existingFav => {
        if (existingFav) {
            console.log("fav already exist");
            return res.redirect('/favourite');
        } else {
            const fav = new Favourite({ homeID: homeId });
            return fav.save().then(result => {
                console.log("home added to fav", result);
                return res.redirect('/favourite');
            });
        }
    }).catch(err => {
        console.log("error while adding to fav", err);
        return res.redirect('/favourite');
    });
}

exports.postRemoveFavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log("Controller received homeId:", homeId);
    console.log("Controller homeId type:", typeof homeId);

    Favourite.deleteOne({ homeID: homeId }).then((result) => {
        console.log("fav removed", result);
        console.log("Delete operation successful, deleted count:", result.deletedCount);
    }).catch(err => {
        console.log("error while removing from fav", err);
    }).finally(() => {
        res.redirect('/favourite');
    })
};

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home => {
        if (!home) {
            console.log("home not found");
            res.redirect("/home");
        }
        else {
            console.log("home details found", home);
            res.render('store/home_detail',
                {
                    home: home,
                    pageTitle: 'home Details',
                    currentPage: 'home',
                    isLoggedIn: req.isLoggedIn,
                    user: req.session.user,
                });
        }

    });

};

