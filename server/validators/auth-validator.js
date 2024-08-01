const {z} = require("zod");

const loginSchema = z.object({
    email: z
    .string({required_error:"Email is required."})
    .trim()
    .email({message:"Invalid Email address."})
    .min(3,{message: "Email must contain at least 3 characters."})
    .max(255, {message: "Name must be less than 255 characters."}),

    password: z
    .string({required_error:"Password is required."})
    .min(7,{message: "Password must be at least 7 characters."})
    .max(1024, {message: "Password must be less than 255 characters."})
})

const signupSchema = z.object({
    username: z
    .string({required_error:"Name is required."})
    .trim()
    .min(3,{message: "Name must contain at least 3 characters."})
    .max(255, {message: "Name must be less than 255 characters."}),

    email: z
    .string({required_error:"Email is required."})
    .trim()
    .email({message:"Invalid Email address."})
    .min(3,{message: "Email must contain at least 3 characters."})
    .max(255, {message: "Name must be less than 255 characters."}),

    phone: z
    .string({required_error:"Phone is required."})
    .trim()
    .min(10,{message: "Phone must contain at least 10 characters."})
    .max(20, {message: "Phone must be less than 20 characters."}),

    password: z
    .string({required_error:"Password is required."})
    .min(7,{message: "Password must be at least 7 characters."})
    .max(1024, {message: "Password must be less than 255 characters."})
});

module.exports = {signupSchema, loginSchema};