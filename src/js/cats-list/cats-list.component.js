'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.module('catsList').component('catsList', {
    templateUrl: 'js/cats-list/cats-list.template.html',
    controller: function CatsListController($scope) {
        $scope.query = "dupa"

        // var cats = []
        // for (var i = 1; i < 20; i++) {
        //     cats.push({
        //         url: 'http://lorempixel.com/400/200/sports/' + i,
        //         tags: 'cute, fun, white'
        // //     })
        //
        //
        // }
        let vm = this;
        this.cats = [
            {
                tags: ['white', 'cute',],
                url: 'http://lorempixel.com/400/200/cats/1'
            },
            {
                tags: ['grey', 'angry'],
                url: 'http://lorempixel.com/400/200/cats/2'
            },
            {
                tags: ['ginger', 'zen'],
                url: 'http://lorempixel.com/400/200/cats/3'
            },
            {
                tags: ['grey', 'white'],
                url: 'http://lorempixel.com/400/200/cats/4'
            },
            {
                tags: ['grey', 'white', 'ginger', 'curious'],
                url: 'http://lorempixel.com/400/200/cats/5'
            },

        ];
        let tags = [];
        for (let cat of this.cats) {
            for (let tag of cat.tags) {
                if (!tags.some((element) => element.text === tag)) {
                    tags.push({text: tag})
                }
            }
        }
        this.getTags = function (query) {
            return tags.filter((tag)=>tag.text.includes(query))
        }
        vm.selectedTags = [];
        this.filterCats = function (cat) {
            if (vm.selectedTags.length === 0) return true;
            for (let tag of cat.tags){
                if(vm.selectedTags.some((element) => element.text === tag))
                    return true
            }
            return false
        }
    }
});
