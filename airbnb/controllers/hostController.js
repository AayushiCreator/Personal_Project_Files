const Home = require('../models/homesData');

exports.getAddHomes = (req, res, next) => {
    console.log(req.url, req.method);
    res.render('host/editHome', {
        pageTitle: 'adding-home',
        currentPage: 'hostHome',
        editing: false
    });
};

exports.postAddHomes = async (req, res, next) => {
    try {
        console.log("home registration successful for: ", req.body);
        const {homeName,price,rating,location,photoUrl,description} = req.body;
        const home = new Home(homeName,price,rating,location,photoUrl,description);
        await home.save();
        res.redirect('/host/host-homes');
    } catch (error) {
        console.error('Error adding home:', error);
        res.status(500).render('500', { pageTitle: 'Server Error' });
    }
};

exports.getEditHomes = async (req, res, next) => {
    try {
        console.log("entered");
        const homeId = req.params.homeId;
        const editing = req.query.editing==='true';

        const home = await Home.findById(homeId);
        if (!home) {
            console.log("no home found for editing");
            return res.redirect('/host/host-homes');
        }
        res.render('host/editHome', {
            home: home,
            pageTitle: 'editing-home',
            currentPage: 'hostHome',
            editing: editing
        });
    } catch (error) {
        console.error('Error fetching home for editing:', error);
        res.status(500).render('500', { pageTitle: 'Server Error' });
    }
};

exports.postEditHomes = async (req, res, next) => {
    try {
        console.log("home updation successful for: ", req.body);
        const {id, homeName, price, rating, location, photoUrl,description} = req.body;
        const home = new Home(homeName, price, rating, location, photoUrl,description,id);

        await home.save();
        res.redirect('/host/host-homes');
    } catch (error) {
        console.error('Error updating home:', error);
        res.status(500).render('500', { pageTitle: 'Server Error' });
    }
};

exports.postDeleteHomes = async (req, res, next) => {
    try {
        const homeId = req.params.homeId;
        console.log('Deleting home with ID:', homeId);
        
        if (!homeId) {
            console.log("No home ID provided for deletion");
            return res.redirect("/host/host-homes");
        }

        await Home.deleteById(homeId);
        res.redirect("/host/host-homes");
    } catch (error) {
        console.log("Error while deleting home", error);
        res.status(500).render('500', { pageTitle: 'Server Error' });
    }
};

exports.getHostHomes = async (req, res, next) => {
    try {
        console.log(req.url, req.method);
        const registeredHome = await Home.fetchAll();
        res.render('host/host_home_list', {
            registeredHome: registeredHome,
            pageTitle: 'host-homes-list',
            currentPage: 'host-homes'
        });
    } catch (error) {
        console.error('Error fetching host homes:', error);
        res.status(500).render('500', { pageTitle: 'Server Error' });
    }
};

//exports.registeredHome = registeredHome;