const bcrypt = require('bcryptjs');
const {genrateToken} = require("./JWT")
const pool = require('../database/DB')
const express = require("express")
const router = express.Router();
const authenticate = require("../auth/auth-middleware")

router.post("/signup", async(req,res)=>{
    try{
        const {name, email, password, role} = req.body;
        if(!email || !password || !name || !role){
            return res.status(400).json({message:"name, Email, password and role are required"})
        }
        if(!["client", "therapist"].includes(role)){
            return res.status(400).json({
        message: "Invalid role selected",
      });
        }
        const [existing] = await pool.query(
            "SELECT user_id FROM signup WHERE email = ?",[email]
        );

        if(existing.length>0){
            return res.status(409).json({message:"User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const [result] = await pool.query(
            "INSERT INTO signup(email, password, role, name, created_at) VALUES (?, ?, ?, ?, NOW())",
            [email, hashedPassword, role, name]
        );
        res.status(201).json({
            message:"Signup Succesful",
            user:{
                id: result.insertId,
                email,
                role,
            },
        });


    }catch(err){
         console.error(err);
    res.status(500).json({ message: "Server error" });
    }
})
// router.get("/client-resource", authenticate, async (req, res) => {
//   // 🔐 Role check at backend (your chosen design)
//   if (req.user.role !== "client") {
//     return res.status(403).json({
//       message: "You are not authorized to access client resources",
//     });
//   }

//   try {
//     // Dummy response (replace with DB query later)
//     res.status(200).json({
//       message: "Client resource access verified ✅",
//       user: {
//         userId: req.user.userId,
//         role: req.user.role,
//       },
//       data: {
//         info: "This is a protected client-only resource",
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post("/login", async(req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Email and password is required"})
        }

        const [rows] = await pool.query(
            "SELECT user_id, password, role FROM signup WHERE email= ?",
            [email]
        )

        if(rows.length === 0){
            return res.status(401).json({message:"Invalid credentials"})
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"})
        }
        const token = genrateToken({
            userId: user.user_id,
            role: user.role
        });

        await pool.query(
            "INSERT INTO login_history(user_id, email, login_time) VALUES (?, ?, NOW())",
            [user.user_id, email]
        )

        res.json({
            token,
            user:{
                id: user.user_id,
                role: user.role
            }
    })

    }catch(err){
         console.error(err);
    res.status(500).json({ message: "Server error" });
    }
})


module.exports = router

   