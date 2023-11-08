function skillsMember() {
    return{
        restrict: 'E',
        templateUrl: 'templates/member.html',
        controller: 'SkillsMemberController',
        controlleAs: 'vm',
        bindToController: true,
        scope:{
            member: '='
        }
    }
}