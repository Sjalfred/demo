const { Engine } = require('json-rules-engine')
//json-rules-engine is a powerful, lightweight rules engine. Rules are composed of simple json structures, making them human readable and easy to persist.
const rules = require('./priceenginerules.json')

// single tone class to create price engine 
var SingletonRuleEngineFactory = (function () {
    function SingletonClass() {
        let engine = new Engine();
        // add price engine rules to engine and hold it on memory
        for (i = 0; i < rules.length; i++) {
            engine.addRule(rules[i])
        }
        return engine;
    }
    var instance;
    return {
        getInstance: function () {
            if (instance == null) {
                instance = new SingletonClass();
                instance.constructor = null;
            }
            return instance;
        }
    };
})();



exports.getflightprice = async function (req, res) {
    res.set('Cache-control', 'max-age=0'); // no varnish cache for price end point
    const { date, flightnumber } = req.params;

    try {
        const givenDate = new Date(date);
        const givenMonth = date.split('-');
        let day = givenDate.getDay();
        let facts = {
            flight: flightnumber,
            month: givenMonth[0],
            week: day,

        }
        var ruleEngine = SingletonRuleEngineFactory.getInstance();
        const retValue = await ruleEngine
            .run(facts)
            .then(({ events }) => {
                return events.map(event => event.params.value);
            });
        if (retValue.length > 0) {
            res.status(200).send(JSON.stringify({ 'price': retValue[0] }));
        } else {
            res.status(404).send(JSON.stringify({ 'message': 'flight not found' }));
        }

    }
    catch {
        res.status(500).send(JSON.stringify({ 'message': 'error occured' }));
    }

}