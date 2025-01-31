'use strict';
 
angular.module('myApp').controller('ForumController', ['$scope','$location','$rootScope','ForumService', function($scope,$location,$rootScope,ForumService) {

	var self = this;
	self.forum={fid:'',forumTitle:'',forumContent:'',userId:'',userName:'',datecreation:''};
    self.forums=[];
    
    self.submit = submit;
    self.remove = remove;
    self.get = get;
    
    
    fetchAllForums();
    reset();
    function CreateForum(forum){
    	ForumService.createForum(forum)
            .then(
            		$scope.message="Successfully Added",
            fetchAllForums,
            function(errResponse){
                console.error('Error while creating forums');
            }
        );
    }
    function fetchAllForums(){
    	ForumService.fetchAllForums()
            .then(
            function(d) {
                self.forums = d;
            },
            function(errResponse){
                console.error('Error while fetching Forums');
            }
        );
    }
    
    function submit() {
        if(self.forum.fid===null){
            console.log('Saving New Forum', self.forums);
            CreateForum(self.forum);
        }else{
            updateForum(self.forum, self.forum.forumId);
            console.log('User updated with id ', self.forum.fid);
        }
        reset();
    }
    function deleteforum(id){
    	ForumService.deleteForum(id)
            .then(
            fetchAllForums,
            function(errResponse){
                console.error('Error while deleting forums');
            }
        );
    }
    function remove(id){
        console.log('id to be deleted', id);
        if(self.forum.fid === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteforum(id);
    }
    function get(forum) {
    	$scope.fc=forum;
		console.log($scope.fc);
		$rootScope.forum=$scope.fc;
		$location.path("viewForum");
    	
	}
    function reset(){
    	self.forum={fid:null,forumTitle:'',forumContent:'',userId:'',userName:''};
    	//$scope.myForm.$setPristine(); //reset Form
    }

}]);