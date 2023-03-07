const https = require('https')
class Service{
    async makeRequest(url){
        return new Promise((resolve, reject) => {
            https.get(url, response => { //Faz o callback com response
                response.on("data", data => resolve(JSON.parse(data))) //Quando vier algum valor é chamado o resolve
                response.on("error", reject)    //Quando da algum erro é chamado o reject
            })
        })
    }

    async getPlanets(url){
        const result = await this.makeRequest(url)

        return {
            name: result.name,
            surfaceWater: result.surface_water,
            appearedIn: result.films.length
        }
    }
}


module.exports = Service //exporta o service