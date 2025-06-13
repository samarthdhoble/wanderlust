const User = require('../models/user.js');

module.exports.renderSignupForm = (req ,res) => {
  res.render('users/signup.ejs');
}


module.exports.signup =  async (req , res) => {
  try{
    let {username ,email , password } = req.body;
    const newUser = new User({
      username,
      email
    });

    const regUser = await User.register(newUser , password);

    //automatic login after signup
    req.login(regUser ,(err)=>{
      if(err){
        return next(err);
      }

      req.flash('success', 'Welcome to wonderlust!');
      res.redirect('/listings');

    })
    
  }catch(err){
    req.flash('error' , err.message)
    res.redirect('/signup');
  }
}

module.exports.renderLoginForm = (req , res) => {
  res.render('users/login.ejs');
}

module.exports.login = async (req,res) => {
  let redirectUrl = res.locals.redirectUrl || "/listings";
  req.flash('success','Login successful');
  res.redirect(redirectUrl)
}

module.exports.logout =(req ,res) => {
  req.logout((err) => {
    if(err){
      return next();
    }
    req.flash('success', 'you logged out!');
    res.redirect('/listings');
  })
}