const {OAuth2Client} = require('google-auth-library');
const User = require('../models/user');
var jwt = require("jsonwebtoken");
const client = new OAuth2Client('981982700923-acgvgmg8171q8b1r385jkvnv949rh00m.apps.googleusercontent.com',null,'urn:ietf:wg:oauth:2.0:oob');
function createToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, avatar: user.avatar, role: user.role },
      config.jwtSecret,
      {
        expiresIn: 8640 // 86400 expires in 24 hours
      }
    );
  }
exports.verify = async (req,res)=>{
    try {
        console.log(req.body.idToken);
        const ticket = await client.verifyIdToken({
            idToken:req.body.idToken,
            
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload , 'uid',userid);
        const user = await User.findOne({email:payload.email});
        if(user){
            return res.status(200).json({
                token: createToken(user),
                user: user
              });
        }
        else{
            let newUser = User({email:payload.email,password:''});
            newUser.save((err, user) => {
              if (err) {
                return res.status(400).json({ msg: err });
              }
              return res.status(201).json(user);
            });
        }
        
    } catch (error) {
       return res.status(500).json({msg:this.verify().catch(console.error)});
      
    }

}


