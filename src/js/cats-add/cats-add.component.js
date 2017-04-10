'use strict';

angular.module('catsAdd').component('catsAdd', {
    templateUrl: 'js/cats-add/cats-add.template.html',
    controller: function($http, $rootScope) {
        let vm = this;
        let tags = [];
        vm.postSuccess = undefined;

        $http.get('https://alpakara.pl/smolinska/backend-cat/cats').then(function (res) {
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
            e.preventDefault();
            $rootScope.loading = true;
            let newCat = angular.copy(vm.form);
            newCat.tags = newCat.selectedTags.map(tag => tag.text);
            $http.post('http://localhost:7000/cats', newCat).then(function (response) {
                alert(response.data);
                vm.postSuccess = true
            },
            function (error) {
                alert(error.data);
                vm.postSuccess = false
            }).finally(()=>$rootScope.loading = false)
        }
    }
});
