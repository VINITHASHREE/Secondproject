'use strict';
 
angular.module('myApp').controller('JobController', ['$scope', 'JobService', function($scope, JobService) {
    
	var self = this;
	self.job={jid:'',jobName:'',companyName:'',technologiesExpected:'',address:''};
    self.jobs=[];
    
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset; 
    
    fetchAllJobs();
    reset(); 
    
    function fetchAllJobs(){
    	JobService.fetchAllJobs()
            .then(
            function(d) {
                self.jobs = d;
            },
            function(errResponse){
                console.error('Error while fetching jobs');
            }
        );
    }
    function submit() {
        if(self.job.jid==null){
            console.log('Saving New job', self.jobs);
            createJob(self.job);
        }else{
          //  updateJob(self.job, self.job.jobId);
            console.log('User updated with id ', self.jobs.jid);
        }
        reset();
    }
 
    function createJob(job){
    	JobService.createJob(job)
            .then(
            		$scope.message="Successfully Added",
            fetchAllJobs,
            function(errResponse){
                console.error('Error while creating jobs');
            }
        );
    }
    function updateJob(job, id){
    	JobService.updateJob(job, id)
            .then(
            fetchAllJobs,
            function(errResponse){
                console.error('Error while updating jobs');
            }
        );
    }
 
    function deletejob(id){
    	JobService.deleteJob(id)
            .then(
            fetchAllJobs,
            function(errResponse){
                console.error('Error while deleting jobs');
            }
        );
    }
 
   
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.jobs.length; i++){
            if(self.jobs[i].jid === id) {
                self.job = angular.copy(self.jobs[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.job.jid === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deletejob(id);
    }
 
 
    function reset(){
    	self.job={jid:null,jobName:'',companyName:'',technologiesExpected:'',address:''};
    	//$scope.myForm.$setPristine(); //reset Form
    }
}]);