const hasAccess = (req,res,next)=>
{
    if(req.session.userInfo == null)
    {
        res.redirect("/user/login");
    }
    else
    {
        next();
    }
}

const isAdmin = (req,res,next)=>
{
    if(req.session.userInfo.admin == false)
    {
        res.redirect("/user/userDashboard");
    }
    else
    {
        next();
    }
}

const isUser = (req,res,next)=>
{
    if(req.session.userInfo.admin == true)
    {
        res.redirect("/admin/adminDashboard");
    }
    else
    {
        next();
    }
}

module.exports = {
    hasAccess: hasAccess,
    isAdmin: isAdmin,
    isUser: isUser
};