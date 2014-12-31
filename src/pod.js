(function() {

    "use strict";

    var activePods = {};

    /*
        Given the name of an app, find the pod (host) which can handle the request.

        How it works:
        We try to find a pod randomly from the list of pods assigned to the app.
        If that POD has expired, we try the next pod.
        If we cannot find a pod, create a new pod.
    */
    var find = function*(appName) {
        var app = activePods[appName];

        if (app) {
            var numPods = app.pods.length;
            var randomPod = Math.floor(Math.random() * numPods);

            var selectedPod;

            for (var i = 0; i < numPods; i++) {
                var podId = randomPod + i;
                if (podId > numPods) {
                    podId = podId - numPods;
                }
                var pod = app.pods[podId];

                //TTL = 0 lives forever.
                if (pod.ttl === 0 || (pod.ttl + pod.createdTime) < Date.now()) {
                    selectedPod = pod;
                    break;
                }
            }

            if (selectedPod)
                return selectedPod;
        }

        return yield* createPod(appName);
    };


    /*
        Create a pod or a set of pods for an app.
    */
    var createPod = function*(appName) {

    };


    module.exports = {
        find: find
    };
})();
