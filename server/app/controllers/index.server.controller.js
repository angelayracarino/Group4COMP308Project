//
//https://github.com/PacktPublishing/Hands-on-Machine-Learning-with-TensorFlow.js/tree/master/Section5_4
//
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
//load symptom training and testing data
const symptom = require('../../symptom.json');
const symptomTesting = require('../../symptom-testing.json');
var lossValue;
//
exports.trainAndPredict = function (req, res) {
    // console.log(symptomTesting)
    const {
        body_temperature,
        heart_rate,
        systolic,
        diastolic,
        respiratory_rate,
        pulse_rate
    } = req.body;

    const inputData = tf.tensor2d([[body_temperature, heart_rate, respiratory_rate, pulse_rate, systolic, diastolic]]);

    //
    // convert/setup our data for tensorflow.js
    //
    //tensor of features for training data
    // include only features, not the output
    const trainingData = tf.tensor2d(symptom.map(item => [
        item.body_temperature, item.heart_rate, item.respiratory_rate,
        item.pulse_rate, item.systolic, item.diastolic
    ]))
    //console.log(trainingData.dataSync())
    //
    //tensor of output for training data
    //the values for species will be:
    // setosa:       1,0,0
    // virginica:    0,1,0
    // versicolor:   0,0,1
    const outputData = tf.tensor2d(symptom.map(item => [
        item.species === "yes" ? 1 : 0,
        item.species === "no" ? 1 : 0
    ]))
    //console.log(outputData.dataSync())
    //
    //tensor of features for testing data
    const testingData = tf.tensor2d(symptomTesting.map(item => [
        item.body_temperature, item.heart_rate,
        item.respiratory_rate, item.pulse_rate, 
        item.systolic, item.diastolic
    ]))
    //console.log(testingData.dataSync())    
    //
    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [4], // four input neurons
        activation: "sigmoid",
        units: 7, //dimension of output space (first hidden layer)
    }))
    //add the hidden layer
    model.add(tf.layers.dense({
        inputShape: [5], //dimension of hidden layer
        activation: "sigmoid",
        units: 2, //dimension of final output (setosa, virginica, versicolor)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 2, //dimension of final output (setosa, virginica, versicolor)
    }))
    //compile the model with an MSE loss function and Adam algorithm
    //completes building of the architecture with the parameters
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(learning_rate), //puting the hardcoded to the react app
    })
    console.log(model.summary())
    //
    //Train the model and predict the results for testing data
    //
    // train/fit the model for the fixed number of epochs
    async function run() {
        const startTime = Date.now()
        //train the model
        //building the model by calling the fit method
        //value should be close to 0
        //different model and algorithm can be used to have a better result
        await model.fit(trainingData, outputData,
            {
                epochs: epochs, //parameter to specify the number of epochs
                callbacks: { //list of callbacks to be called during training
                    onEpochEnd: async (epoch, log) => {
                        lossValue = log.loss;
                        console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }

        )

        const results = model.predict(testingData);
        //console.log('prediction results: ', results.dataSync())
        //results.print()

        // get the values from the tf.Tensor
        //var tensorData = results.dataSync();
        results.array().then(array => {
            console.log(array[0][0])
            var resultForData1 = array[0];
            var dataToSent = { row1: resultForData1 }
            console.log(resultForData1)
            res.status(200).send(dataToSent);
            //
            /*
            res.render('results',
                {
                    elapsedTime: elapsedTime / 1000,
                    lossValue: lossValue,
                    resultForData1: resultForData1[0],
                    resultForData2: resultForData2,
                    resultForData3: resultForData3
                }
            )
            */
            //
        })
        //

    } //end of run function
    run()

};
