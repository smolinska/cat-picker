'use strict';

angular.module('catsList').component('catsList', {
    templateUrl: 'js/cats-list/cats-list.template.html',
    controller: function CatsListController($http, $q, $window, $rootScope) {
        let vm = this;
        let tags = [];


        $rootScope.loading = true;
        let catsPromise = $http.get('http://localhost:7000/cats').then(function (res) {
           vm.cats = res.data.cats;
            for (let cat of vm.cats) {
                for (let tag of cat.tags) {
                    if (!tags.some((element) => element.text === tag)) {
                        tags.push({text: tag})
                    }
                }
            }
        });

        $q.all([catsPromise, $rootScope.windowLoaded]).then(()=> $rootScope.loading = false);


        vm.getTags = function (query) {
            return tags.filter((tag)=>tag.text.includes(query))
        };
        vm.selectedTags = [];
        vm.filterCats = function (cat) {
            if (vm.selectedTags.length === 0) return true;
            for (let tag of cat.tags){
                if(vm.selectedTags.some((element) => element.text === tag))
                    return true
            }
            return false
        }
    }
})