import axios from "axios";

const TOKEN = "cfvsaf1r01qmgsjq6q2gcfvsaf1r01qmgsjq6q30"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params:{
        token: TOKEN
    }
})
