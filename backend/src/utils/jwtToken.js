import jwt from "jsonwebtoken";

//Prisijungiant siusti jwt Cookie
export const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, String(process.env.JWT_SECRET)||"SECRET_XXX", {
    expiresIn: process.env.JWT_EXPIREIN||"7d",
  });

  return res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000 ,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none": "lax", // if deployed it will be none if not then lax
      secure: process.env.NODE_ENV === "production" ? true : false, // Comment this if in development
      path: "/",
    })
    .json({ success: true, user });
};
//Atsijungiant vartotojui removeToken
export const removeToken = (res) => {
 return res
    .cookie("token", "", {
      expires: new Date(0),
      maxAge: 0,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production" ? false : false, // Comment this if in development
      path: "/",
    })
    .json({ success: true });

 
};
