'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.module('catsAdd').component('catsAdd', {
    templateUrl: 'js/cats-add/cats-add.template.html',
    controller: function($http) {
        let vm = this;
        let tags = [];


        $http({
            method: 'GET',
            url: 'http://localhost:7000/cats'
        }).then(function (res) {
           vm.cats = res.data.cats

            for (let cat of vm.cats) {
                for (let tag of cat.tags) {
                    if (!tags.some((element) => element.text === tag)) {
                        tags.push({text: tag})
                    }
                }
            }
        });

        vm.getTags = function (query) {
            return tags.filter((tag)=>tag.text.includes(query))
        };
        vm.selectedTags = [];
    }
});
