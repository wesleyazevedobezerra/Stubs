
const Service = require('./service')
const sinon = require('sinon') 
//Necessario installar os pacotes do node (npm i -y) e (npm i -D sinon@9) para usar o stubs
const {deepStrictEqual} = require('assert')
const BASE_URL_1 = "https://swapi.dev/api/planets/1/" //endpoint da api swapi
const BASE_URL_2 = "https://swapi.dev/api/planets/2/"
const mocks = {
    tatooine : require('./mocks/tatooine.json'), //importo os mocks
    auderaan : require('./mocks/alderaan.json')
}


;
(async () => { //Glossary função auto executavel
    //{
    //Vai para a internet
    // const service = new Service()
    // const withoutStub = await new Service().makeRequest(BASE_URL_2)
    // console.log("withoutStub", JSON.stringify(withoutStub))
    //}

    const service = new Service() //capturo a class Service
    const stubs = sinon.stub(service, service.makeRequest.name) 
    //Crio o stub (consigo utilizar o arquivo ao inves de acessar o https)

    stubs
        .withArgs(BASE_URL_1) //Quando a URL for chamada ele irá direcionar para o resolves (mpcks.tatooine)
        .resolves(mocks.tatooine)


    stubs
        .withArgs(BASE_URL_2)
        .resolves(mocks.auderaan)

    {
        const expected = {
            "name": "Tatooine",
            "surfaceWater": "1",
            "appearedIn":5
        }
        
        const result = await service.getPlanets(BASE_URL_1)
        
        deepStrictEqual(result, expected)

    }

    {
        const expected = {
            "name": "Alderaan",
            "surfaceWater": "40",
            "appearedIn":2
        }  

        const result = await service.getPlanets(BASE_URL_2)
        deepStrictEqual(result, expected)
    }

})()