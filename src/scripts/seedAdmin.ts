import { prisma } from "../lib/prisma"
import { UserRole } from "../middlewares/auth"

async function  seedAdmin() {
    try {
        console.log("/**** admin reading started!!!!")
        const adminData = {
            name: "Admin 2",
            email: "admin1@admin12.com",
            role: UserRole.ADMIN,
            password: "1234admin12"
        }
        console.log("**** checking admin exists or not");
        //check user exist on db or not
        const existingUser = await prisma.user.findUnique({
            where: {
                email:adminData.email
            }
        })
        if (existingUser) {
            throw new Error("User already exists !!!");
        }

        const signUpAdmin = await fetch("http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body:JSON.stringify(adminData)
        })
            
        if (signUpAdmin.ok) {
            console.log("*** admin created");
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified:true
                }
            })
            console.log("*** email verification");
        }
    } catch (error) {
        console.error(error)
    }
}

seedAdmin()