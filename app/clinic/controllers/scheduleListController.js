'use strict';

angular.module('clinic')
        .controller('ScheduleListController', ['$rootScope', '$scope', 
            'commonService', 'cohortService', 'observationsService', 'visitService',
                    function ($rootScope, $scope, commonService, cohortService, observationsService, visitService) {

            $scope.hasSchedules = false;
    
            function init() {
                var cohortMarckedAndCheckedInByProvider = '2276035c-4b15-49c7-be31-dd11f7ac4246';

                cohortService.getWithParams(Bahmni.Common.Constants.cohortMarkedForConsultationAndCheckedInUuid, {providerUuid: $rootScope.currentProvider.uuid}).success(function (data) {
                        $scope.cohortMembers = data.members;
                        $scope.hasSchedules = true;

                    });
            };

            $scope.getLastConsultationAndVisit = function () {
                _.forEach($scope.cohortMembers, function (member) {
                    observationsService.get(member.uuid, Bahmni.Common.Constants.nextConsultationDateUuid)
                        .success(function (data) {
                            //skip if doesn't have next consultation
                            var nonRetired = commonService.filterRetired(data.results);
                            member.scheduledInfo = _.maxBy(nonRetired, 'encounter.encounterDatetime');
                        });

                    visitService.search({patient: member.uuid, 
                        v: 'custom:(visitType,startDatetime,stopDatetime,uuid,encounters)'})
                    .success(function (data) {          
                        member.lastVisit = _.maxBy(data.results, 'startDatetime');
                    });
                });
            };

            init();

        }]);
