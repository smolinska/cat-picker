'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.module('catsAdd').component('catsAdd', {
    templateUrl: 'js/cats-add/cats-add.template.html',
    controller: function($http) {
        let vm = this;
        let tags = [];


        $http.get('http://localhost:7000/cats').then(function (res) {
           vm.cats = res.data.cats;

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

        vm.sendCat = function (e) {
            $rootScope.loading = true;
            e.preventDefault();
            let newCat = angular.copy(vm.form);
            newCat.tags = newCat.selectedTags.map(tag => tag.text);
            $http.post('http://localhost:7000/cats', newCat).then(function (response) {
                alert(response)
            },
            function (error) {
                alert(error)
            }).finally(()=>$rootScope.loading = false)
        }
    }
});
