import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // require HTTPS in prod
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // none for cross-site in prod
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: "/",
  };

  return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      message,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photoUrl: user.photoUrl,
      },
    });
};

// import jwt from "jsonwebtoken";

// export const generateToken = (res, user, message) => {
//   const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//     expiresIn: "1d",
//   });

//   return res
//     .status(200)
//     .cookie("token", token, {
//       httpOnly: true,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     }).json({
//         success:true,
//         message,
//         user
//     });
// };
