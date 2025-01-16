const axios = require("axios");
const { response } = require("express");
const axiosInstance = axios.create({
    baseURL: process.env.MICROSERVICE_BASE_URL,
    headers: {
        "Content-Type":"application/json",
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET

    }

})


const getConcerts = async (req, res)=>{
    try {
        const response = await axiosInstance.get("/concerts",{
            headers:{
                CLIENT_KEY: process.env.CLIENT_KEY,
                CLIENT_SECRET: process.env.CLIENT_SECRET
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch concert."})
    }
}

const getMerchandiseStalls  = async(req,res)=>{
    try {
        const response = await axiosInstance.get("/getMerchandiseStalls")
        res.json(response.data)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch MerchandiseStall."})
    }
}

const getAfterParties = async(req,res)=>{
    try {
        const response = await axiosInstance.get("/getAfterParties")
        res.json(response.data)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch getAfterParties."})
    }
}

module.exports = {
    getConcerts,
    getMerchandiseStalls,
    getAfterParties
}