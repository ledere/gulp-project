
var snapCatApp = angular.module('snapCatApp', []);

snapCatApp.controller('CatListCtrl', function ($scope) {
    "use strict";
    $scope.cats = [
        {
            'name': 'Grumpy Cat',
            'description': 'What a grumpy fellow'
        },
        {
            'name': 'Ceiling Cat',
            'description': 'Where it all started'
        },
        {
            'name': 'Ralphje',
            'description': 'Who just stole my salami'
        }
    ];
});